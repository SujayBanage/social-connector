import {bcryptService} from "../services/bcryptService.js";
import {jwtAuthService} from "../services/jwtAuthService.js";
import {User} from "../models/User.js";
import {Chat} from "../models/Chat.js";
import { OAuth2Client } from "google-auth-library";
const googleClient = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
import axios from "axios";

const userRegistration = async (req, res, next) => {
  const { username, email, password } = req.body;
  const isUnique = await User.findOne({ email: email.trim() });

  if (isUnique) {
    res.send({
      status: 400,
      success: false,
      message: "email or username already taken!!!",
    });
  }

  const hashRequest = new bcryptService();

  const bcryptServiceResponse = await hashRequest.hashPassword(password.trim());

  if (res.success === false) {
    res.send({
      status: 500,
      success: false,
      message: bcryptServiceResponse.message,
    });
  }

  const user = await User.create({
    username: username.trim(),
    email: email.trim(),
    password: bcryptServiceResponse.hashedPassword,
  });

  console.log(user);

  const tokenRequest = new jwtAuthService();

  const { refreshToken, authToken } = tokenRequest.signToken(
    user._id,
    process.env.JWT_SECRET_ACCESS_KEY,
    process.env.JWT_SECRET_REFRESH_KEY
  );

  if (!refreshToken || !authToken) {
    res.send({
      status: 500,
      success: false,
      message: "jwt service error",
    });
  }

  await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { status: "online" } }
  );

  res.send({
    success: true,
    status: 200,
    refreshToken,
    authToken,
    message: "user signup successfull!!",
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const isExist = await User.findOne({ email: email });

  console.log(isExist);

  const bcryptServiceRequest = new bcryptService();

  const bcryptServiceResponse = await bcryptServiceRequest.comparePassword(
    password,
    isExist.password
  );



  if (!isExist || bcryptServiceResponse.success === false){
    res.send({
      success: false,
      status: 400,
      message: "invalid credentials!!!",
    });
  }
  
  // if(isExist.status ==='online'){
  //   res.send({
  //     success: false,
  //     status: 400,
  //     message: "already logged in with other device",
  //   });
  // }

  const jwtRequest = new jwtAuthService();

  const jwtResponse = await jwtRequest.signToken(
    isExist._id,
    process.env.JWT_SECRET_ACCESS_KEY,
    process.env.JWT_SECRET_REFRESH_KEY
  );

  await User.findByIdAndUpdate(
    { _id: isExist._id },
    { $set: { status: "online" } }
  );

  res.send({
    success: true,
    status: 200,
    authToken: jwtResponse.authToken,
    refreshToken: jwtResponse.refreshToken,
    message: "user login successful!!!",
  });
};

const userLogout = async (req, res) => {
  const status = req.body.status;
  try {
    // const user = await User.findById({_id:req.user.id});
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { status: status } }
    );
    // const allChats = await Chat.find();
    res.send({
      status: 200,
      success: true,
      message: "log out successfully!!",
    });
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const userGoogleLogin = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const response = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });
    const { email, email_verified, name, picture } = response.payload;
    if (email_verified) {
      const user = await User.findOne({ email: email, username: name });
      if (user) {
        const jwtService = new jwtAuthService();
        const { refreshToken, authToken } = jwtService.signToken(
          user._id,
          process.env.JWT_SECRET_ACCESS_KEY,
          process.env.JWT_SECRET_REFRESH_KEY
        );
        console.log("refresh token is ", refreshToken);
        console.log("auth token is ", authToken);
        res.send({
          status: 200,
          success: true,
          authToken: authToken,
          refreshToken: refreshToken,
          message: "user login successfull!!!",
        });
      } else {
        const password = email + process.env.GOOGLE_OAUTH_CLIENT_SECRET;

        const bcryptRequest = new bcryptService();

        const hashedPassword = await bcryptRequest.hashPassword(password);

        checkUser = await User.findOne({ username: name });

        if (checkUser) {
          res.send({
            status: 400,
            success: false,
            message: "username or password already exists!!",
          });
        }

        const user = await User.create({
          status: "online",
          username: name,
          email: email,
          password: hashedPassword,
        });
        console.log(user);
        const jwtService = new jwtAuthService();
        const { refreshToken, authToken } = jwtService.signToken(
          user._id,
          process.env.JWT_SECRET_ACCESS_KEY,
          process.env.JWT_SECRET_REFRESH_KEY
        );
        console.log("refresh token is ", refreshToken);
        console.log("auth token is ", authToken);
        res.send({
          status: 200,
          success: true,
          authToken: authToken,
          refreshToken: refreshToken,
          message: "user login successfull!!!",
        });
      }
    }
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const userFacebookLogin = async (req, res) => {
  const { accessToken, userID } = req.body;
  console.log(req.body);
  try {
    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    const response = await axios.get(urlGraphFacebook);
    const { name, email } = response.data;
    const user = await User.findOne({ email: email, username: name });
    if (user) {
      const jwtService = new jwtAuthService();
      const { refreshToken, authToken } = jwtService.signToken(
        user._id,
        process.env.JWT_SECRET_ACCESS_KEY,
        process.env.JWT_SECRET_REFRESH_KEY
      );
      console.log("refresh token is ", refreshToken);
      console.log("auth token is ", authToken);
      res.send({
        status: 200,
        success: true,
        authToken: authToken,
        refreshToken: refreshToken,
        message: "user login successfull!!!",
      });
    } else {
      const password = email + process.env.JWT_SECRET_ACCESS_KEY;

      const bcryptRequest = new bcryptService();

      const hashedPassword = await bcryptRequest.hashPassword(password);

      checkUser = User.findOne({ username: name });
      if (checkUser) {
        res.send({
          status: 400,
          success: false,
          message: "username or password already exists!!",
        });
      } else {
        const user = await User.create({
          status: "online",
          username: name,
          email: email,
          password: hashedPassword,
        });
        console.log(user);
        const jwtService = new jwtAuthService();
        const { refreshToken, authToken } = jwtService.signToken(
          user._id,
          process.env.JWT_SECRET_ACCESS_KEY,
          process.env.JWT_SECRET_REFRESH_KEY
        );
        console.log("refresh token is ", refreshToken);
        console.log("auth token is ", authToken);
        res.send({
          status: 200,
          success: true,
          authToken: authToken,
          refreshToken: refreshToken,
          message: "user login successfull!!!",
        });
      }
    }
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

export{
  userRegistration,
  userLogin,
  userLogout,
  userGoogleLogin,
  userFacebookLogin,
};
