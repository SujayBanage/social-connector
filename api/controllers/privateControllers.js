import {Post} from "../models/Post.js";
import {User} from "../models/User.js";
import {Comment} from "../models/comment.js";
import {Chat} from "../models/Chat.js";
import {Message} from "../models/Message.js";
import imagemin from "imagemin";
// import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";
import sharp from 'sharp';

const postUpload = async (req, res) => {
  console.log("postupload is working!!!");
  console.log(req.file);
  const imgsrc = req.file.path;
  const description = req.body.description;
  const name = req.file.filename;
  // let ext;
  // if(req.file.mimetype==='image/jpeg') {
  //   ext = 'jpg';
  // }
  // if(req.file.mimetype==='image/png'){
  //   ext = 'png';
  // }
  // console.log(imgsrc);
  // console.log(description);


  // let source;
  // try{
  //   const files = await imagemin(['uploads/'+ name],{
  //     destination:"output",
  //     plugins:[
  //       imageminMozjpeg({quality:30}),
  //       imageminPngquant({
  //         quality:[0.6,0.8]
  //       })
  //     ]
  //   })
  //   source = files[0].destinationPath;
  // }
  // catch(e){
  //   console.log(e.message);
  //   res.send({
  //     status:400,
  //     success:false,
  //     message:"image compression failed!!!"
  //   })
  // }

  // if to download
  // res.download(files[0].destinationPath);


  // ! using sharp library

  let sizes = [{width:400,height:299},{width:336,height:221}]

  sizes.forEach(async(size)=>{
    try{
      if(size.width === 400){
        const res = await sharp(`uploads/${name}`).resize(size.width,size.height,{
          fit:'outside'
        }).toFile(`output/${name}`)
        console.log(res);
      }else{
        let editedName =`min-${name}`
        const res = await sharp(`uploads/${name}`).resize(size.width,size.height,{
          fit:'outside'
        }).toFile(`output/${editedName}`)
        console.log(res);
      }
    }
    catch(err){
      console.log(err);
    }
  })




  if (!imgsrc || !description) {
    res.send({
      success: false,
      message: "image upload failed",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.send({
        status: 404,
        success: false,
        message: "user not found!!!",
      });
    }

    const post = await Post.create({
      createdAt:new Date().getTime(),
      creatorName: user.username,
      creatorImg: user.profileimage,
      imgsrc:name,
      description: description,
    });

    if (!post) {
      res.send({
        success: false,
        message: "image upload failed!!!",
      });
    }
    console.log(post);

    const updates = {
      postid: post._id,
    };

    const updatedUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { $push: { posts: updates } }
    );

    console.log(updatedUser);

    const eventEmitter = req.app.get("eventEmitter");

    const posts = await Post.find().sort({'createdAt':-1});

    console.log("these are the posts for the event emitter : ", posts);

    eventEmitter.emit("updatedPosts", {
      postsUpdated: posts,
      message: "feed updated!!!!",
    });

    res.send({
      status: 200,
      success: true,
      message: "image upload successfull!!",
    });
  } catch (err) {
    res.send({
      status: 500,
      success: false,
      message: err.message,
    });
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    console.log("getposts is working");
    const user = req.user;
    const allPosts = await Post.find().sort({'createdAt':-1})
    console.log(allPosts);
    if (!allPosts) {
      res.send({
        status: 404,
        success: false,
        message: "No posts found!!",
      });
    }

    res.send({
      status: 200,
      success: true,
      posts: allPosts,
      user: user,
    });
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const profileupload = async (req, res) => {
  const imgsrc = req.file.path;
  const name = req.file.filename;

  
  
  
  try {

    // const files = await imagemin(["uploads/"+name],{
    //   destination:"output",
    //   plugins:[
    //     imageminMozjpeg({quality:30}),
    //     imageminPngquant({
    //       quality:[0.6,0.8]
    //     })
    //   ]
    // })

    // const source = files[0].destinationPath; 

    await sharp(`uploads/${name}`).resize(160,160,{
      fit:'outside'
    }).toFile(`output/${name}`)
    // console.log(res);




    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { profileimage:name} }
    );
    res.send({
      status: 200,
      success: true,
      message: "profile updated successfully!!!",
    });
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const getUserData = async (req, res) => {
  console.log(req.params.postCreatorName);
  try {
    let user;
    let posts;
    req.params.postCreatorName
      ? (user = await User.findOne({
          username: req.params.postCreatorName,
        }).select("-password"))
      : (user = await User.findById({ _id: req.user.id }).select("-password"));
    req.params.postCreatorName
      ? (posts = await Post.find({ creatorName: req.params.postCreatorName }))
      : (posts = await Post.find({ creatorName: user.username }));
    console.log(posts);
    if (!user) {
      res.send({ status: 404, success: false, message: "user not found!!!!" });
    } else if (!posts) {
      res.send({ status: 404, success: false, message: "posts not found!!!!" });
    }else{
      res.send({ status: 200, success: true, user: user, posts: posts });
    }
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      res.send({
        status: 404,
        success: false,
        message: "user not found!!!",
      });
    }

    res.send({ status: 200, success: true, user: user, users: users });
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const getpost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.postid });
    if (!post) {
      res.send({ status: 404, success: false, message: "post not found!!!!" });
    }
    const comments = await Comment.find({ postid: req.params.postid });

    res.send({ status: 200, success: true, post: post, comments: comments });
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const getUser = async (req, res) => {
  console.log("get user is called");

  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username }).select("-password");
    console.log(user);

    const currentUser = await User.findById({ _id: req.user.id }).select(
      "-password"
    );
    console.log("Current user is : ", currentUser);

    const checkFriend = await User.findOne(
      { _id: req.user.id },
      { friends: { $elemMatch: { username: username } } }
    );

    console.log(checkFriend);

    if (checkFriend.friends.length === 0) {
      res.send({
        status: 404,
        success: false,
        message: "friend not found!!!!",
      });
    }

    res.send({
      status: 200,
      success: true,
      user: user,
      currentUser: currentUser,
    });

    // console.log(user);
    // if(!user){
    //     res.send({status:404,success:false,message:"user not found!!!!"});
    // }
    // res.send({status:200,success:true,user:user});
  } catch (err) {
    console.log(err.message);
  }
};

