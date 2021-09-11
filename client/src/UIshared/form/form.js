import React from "react";
import Button from "../button/button.js";
import { useHistory ,Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import apiRequestService from "../../services/apiRequestService.js";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiRequest = new apiRequestService();

const Form = (props) => {
  const history = useHistory();
  console.log("this is form component");

  const notify = (success, message) => {
    if (success === true) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (success === false) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const responseSuccessGoogle = async (response) => {
    console.log(response);
    const data = {
      tokenId: response.tokenId,
    };
    const res = await apiRequest.userGoogleLogin("/auth/userGoogleLogin", data);
    console.log(res);
    if (res.data.success) {
      sessionStorage.setItem("authToken", res.data.authToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      notify(res.data.success, res.data.message);
      setTimeout(() => {
        history.push("/feed");
      }, 3000);
    } else {
      notify(res.data.success, res.data.message);
    }
  };
  
  const responseFailGoogle = (response) => {
    console.log(response);
  };
  
  
  const responseFacebook=async(response)=>{
    console.log(response);
    const data = {
      accessToken: response.accessToken,
      userID: response.userID
    }
    const res = await apiRequest.userFacebookLogin('/auth/userFacebookLogin',data)
    if(res.data.success){
      sessionStorage.setItem("authToken", res.data.authToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      notify(res.data.success, res.data.message);
      setTimeout(() => {
        history.push("/feed");
      }, 3000);
    }
    else{
      notify(res.data.success, res.data.message);
    }
  }
  
  return (
    <>
      {props.type === "signup" ? (
        <>
          <div class="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={props.onSubmitHandler}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={props.state.username}
                  onChange={props.onChangeHandler}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  value={props.state.email}
                  onChange={props.onChangeHandler}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                  value={props.state.password}
                  onChange={props.onChangeHandler}
                />
              </div>
              <div className="flex items-center justify-center">
                {/* <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                {props.type}
              </button> */}
                <Button
                  classname={props.type}
                  type="submit"
                  text={props.type}
                  onClick={props.onSubmitHandler}
                />
              </div>

              <div className="loginLink flex items-center justify-center underline">
                <Link to="/login">Already have an account ? </Link>
              </div>


            </form>
          </div>
        </>
      ) : (
        <>
          {/* <ToastContainer /> */}
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={props.onSubmitHandler}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  value={props.state.email}
                  onChange={props.onChangeHandler}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                  value={props.state.password}
                  onChange={props.onChangeHandler}
                />
              </div>

              <div className="flex items-center justify-center">
                {/* <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                {props.type}
              </button> */}
                <Button
                  classname={props.type}
                  type="submit"
                  text={props.type}
                  onClick={props.onSubmitHandler}
                />
              </div>

              <div className="signupLink flex items-center justify-center underline">
              <Link to="/signup">Don't have an account?</Link>
              </div>



            </form>

            <div className="googleAndOtherLogin flex items-center justify-around">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_ID}
                autoLoad={false}
                fields="name,email,picture"
                icon="fa-facebook"
                size="small"
                textButton="Login"
                // onClick={componentClicked}
                callback={responseFacebook}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
