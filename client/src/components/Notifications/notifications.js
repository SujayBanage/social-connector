import React, { useState, useContext, useEffect ,lazy,Suspense} from "react";
import { socketContext } from "../../index.js";
// import User from "../user/user.js";
import Notification from "./notification/notification.js";
import Button from "../../UIshared/button/button.js";
import apiRequestService from "../../services/apiRequestService.js";
const apiRequest = new apiRequestService();
const SideBar = lazy(()=>import("../sideBar/sideBar.js"));
const Notifications = () => {
  const socket = useContext(socketContext);

  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    socket.emit("join", { roomname: "notifications" });
    return () => {
      socket.off();
    };
  }, []);

  socket.on("friendRequestNotify", ({ requestFrom, requestTo }) => {
    console.log("requestFrom", requestFrom);
    console.log("requestTo", requestTo);
    // requestFrom.username!==user.username ? setNotifications([...notifications,{name:requestFrom.username,img:requestFrom.profileimage,type:"request"}]) : setNotifications([...notifications,{name:requestTo.username,img:requestTo.profileimage,type:"request"}]);
    requestFrom.username !== user.username
      ? setNotifications([...requestTo.notifications])
      : setNotifications([...requestFrom.notifications]);
  });

  socket.on("declineRequestNotify", ({ requestFrom, requestTo }) => {
    console.log("request from : ", requestFrom);
    console.log("request to : ", requestTo);
    // requestFrom.username!==user.username ? setNotifications([...notifications,{name:requestFrom.username,img:requestFrom.profileimage ,type:"decline"}]) : setNotifications([...notifications,{name:requestTo.username,img:requestTo.profileimage,type:"decline"}]);
    requestFrom.username !== user.username
      ? setNotifications([...requestTo.notifications])
      : setNotifications([...requestFrom.notifications]);
    });
    
    socket.on("notificationUpdate", ({ Notifications ,User}) => {
      console.log("notificationUpdate is running on clinet side!!");
      console.log(Notifications);
      if(user.username === User.username){
        setNotifications([...Notifications]);
      }
    });
    
    socket.on('notificationClear',({Notifications})=>{
      console.log("notificationclear is running on clinet side!!");
      setNotifications([...Notifications]);
    })
    
    socket.on('groupChatInvite',({requestFrom,requestTo})=>{
    requestFrom.username !== user.username
      ? setNotifications([...requestTo.notifications])
      : setNotifications([...requestFrom.notifications]);
    })
    
    socket.on('groupChatDecline',({notifyFrom,notifyTo})=>{
    notifyFrom.username !== user.username
      ? setNotifications([...notifyTo.notifications])
      : setNotifications([...notifyFrom.notifications]);
  })


  useEffect(() => {
    async function fetchUser() {
      const res = await apiRequest.fetchPrivateData(
        "http://localhost:8000/private/getuserdata",
        sessionStorage.getItem("authToken")
      );
      console.log(res.data.user);
      setUser(res.data.user);
      console.log(user);
      setNotifications([...res.data.user.notifications]);
      console.log(notifications);
    }
    fetchUser();
  }, []);

  const notificationClearAll = () => {
    socket.emit("clearAllNotifications",{userid:user._id});
  };

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center">
      <Suspense fallback={<h1>loading...</h1>}>
        <SideBar />
      </Suspense>
        {notifications.length === 0 ? null : (
          <Button
            text="clear-all"
            classname="clear-all text-white md:text-xl p-1 md:p-2 m-2 md:m-4 rounded-lg"
            onclickHandler={notificationClearAll}
          />
        )}

        <div className="notifications flex flex-col">
          {notifications.length !== 0 ? (
            notifications.map((notification) => {
              console.log(notification);
              return (
                <Notification
                  key={notification._id}
                  id={notification._id}
                  userid={user._id}
                  text={notification.text}
                  img={notification.img}
                  name={notification.name}
                  type={notification.typeof}
                />
              );
            })
          ) : (
            <h1 className="text-xl font-bold text-white">No notifications!!</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