const createChat = async (req, res) => {
  const { currentUser, friend } = req.body;

  try {
    const currentuser = await User.findById({ _id: currentUser }).select(
      "-password"
    );
    const userfriend = await User.findById({ _id: friend }).select("-password");

    const user1 = {
      _id: currentuser._id,
      username: currentuser.username,
      profileimage: currentuser.profileimage,
      status: currentuser.status,
    };

    const user2 = {
      _id: userfriend._id,
      username: userfriend.username,
      profileimage: userfriend.profileimage,
      status: userfriend.status,
    };

    const checkChat = await Chat.findOne(
      { chatType: "privateChat" },
      { users: { $elemMatch: { _id: currentUser._id } } }
    );
    console.log(checkChat);

    if (checkChat.users.length !== 0 && checkChat !== null) {
      const chat = await Chat.findById({ _id: checkChat._id });
      res.send({
        success: true,
        status: 200,
        message: "chat created successfully",
        user: user1,
        friend: user2,
        chat: chat,
      });
    }
    const chat = await Chat.create({
      roomname: `${currentuser.username}_and_${userfriend.username}`,
      users: [user1, user2],
      chatType: "privateChat",
    });
    console.log(chat);
    res.send({
      success: true,
      status: 200,
      message: "chat created successfully",
      user: user1,
      friend: user2,
      chat: chat,
    });
  } catch (err) {
    console.log(err.message);
    res.send({ success: false, status: 500, message: err.message });
  }
};

