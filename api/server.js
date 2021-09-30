import dotenv from 'dotenv';
dotenv.config({});
import {eventEmitterListner} from "./services/socket.io_listeners.js";
import express from "express";
import http from "http";
import cors from "cors";
import {auth} from "./routes/auth.js";
import {privaterouter} from "./routes/private.js";
import mongodbConnection from "./db/connection.js";
import {Server} from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
// const index = require("./routes/index.js");
const staticPath = path.join(__dirname, "./uploads");
console.log(staticPath);

const compressPath = path.join(__dirname, "./output")

const buildpath = path.join(__dirname, "../client/build");
console.log(buildpath);

import events from "events";
const eventEmitter = new events.EventEmitter();
// const {likesUpdate} = require('./services/socket.io_listeners.js');
import {Post} from "./models/Post.js";
import {User} from "./models/User.js";
import {Comment} from "./models/comment.js";
import {Chat} from "./models/Chat.js";
import {Message} from "./models/Message.js";
// ! connection to database
mongodbConnection();

const IO = new Server(server, {
  cors: {
    origin: "http://localhost:8000/",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  },
});

app.set("eventEmitter", eventEmitter);
app.set("io", IO);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/uploads", express.static(staticPath));
app.use("/output", express.static(compressPath));
app.use(express.static(path.join(__dirname,'client/build')))


// app.use(index);
// ! for authentication routes
app.use("/auth", auth);
// ! for private
app.use("/private", privaterouter);

app.get("/server",(req,res)=>{
  res.send('<h1>hello from server</h1>')
})

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})


// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static("client/build"))
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//   })
// }


server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

eventEmitterListner(eventEmitter, IO);

