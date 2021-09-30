import {Post} from "../models/Post.js";
import {User} from "../models/User.js";
import {Comment} from "../models/comment.js";
import {Chat} from "../models/Chat.js";
import {Message} from "../models/Message.js";

function eventEmitterListner(eventEmitter,io) {
  console.log("eventEmitterListner is called");

  eventEmitter.on("addUserToChat", async ({ user, chatroom, currentuser }) => {
    console.log("addUserToChat event listener is running!!!!");
    console.log(user);
    console.log(chatroom);
    try {
      const currentUser = await User.findOne({ username: currentuser });
      const userToAdd = await User.findById({ _id: user });
      if (!userToAdd) {
        console.log("User not found!!!");
      } else {
        const usrObj = {
          _id: userToAdd._id,
          username: userToAdd.username,
          profileimage: userToAdd.profileimage,
          status: userToAdd.status,
        };
        await Chat.findOneAndUpdate(
          { roomname: chatroom },
          { $push: { users: usrObj } }
        );
        const chat = await Chat.findOne({ roomname: chatroom });

        let currentUserFriends = [...currentUser.friends];

        for (let i = 0; i < chat.users.length; i++) {
          for (let j = 0; j < currentUserFriends.length; j++) {
            if (chat.users[i].username === currentUserFriends[j].username) {
              const index = currentUserFriends.indexOf(currentUserFriends[j]);
              currentUserFriends.splice(index, 1);
            }
          }
        }
        console.log(currentUserFriends);

        // ! adding chat to a user
        let dummyChat = {
          _id:chat._id,
          roomname:chat.roomname
        }

        await User.findByIdAndUpdate({_id:userToAdd._id},{$push:{chats:dummyChat}})

        io.to(chatroom).emit("updatedUsers", {
          users: chat.users,
          userfriends: currentUserFriends,
          userAdded: usrObj,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  eventEmitter.on(
    "addUserToChatInvite",
    async ({ user, chatroom, currentuser }) => {
      try {
        const userToAdd = await User.findById({ _id: user });
        const currentUser = await User.findOne({ username: currentuser });

        if (!userToAdd) {
          console.log("user not found");
        } else {
          const notification = {
            name: currentUser.username,
            img: currentUser.profileimage,
            text: `${currentUser.username} is inviting you to groupchat:${chatroom}`,
            typeof: "groupChatRequest",
          };
          await User.findByIdAndUpdate(
            { _id: user },
            { $push: { notifications: notification } }
          );
          const requestTo = await User.findById({ _id: user });
          const requestFrom = await User.findById({ _id:currentUser._id})

          io.to("notifications").emit("groupChatInvite", {
            requestFrom:requestFrom,
            requestTo:requestTo,  
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  );

  eventEmitter.on(
    "groupChatDecline",
    async ({ user, chatroom, currentuser }) => {
      try {
        const userToAdd = await User.findById({ _id: user });
        const currentUser = await User.findOne({ username: currentuser });
        if (!currentUser || !userToAdd) {
          console.log("both users not found!!!");
        }
        const notification = {
          name: userToAdd.username,
          img: userToAdd.profileimage,
          text: `${userToAdd.username} declined your groupchat invite to group:${chatroom}`,
          typeof: "groupChatDecline",
        };
        await User.findByIdAndUpdate({ _id: currentUser._id },{$push:{notifications: notification}});
        const notifyTo = await User.findById({ _id:currentUser._id});
        const notifyFrom = await User.findById({_id:user});
        io.to('notifications').emit('groupChatDecline',{notifyFrom:notifyFrom,notifyTo:notifyTo});
      } catch(err){
          console.log(err.message);
      }
    }
  );

    eventEmitter.on('deleteChat',async({chatid,type,user})=>{
      console.log("delete chat running!!");
      console.log(type);
      console.log(user);
      try{
        let chats = user.chats;
        
        const chat = await Chat.findById({_id:chatid});

        let filteredChats = chats.filter((chat)=>{
          return chat._id!==chatid;
        })
        console.log(filteredChats);

        await User.findByIdAndUpdate({_id:user._id},{$set:{chats:filteredChats}});

        // const updatedUser = await User.findById({_id:user._id});

        let privateChats = [];
        let groupChats = [];
        
        for(let i=0;i<filteredChats.length;i++){
          let chat = await Chat.findOne({_id:filteredChats[i]._id,roomname:filteredChats[i].roomname});
          if(chat.chatType === 'privateChat'){
            privateChats.push(chat);
          }
          else if(chat.chatType === 'groupChat'){
            groupChats.push(chat);
          }
        }

        if(type ==='groupChat'){
          io.to('messagesRoom').emit('deletedGroupChat',{groupChats})
        }else{
          io.to('messagesRoom').emit('deletedPrivateChat',{privateChats})
        }


      }catch(err){
        console.log(err.message)
      }
        
          
    })

}

export {eventEmitterListner};