const getPrivateChats = async (req, res) => {
  console.log("get private chats is running!!!");

  try {
    const user = await User.findById({ _id: req.user.id }).select("-password");
    // const checkchats = await Chat.find(
    //   { chatType: "privateChat" },
    //   { users: { $elemMatch: { _id: user._id } } }
    // );
    // console.log(checkchats);
    // if (checkchats.length === 0) {
    //   res.send({ status: 404, success: false, message: "chats not found!!!",user:user });
    // }

    
    let privateChats=[];


    for(let i=0;i<user.chats.length;i++){
      let privatechat = await Chat.findOne({_id:(user.chats[i])._id,roomname:user.chats[i].roomname,chatType:'privateChat'});
      if(privatechat!==null){
        privateChats.push(privatechat);
      }
    }

    


  

    // user.chats.forEach(async(chat)=>{
    //   let privatechat = await Chat.findById({_id:chat._id});
    //   console.log("the private chat is : ",privatechat);
    //   if(privatechat.chatType ==='privateChat'){
    //     privateChats.push(privatechat)
    //   }
    // })

    console.log("private chats are ",privateChats);


    
    // for (let i = 0; i < checkchats.length; i++) {
    //   for (let j = 0; j < checkchats[i].users.length; j++) {
    //     if (checkchats[i].users[j].username === user.username) {
    //       const privateChat = await Chat.findById({ _id: checkchats[i]._id });
    //       privateChats.push(privateChat);
    //     }
    //   }
    // }

    // if (privateChats.length !== 0) {
      res.send({ status: 200, success: true, chats: privateChats ,user:user});
    // }
  } catch (err) {
    res.send({ success: false, status: 500, message: err.message });
  }
};

const getMessages = async (req, res) => {
  const { chatroom } = req.params;
  console.log(chatroom);
  
  try {
    const user = await User.findById({_id: req.user.id});
    const chat = await Chat.findOne({ roomname: chatroom });
    if (!chat) {
      res.send({ status: 404, success: false, message: "chat not found!!!!" });
    }

    let userfriends = [...user.friends];

    for(let i = 0; i <chat.users.length; i++) {
      for(let j = 0; j <user.friends.length; j++) {
        if(chat.users[i].username===user.friends[j].username){
          const index = userfriends.indexOf(user.friends[j]);
          userfriends.splice(index,1);
        }
      }
    }

    console.log(userfriends);

    res.send({
      status: 200,
      success: true,
      messages: chat.messages,
      chatType: chat.chatType,
      chatUsers: chat.users,
      userfriends:userfriends
    });

  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};

const getGroupChats = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    // const groupchats = await Chat.find(
    //   { chatType: "groupChat" },
    //   { users: { $elemMatch: { _id: user._id } } }
    // );
    // console.log(groupchats[1].users[0]);

    let groupChats = [];

    // for (let i = 0; i < groupchats.length; i++) {
    //   for (let j = 0; j < groupchats[i].users.length; j++) {
    //     if (groupchats[i].users[j].username === user.username) {
    //       console.log("if condition is running!!!");
    //       const chat = await Chat.findOne({ _id: groupchats[i]._id });
    //       groupChats.push(chat);
    //     }
    //   }
    // }

    for(let i=0;i<user.chats.length;i++){
      let groupchat = await Chat.findOne({$and:[{chatType:'groupChat'},{_id:user.chats[i]._id},{roomname:user.chats[i].roomname}]})
      if(groupchat!==null){
        groupChats.push(groupchat);
      }  
    }


    console.log("group chats are ",groupChats);

    if (groupChats.length !== 0) {
      res.send({ status: 200, success: true, groupChats: groupChats });
    } else {
      res.send({
        status: 404,
        success: false,
        message: "group chats not found!!!",
      });
    }
  } catch (err) {
    res.send({ status: 500, success: false, message: err.message });
  }
};


const getUserById =async(req,res)=>{
  try{
    const user = await User.findById({_id:req.params.id});
    if(!user){
      res.send({ status: 404, success: false, message: "user not found!!!!" })
    }
    else{
      res.send({ status:200, success:true,user:user });
    }
  }
  catch(err){

  }
}





export{
  postUpload,
  getAllPosts,
  profileupload,
  getUserData,
  getAllUsers,
  getpost,
  getUser,
  createChat,
  getPrivateChats,
  getMessages,
  getGroupChats,
  getUserById
};