IO.on("connection", (socket) => {
  console.log("connection successful!!!");

  socket.on("join", (data) => {
    socket.join(data.roomname);
    console.log(`joined ${data.roomname} successfully!!!`);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected!!!");
  });

  socket.on("likesUpdate", ({ postid, Userid }) => {
    console.log("likes update!!! on server is running!!!!");
    eventEmitter.emit("likesUpdate", { postid, Userid });
  });

  socket.on("dislikesUpdate", ({ postid, Userid }) => {
    console.log("dislikes update!!! on server is running!!!!");
    eventEmitter.emit("dislikesUpdate", { postid, Userid });
  });

  socket.on("commentsUpdate", ({ postid, userid, text }) => {
    console.log("comments update!!! on server is running!!!!");
    eventEmitter.emit("commentsUpdate", { postid, userid, text });
  });

  socket.on("reply", ({ replytext, repliedBy, repliedTo, postid }) => {
    console.log("reply on server is running!!!!");
    eventEmitter.emit("reply", { replytext, repliedBy, repliedTo, postid });
  });

  socket.on("addfriend", ({ userid, requestFrom }) => {
    eventEmitter.emit("addfriend", { userid, requestFrom });
  });
  
  socket.on("acceptRequest", ({ requestFrom, requestTo }) => {
    console.log(requestFrom, requestTo);
    eventEmitter.emit("acceptRequest", { requestFrom, requestTo });
  });

  socket.on("declineRequest", ({ requestFrom, requestTo }) => {
    console.log(requestFrom, requestTo);
    eventEmitter.emit("declineRequest", { requestFrom, requestTo });
  });
  
  socket.on("unfriend", ({ id, currentUserid }) => {
    eventEmitter.emit("unfriend", { id, currentUserid });
  });

  socket.on("postDelete", ({ postid, postCreatorName }) => {
    eventEmitter.emit("postDelete", { postid, postCreatorName });
  });

  socket.on("postUpdate", ({ postid, postCreatorName, text }) => {
    eventEmitter.emit("postUpdate", { postid, postCreatorName, text });
  });

  socket.on("singleNotificationClear", ({ id, userid }) => {
    eventEmitter.emit("singleNotificationClear", { id, userid });
  });
  
  socket.on("clearAllNotifications", ({ userid }) => {
    eventEmitter.emit("clearAllNotifications", { userid });
  });
  
  socket.on("commentLike", ({ userid, commentid, postid }) => {
    eventEmitter.emit("commentLike", { userid, commentid, postid });
  });

  socket.on("commentDislike", ({ userid, commentid, postid }) => {
    eventEmitter.emit("commentDislike", { userid, commentid, postid });
  });

  // ! chatting functionality :-
  
  socket.on("createChatRoom", async ({ currentuser, friend }) => {
    try {
      const checkChat1 = await Chat.findOne({
        roomname: `${currentuser.username}and${friend.username}`,
      });
      const checkChat2 = await Chat.findOne({
        roomname: `${friend.username}and${currentuser.username}`,
      });
      
      console.log(checkChat1);
      console.log(checkChat2);

      const user1 = {
        _id: currentuser._id,
        username: currentuser.username,
        profileimage: currentuser.profileimage,
        status: currentuser.status,
      };
      
      const user2 = {
        _id: friend._id,
        username: friend.username,
        profileimage: friend.profileimage,
        status: friend.status,
      };
      
      if (checkChat1 || checkChat2) {
        if (checkChat1 !== null) {
          let dummyChat = {
            _id:checkChat1._id,
            roomname:checkChat1.roomname
          }
          await User.findByIdAndUpdate({_id:currentuser._id},{$push:{chats:dummyChat}});
          
          IO.to("messagesRoom").emit("chatRoomCreated", {
            roomname: checkChat1.roomname,
            currentuser: user1,
          });
        } 
        else if (checkChat2 !== null) {
          let dummyChat = {
            _id:checkChat2._id,
            roomname:checkChat2.roomname
          }
          await User.findByIdAndUpdate({_id:currentuser._id},{$push:{chats:dummyChat}});
          IO.to("messagesRoom").emit("chatRoomCreated", {
            roomname: checkChat2.roomname,
            currentuser: user1,
          });
        }
      } else {
        const chat = await Chat.create({
          roomname: `${currentuser.username}and${friend.username}`,
          users: [user1, user2],
          chatType: "privateChat",
        });
        console.log(chat);

        let dummyChat = {
          _id:chat._id,
          roomname:chat.roomname
        }

        // ! adding chat to a user
        await User.findByIdAndUpdate({_id:currentuser._id},{$push:{chats:dummyChat}});
        await User.findByIdAndUpdate({_id:friend._id},{$push:{chats:dummyChat}});


        IO.to("messagesRoom").emit("chatRoomCreated", {
          roomname: chat.roomname,
          currentuser: user1,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  });
  
  socket.on("message", async ({ message, roomname }) => {
    try {
      console.log(message);
      
      if (message.user === "admin") {
        const msg = {
          text: message.text,
          user: "admin",
        };
        await Chat.findOneAndUpdate(
          { roomname: roomname },
          { $push: { messages: msg } }
          );
          const chat = await Chat.findOne({ roomname: roomname });
          console.log(chat);
          IO.to(roomname).emit("updatedMessages", { messages: chat.messages });
        } else {
          const user = await User.findOne({ username: message.user });
          const msg = {
            text: message.text,
            user: user.username,
            profileimage: user.profileimage,
          };
          await Chat.findOneAndUpdate(
            { roomname: roomname },
            { $push: { messages: msg } }
            );
            
            const chat = await Chat.findOne({ roomname: roomname });
            console.log(chat);
            
            IO.to(roomname).emit("updatedMessages", {
              messages: chat.messages,
              currentmsg: msg,
            });
          }
        } catch (err) {
          console.log(err.message);
        }
      });
      
      socket.on("createGroupChat", async ({ roomname, currentUser }) => {
        console.log(currentUser);
        try {
          const checkGroupChat = await Chat.findOne({ roomname: roomname });
          if (checkGroupChat){
            console.log("chat already exists!!!");

            let isExist = false;

            currentUser.chats.forEach((chat)=>{
              if(chat._id === checkGroupChat._id || chat.roomname === checkGroupChat.roomname){
                isExist = true;
              }
            })

            if(isExist === false){
              const dummyChat={
                _id:checkGroupChat._id,
                roomname:checkGroupChat.roomname
              }
              // ! adding chat to a user
              await User.findByIdAndUpdate({_id:currentUser._id},{$push:{chats:dummyChat}});
              IO.to("messagesRoom").emit("groupChatCreated", {
                groupChat: checkGroupChat,
                currentuser: currentUser,
              });
            }
            else{
              IO.to("messagesRoom").emit("groupChatFailed", {
                message:"group chat already exists!!!"
              });
            }

      } else {
        const user = {
          _id: currentUser._id,
          username: currentUser.username,
          profileimage: currentUser.profileimage,
          status: currentUser.status,
        };
        const groupChat = await Chat.create({
          roomname: roomname,
          chatType: "groupChat",
          users: [user],
        });
        console.log(groupChat);

        const dummyChat={
          _id:groupChat._id,
          roomname:groupChat.roomname
        }

        // ! adding chat to a user
        await User.findByIdAndUpdate({_id:currentUser._id},{$push:{chats:dummyChat}});


        IO.to("messagesRoom").emit("groupChatCreated", {
          groupChat: groupChat,
          currentuser: user,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  socket.on("addUserToChat", ({ user, chatroom, currentuser }) => {
    eventEmitter.emit("addUserToChat", { user, chatroom, currentuser });
  });
  
  socket.on("addUserToChatInvite", ({ user, chatroom, currentuser }) => {
    eventEmitter.emit("addUserToChatInvite", { user, chatroom, currentuser });
  });
  
  socket.on("groupChatDecline", ({ user, chatroom, currentuser }) => {
    eventEmitter.emit("groupChatDecline", { user, chatroom, currentuser });
  });

  socket.on('deleteChat',({chatid,type,user})=>{
    eventEmitter.emit('deleteChat',{chatid,type,user});
  })

});

eventEmitter.on("updatedPosts", ({ postsUpdated, message }) => {
  console.log("updated post on server side  is running");
  console.log(postsUpdated);
  IO.to("postsRoom").emit("updatedPosts", { postsUpdated, message });
});

// eventEmitter.on("likesUpdate",({likes})=>{
  //     console.log("likesUpdate running on server");
  //     io.to("publicresponse").emit('likesUpdate',{likes});
  // })
  
  eventEmitter.on("likesUpdate", async ({ postid, Userid }) => {
    console.log("likesUpdate event eventEmitter is running");
    // console.log(data);
    // console.log(dat);
    // console.log("likes are : ",likes);
    try {
      const user = await User.findById({ _id: Userid });
      console.log(user, "is liking this post!!!");
      if (!user) {
        console.log("user not found!");
      }
      const likeObj = {
        likedby: user._id,
      };
      
      const post = await Post.findOne(
        { _id: postid },
        { likes: { $elemMatch: { likedby: user._id } } }
        );
        console.log(post);
        if (post.likes.length !== 0) {
          console.log("like exists");
          await Post.findOneAndUpdate(
            { _id: postid },
            { $pull: { likes: { likedby: user._id } } }
            );
            const updatedPost = await Post.findOne({ _id: postid });
            console.log("these are posts in eventemitter", updatedPost);
            if (!updatedPost) {
              console.log("post not found!!!");
            }
            // io.to("publicresponse").emit("updatedlikes",{likes:updatedPost.likes.length});
            
            const notificationObj = {
              name:user.username,
              img: user.profileimage,
              text:`${user.username} liked your post!!!`,
              typeof:'positive'
            }
            
            
            
            await User.findOneAndUpdate({username:updatedPost.creatorName},{$push:{notifications:notificationObj}});
            
            const updatedUser = await User.findOneAndUpdate({username:updatedPost.creatorName},{$push:{notifications:notificationObj}});
            
            IO.to("singlepost").emit("updatedlikes", {
              dislikes: updatedPost.dislikes.length,
              likes: updatedPost.likes.length,
              postid: updatedPost._id,
            });
            
            IO.to('notifications').emit('notificationUpdate',{Notifications:updatedUser.notifications,User:updatedPost.creatorName})
            
          } else {
            await Post.findOneAndUpdate(
              { _id: postid },
              { $push: { likes: likeObj } }
              );
              await Post.findOneAndUpdate(
                { _id: postid },
                { $pull: { dislikes: { dislikedBy: user._id } } }
                );
                const updatedPost = await Post.findOne({ _id: postid });
                console.log("these are posts in eventemitter", updatedPost);
                if (!updatedPost) {
                  console.log("post not found!!!");
                }
                // io.to("publicresponse").emit("updatedlikes",{likes:updatedPost.likes.length});
                
                const notificationObj = {
                  name:user.username,
                  img: user.profileimage,
                  text:`${user.username} liked your post!!!`,
                  typeof:'positive'
                }
                
                await User.findOneAndUpdate({username:updatedPost.creatorName},{$push:{notifications:notificationObj}});
                const updatedUser = await User.findOne({username:updatedPost.creatorName});
                
                
                IO.to("singlepost").emit("updatedlikes", {
                  dislikes: updatedPost.dislikes.length,
                  likes: updatedPost.likes.length,
                  postid: updatedPost._id,
                });
                IO.to('notifications').emit('notificationUpdate',{Notifications:updatedUser.notifications,User:updatedPost.creatorName})
              }
            } catch (err) {
              console.log(err);
            }
          });
          
          eventEmitter.on("dislikesUpdate", async ({ postid, Userid }) => {
            console.log("dislikesUpdate event eventEmitter is running");
            console.log(Userid);
            // console.log("dislikes are : ",dislikes);
  try {
    const user = await User.findById({ _id: Userid });
    if (!user) {
      console.log("user not found!!!");
    }
    const dislikeObj = {
      dislikedBy: user._id,
    };
    const post = await Post.findOne(
      { _id: postid },
      { dislikes: { $elemMatch: { dislikedBy: user._id } } }
      );
      console.log(post);
      if (post.dislikes.length !== 0) {
        await Post.findOneAndUpdate(
          { _id: postid },
          { $pull: { dislikes: { dislikedBy: user._id } } }
          );
          const updatedPost = await Post.findOne({ _id: postid });
          console.log("these are posts in eventemitter", updatedPost);
          if (!updatedPost) {
            console.log("post not found!!!");
          }
          // io.to("publicresponse").emit("updatedDislikes",{dislikes:updatedPost.dislikes.length});
          
          const notificationObj = {
            name:user.username,
            img: user.profileimage,
            text:`${user.username} disliked your post!!!`,
            typeof:'dislike'
          }
          
          await User.findOneAndUpdate({username:updatedPost.creatorName},{$push:{notifications:notificationObj}});
          const updatedUser = await User.findOne({username:updatedPost.creatorName});
          
          
          
          IO.to("singlepost").emit("updatedDislikes", {
            likes: updatedPost.likes.length,
            dislikes: updatedPost.dislikes.length,
            postid: updatedPost._id,
          });
          IO.to('notifications').emit('notificationUpdate',{Notifications:updatedUser.notifications,User:updatedPost.creatorName})
        } else {
          await Post.findOneAndUpdate(
            { _id: postid },
            { $push: { dislikes: dislikeObj } }
            );
            
            await Post.findOneAndUpdate(
              { _id: postid },
              { $pull: { likes: { likedby: user._id } } }
              );
              
              const updatedPost = await Post.findOne({ _id: postid });
              console.log("these are posts in eventemitter", updatedPost);
              if (!updatedPost) {
                console.log("post not found!!!");
              }
              // io.to("publicresponse").emit("updatedDislikes",{dislikes:updatedPost.dislikes.length});
              
              const notificationObj = {
                name:user.username,
                img: user.profileimage,
                text:`${user.username} disliked your post!!!`,
                typeof:'dislike'
              }
              
              await User.findOneAndUpdate({username:updatedPost.creatorName},{$push:{notifications:notificationObj}});
              const updatedUser = await User.findOne({username:updatedPost.creatorName});
              
              
              
              IO.to("singlepost").emit("updatedDislikes", {
                likes: updatedPost.likes.length,
                dislikes: updatedPost.dislikes.length,
                postid: updatedPost._id,
              });
              IO.to('notifications').emit('notificationUpdate',{Notifications:updatedUser.notifications,User:updatedPost.creatorName})
            }
          } catch (err) {
            console.log(err);
          }
        });
        
        eventEmitter.on("commentsUpdate", async ({ postid, userid, text }) => {
          try {
            const post = await Post.findById({ _id: postid });
            const user = await User.findById({ _id: userid });
            
            if (!post || !user) {
              console.log("comments update error!!!");
            }
            const comment = await Comment.create({
              text: text,
              postid: postid,
              commentBy: {
                _id: userid,
                username: user.username,
                profileimage: user.profileimage,
              },
            });
            console.log(comment);
            
            await Post.findByIdAndUpdate(
              { _id: postid },
              { $push: { comments: { commentid: comment._id } } }
              );
              
              const comments = await Comment.find({ postid: postid });
              console.log(comments);
              
              const notificationObj= {
                name:user.username,
                img: user.profileimage,
                text:`${user.username} commented on your post!!!`,
                typeof:'positive'
              }
              
              await User.findOneAndUpdate({username:post.creatorName},{$push:{notifications:notificationObj}});
              
              const commentToUser = await User.findOne({username:post.creatorName});
              
              IO.to("commentsroom").emit("updatedComments", { Comments: comments ,user:post.creatorName});
              
              IO.to('notifications').emit('notificationUpdate',{Notifications:commentToUser.notifications,User:commentToUser.username})
              
              
            } catch (err) {
              console.log(err.message);
            }
          });
          
          eventEmitter.on(
            "reply",
            async ({ replytext, repliedBy, repliedTo, postid }) => {
              try {
                const user = await User.findById({ _id: repliedBy });
                const repliedTocomment = await Comment.findById({ _id: repliedTo });
                const post = await Post.findById({ _id: postid });
                if (!user) {
                  console.log("user not found!!!!");
                }
                if (!repliedTocomment) {
        console.log("comment not found!!!");
      }
      // const comment = await Comment.create({
        //   text: replytext,
        //   postid: postid,
        //   commentBy: {
          //     _id: user._id,
          //     username: user.username,
          //     profileimage: user.profileimage,
          //   },
          //   parent: repliedTo,
          // })
          
          await Comment.findByIdAndUpdate(
            { _id: repliedTocomment._id },
            {
              $push: {
                children: {
                  replyBy: {
                    _id: user._id,
                    name: user.username,
                    profileimage: user.profileimage,
                  },
                  text: replytext,
                },
              },
            }
            );
            
            const comments = await Comment.find({ postid: postid });
            
            const notificationObj= {
              name:user.username,
              img: user.profileimage,
              text:`${user.username} replied to your comment on ${post.creatorName}'s post`,
              typeof:"positive" 
            }

            await User.findByIdAndUpdate({_id:repliedTocomment.commentBy._id},{$push:{notifications:notificationObj}})
            
            const repliedToUser = await User.findById({_id:repliedTocomment.commentBy._id});
            
            
            IO.to("commentsroom").emit("reply", {
              Comments: comments,
              // repliedBy: {
                //   name: comment.commentBy.username,
                //   profileimage: comment.commentBy.profileimage,
                // },
                // repliedTo: {
                  //   name: repliedTocomment.commentBy.username,
                  //   profileimage: repliedTocomment.commentBy.profileimage,
                  // },
                });
                
                IO.to('notifications').emit('notificationUpdate',{Notifications:repliedToUser.notifications,User:repliedToUser});
                
              } catch (err) {
                console.log(err.message);
              }
            }
            );
            
            eventEmitter.on("addfriend", async ({ userid, requestFrom }) => {
              const friend = await User.findById({ _id: userid }).select("-password");
              const user = await User.findById({ _id: requestFrom }).select("-password");
              
              if (!friend) {
                console.log("friend not found");
              }
              if (!user) {
    console.log("user not found");
  }
  
  await User.findByIdAndUpdate(
    { _id: friend._id },
    {
      $push: {
        friendRequests: {
          _id: user._id,
          username: user.username,
          profileimage: user.profileimage,
          status: user.status,
        },
      },
    }
    );
    const friendRequest = {
      username: user.username,
      profileimage: user.profileimage,
      status: user.status,
    };
    await User.findByIdAndUpdate(
      { _id: friend._id },
      {
        $push: {
          notifications: {
            name: user.username,
            img: user.profileimage,
            text: `${user.username} sent friend request to you`,
            typeof: "request",
          },
        },
      }
      );
      
      const updatedFriend = await User.findById({ _id: friend._id });
      
      IO.to("friendrequest").emit("addfriendupdate", {
        friendRequest: friendRequest,
        requestFrom: user._id,
        requestTo: friend._id,
      });
      IO.to("notifications").emit("friendRequestNotify", {
        requestFrom: user,
        requestTo: updatedFriend,
      });
    });
    
    eventEmitter.on("acceptRequest", async ({ requestFrom, requestTo }) => {
      console.log("accept request running on server!!");
      console.log(requestFrom, requestTo);
      try {
        const requestingUser = await User.findById({ _id: requestFrom }).select(
          "-password"
          );
          const requestToUser = await User.findById({ _id: requestTo }).select(
            "-password"
            );
            console.log(requestingUser, "is requesting to", requestToUser);
            console.log(requestingUser, "is requesting !!!");
            await User.findByIdAndUpdate(
              { _id: requestTo },
              {
                $push: {
                  friends: {
                    _id: requestingUser._id,
                    username: requestingUser.username,
                    profileimage: requestingUser.profileimage,
                  },
                },
              }
              );
              await User.findByIdAndUpdate(
                { _id: requestingUser._id },
                {
                  $push: {
          friends: {
            _id: requestToUser._id,
            username: requestToUser.username,
            profileimage: requestToUser.profileimage,
          },
        },
      }
      );
      await User.findByIdAndUpdate(
        { _id: requestTo },
        {
          $pull: {
            friendRequests: {
              _id: requestingUser._id,
              username: requestingUser.username,
            },
          },
        }
        );
        const updatedUser = await User.findById({ _id: requestingUser._id });
        await User.findByIdAndUpdate(
          { _id: requestingUser._id },
          {
            $push: {
              notifications: {
                name: requestToUser.username,
                img: requestToUser.profileimage,
                text: `${requestToUser.username} have accepted your friend request!!!`,
                typeof: "accept",
              },
            },
          }
          );
          const requestingUserUpdated = await User.findById({
            _id: requestingUser._id,
          });
          IO.to("friendrequest").emit("updatedRequests", {
            FriendRequests: updatedUser.friendRequests,
            userid: requestToUser._id,
          });
          IO.to("notifications").emit("friendRequestNotify", {
            requestFrom: requestingUserUpdated,
            requestTo: requestTo,
          });
        } catch (err) {
          console.log(err.message);
        }
      });
      
      eventEmitter.on("declineRequest", async ({ requestFrom, requestTo }) => {
        console.log("decline request running on server!!");
        console.log(requestFrom, requestTo);
        try {
          const requestingUser = await User.findById({ _id: requestFrom }).select(
            "-password"
            );
            const requestToUser = await User.findById({ _id: requestTo }).select(
              "-password"
              );
              console.log(requestingUser, "is requesting to", requestToUser);
              await User.findByIdAndUpdate(
                { _id: requestToUser._id },
                {
                  $pull: {
                    friendRequests: {
                      _id: requestingUser._id,
                      username: requestingUser.username,
                      profileimage: requestingUser.profileimage,
                    },
                  },
                }
                );
                const updatedUser = await User.findById({ _id: requestingUser._id });
                await User.findByIdAndUpdate(
                  { _id: requestingUser._id },
                  {
                    $push: {
                      notifications: {
                        name: requestToUser.username,
                        img: requestToUser.profileimage,
                        text: `${requestToUser.username} declined your friend request`,
                        typeof: "decline",
                      },
                    },
                  }
                  );
                  const requestingUserUpdated = await User.findById({
                    _id: requestingUser._id,
                  });
                  IO.to("friendrequest").emit("updatedRequests", {
                    FriendRequests: updatedUser.friendRequests,
                    userid: requestToUser._id,
                  });
                  IO.to("notifications").emit("declineRequestNotify", {
                    requestFrom: requestingUserUpdated,
                    requestTo: requestToUser,
                  });
                } catch (err) {
                  console.log(err.message);
                }
              });
              
              eventEmitter.on("unfriend", async ({ id, currentUserid }) => {
                console.log("friend is is : ", id);
                console.log("user is : ", currentUserid);
                
                try {
                  const friend = await User.findById({ _id: id });
                  if (friend) {
                    await User.findByIdAndUpdate(
                      { _id: currentUserid },
                      { $pull: { friends: { _id: id } } }
                      );
                      await User.findByIdAndUpdate(
                        { _id: id },
                        { $pull: { friends: { _id: currentUserid } } }
                        );
                      }
                      
                      const UpdatedUser = await User.findById({ _id: currentUserid });
                      
                      IO.to("profileroom").emit("friendsUpdate", {
                        UpdatedUser,
                        message: "unfriend successfull!!",
                      });
                    } catch (err) {
                      IO.to("profileroom").emit("friendsUpdateError", {
                        message: "unfriend unsuccessfull!!!",
                      });
                      console.log(err.message);
                    }
                  });
                  
                  eventEmitter.on("postUpdate", async ({ postid, postCreatorName, text }) => {
                    try {
                      await Post.findByIdAndUpdate(
                        { _id: postid },
                        { $set: { description: text } }
                        );
                        const updatedPosts = await Post.find({ creatorName: postCreatorName });
                        IO.to("profileroom").emit("postupdate", {
                          updatedPosts: updatedPosts,
                          message: "post updated successfully!!!",
                        });
                      } catch (err) {
    IO.to("profileroom").emit("postupdateError", {
      message: "post update unsuccessfull !",
    });
    console.log(err.message);
  }
});

eventEmitter.on("postDelete", async ({ postid, postCreatorName }) => {
  try {
    await Post.findByIdAndDelete({ _id: postid });
    await Comment.findOneAndDelete({ postid: postid });
    const updatedPosts = await Post.find({ creatorName: postCreatorName });
    IO.to("profileroom").emit("postdelete", {
      updatedPosts: updatedPosts,
      message: "post deleted successfully!!",
    });
  } catch (err) {
    IO.to("profileroom").emit("postdeleteError", {
      message: "post delete unsuccessfull !",
    });
    console.log(err.message);
  }
});

eventEmitter.on("singleNotificationClear", async ({ id, userid }) => {
  try {
    console.log("single notification clear is running on server!!");
    
    await User.findByIdAndUpdate(
      { _id: userid },
      { $pull: { notifications: { _id: id } } }
      );
      const updatedUser = await User.findById({ _id: userid });
      
      const user = await User.findById({_id:userid});
      
      IO.to("notifications").emit("notificationUpdate", {
        Notifications: updatedUser.notifications,
        User:user
      });
    } catch (err) {
      console.log(err.message);
    }
  });
  
  eventEmitter.on("clearAllNotifications", async ({ userid }) => {
    try {
      await User.findByIdAndUpdate(
        { _id: userid },
        { $set: { notifications: [] } }
        );
        const updatedUser = await User.findById({ _id: userid });
        IO.to("notifications").emit("notificationClear", {
          Notifications: updatedUser.notifications,
        });
      } catch (err) {
        console.log(err.message);
      }
    });
    
    eventEmitter.on("commentLike", async ({ userid, commentid, postid }) => {
      console.log("commentlike running on server!!!");
      
      try {
        const user = await User.findById({ _id: userid });
        const checkLike = await Comment.findOne(
          { _id: commentid },
          { likes: { $elemMatch: { _id: user._id } } }
          );
          console.log(checkLike);
          if (checkLike.likes.length !== 0) {
            console.log("like exists!!!!");
            await Comment.findByIdAndUpdate(
              { _id: commentid },
        { $pull: { likes: { _id: user._id, username: user.username } } }
        );
        // const post = await Post.findById({_id:postid});
        const comments = await Comment.find({ postid: postid });
        IO.to("commentsroom").emit("commentLikeUpdate", { Comments: comments });
        
        const comment = await Comment.findById({ _id: commentid });
        
        const CommentedUser = await User.findById({ _id: comment.commentBy._id });
        
        const post = await Post.findById({ _id: postid });
        
        const notificationObj = {
          name:user.username,
          img:user.profileimage,
          text:`${user.username} liked your comment on ${post.creatorName}'s post`,
          typeof:"request",
        };
        
        await User.findById(
          { _id: CommentedUser._id },
          { $push: { notifications: notificationObj } }
          );
          
          const Commented__User = await User.findById({ _id:CommentedUser._id });
          
          IO.to("notifications").emit("notificationUpdate", {
            Notifications: Commented__User.notifications,
            User: Commented__User
          });
        } else {
          await Comment.findByIdAndUpdate(
            { _id: commentid },
            { $push: { likes: { _id: user._id, username: user.username } } }
            );
            await Comment.findByIdAndUpdate(
              { _id: commentid },
              { $pull: { dislikes: { _id: user._id, username: user.username } } }
              );
              const comments = await Comment.find({ postid: postid });
              IO.to("commentsroom").emit("commentLikeUpdate", { Comments: comments });
              
              const comment = await Comment.findById({ _id: commentid });
              
              const CommentedUser = await User.findById({ _id: comment.commentBy._id });
              
              const post = await Post.findById({ _id: postid });
              
              const notificationObj = {
                name:user.username,
                img:user.profileimage,
                text:`${user.username} liked your comment on ${post.creatorName}'s post`,
                typeof:"request",
              };
              await User.findByIdAndUpdate(
                { _id: CommentedUser._id },
                { $push: { notifications: notificationObj } }
                );
                
                const Commented__User = await User.findById({ _id:CommentedUser._id });
                
                
                IO.to("notifications").emit("notificationUpdate", {
                  Notifications:Commented__User.notifications,
                  User:Commented__User,
                });
              }
            } catch (err) {
              console.log(err.message);
            }
          });
          
          eventEmitter.on("commentDislike", async ({ userid, commentid, postid }) => {
            console.log("commentdislike running on server!!!");
            try {
              const user = await User.findById({ _id: userid });
              const checkDislike = await Comment.findOne(
                { _id: commentid },
                { dislikes: { $elemMatch: { _id: user._id } } }
                );
                console.log(checkDislike);
                if (checkDislike.dislikes.length !== 0) {
                  console.log("dislike exists!!!!");
                  await Comment.findByIdAndUpdate(
                    { _id: commentid },
                    { $pull: { dislikes: { _id: user._id, username: user.username } } }
                    );
                    // const post = await Post.findById({_id:postid});
                    // if(!post){
                      //   console.log('post not found!!!!!');
                      // }
                      const comments = await Comment.find({ postid: postid });
                      
                      
                      const comment = await Comment.findById({ _id: commentid });
                      
                      const CommentedUser = await User.findById({ _id: comment.commentBy._id });
                      
                      const post = await Post.findById({ _id: postid });
                      
                      const notificationObj = {
                        name:user.username,
                        img:user.profileimage,
                        text:`${user.username} disliked your comment on ${post.creatorName}'s post`,
                        typeof:"request",
                      };
                      
      await User.findByIdAndUpdate(
        { _id: CommentedUser._id },
        { $push: { notifications: notificationObj } }
        );
        
        const Commented__User = await User.findById({ _id:CommentedUser._id });
        
        IO.to("commentsroom").emit("commentDislikeUpdate", {
          Comments: comments,
        });
        IO.to("notifications").emit("notificationUpdate", {
          Notifications: Commented__User.notifications,
          User: Commented__User
        });
        
      } else {
        await Comment.findByIdAndUpdate(
          { _id: commentid },
          { $push: { dislikes: { _id: user._id, username: user.username } } }
          );
          await Comment.findByIdAndUpdate(
            { _id: commentid },
            { $pull: { likes: { _id: user._id, username: user.username } } }
            );
            // const post = await Post.findById({_id:postid});
            // if(!post){
              //   console.log('post not found!!!!!');
              // }
              const comments = await Comment.find({ postid: postid });
              
              const comment = await Comment.findById({ _id: commentid });
              
              const CommentedUser = await User.findById({ _id: comment.commentBy._id });
              
              const post = await Post.findById({ _id: postid });
              
              const notificationObj = {
                name:user.username,
                img:user.profileimage,
                text:`${user.username} disliked your comment on ${post.creatorName}'s post`,
                typeof:"request",
              };
              
              await User.findByIdAndUpdate(
                { _id: CommentedUser._id },
                { $push: { notifications: notificationObj } }
                );
                
                const Commented__User = await User.findById({ _id:CommentedUser._id });
                
                
                
                IO.to("commentsroom").emit("commentDislikeUpdate", {
                  Comments: comments,
                });
                
                IO.to("notifications").emit("notificationUpdate", {
                  Notifications: Commented__User.notifications,
                  User: Commented__User
                });
              }
            } catch (err) {
              console.log(err.message);
            }
          });
          
          // ! chatting functionality
          
          eventEmitter.on("joinChatRoom", async ({ current, friend }) => {
            try {
              const Currentuser = await User.findById({ _id: current });
              const Friend = await User.findById({ _id: friend });
              
              const checkChat = await Chat.findOne({
                roomname: `${Currentuser.username}_and_${Friend.username}`,
              });
              
              if (checkChat) {
                console.log("chat exists!!!");
              } else {
                const user1 = {
                  _id: Currentuser._id,
                  username: Currentuser.username,
                  profileimage: Currentuser.profileimage,
                  status: Currentuser.status,
                };
                
                const user2 = {
                  _id: Friend._id,
                  username: Friend.username,
                  profileimage: Friend.profileimage,
                  status: Friend.status,
                };
                const Chat = await Chat.create({
                  roomname: `${Currentuser.username}_and_${Friend.username}`,
                  users: [user1, user2],
                  chatType: "privateChat",
                });
                console.log(chat);
              }
            } catch (err) {
              console.log(err.message);
            }
          });
          