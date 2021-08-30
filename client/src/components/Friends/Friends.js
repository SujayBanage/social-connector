import React, { useContext, useEffect, useState,lazy,Suspense } from "react";
import User from "../user/user.js";
import { socketContext } from "../../index.js";
import apiRequestService from "../../services/apiRequestService.js";
const SideBar = lazy(()=>import("../sideBar/sideBar")) ;
const apiRequest = new apiRequestService();
const Friends = () => {
  const socket = useContext(socketContext);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [userid, setUserid] = useState("");

  //   const checkFriendFunction =(userid)=>{
  //     setFriends(friends.filter(friend=>{
  //         return friend._id !== userid;
  //     }))
  //   }

  const checkFriendFunction =(user)=>{
    const toCheck = {
      _id: user._id,
      username: user.username,
    }

    const users = friends.map((friend)=>{
      return friend._id===toCheck._id && friend.username === toCheck.username;
    })

    console.log(users);

    if(users.includes(true)){
      return false;
    }
    else{
      return true;
    }
  }

  useEffect(() => {
    socket.emit("join", { roomname: "addFriend" });
    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await apiRequest.fetchPrivateData(
        "http://localhost:8000/private/getallusers",
        sessionStorage.getItem("authToken")
      );
      console.log(res);
      setUserid(res.data.user._id);
      setFriends([...res.data.user.friends]);
      setUsers([...res.data.users]);
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="friendComponent flex flex-col items-center h-screen md:h-screen w-full">
    
     <Suspense fallback={<h1>loading.....</h1>}>
      <SideBar/>
     </Suspense> 
    <div className="friendsContainer flex flex-col md:flex-row md:flex-wrap mt-4">
      {friends.length !== 0 ? (
        friends.map((friend) => {
          {
            return <User imgsrc={friend.profileimage} username={friend.username} status={friend.status} friend={true}/>
          }
        })
      ) : (
        <h1 className="text-center text-white font-bold text-xl">no friends yet !!!</h1>
      )}
    </div>
      <h1 className="text-center text-white font-bold text-xl">other users</h1>
      <div className="usersContainer flex flex-col md:flex-row flex-wrap items-center justify-center p-4">
        {users.length !== 0 ? (
          users.map((user) => {
            if (user._id !== userid && checkFriendFunction(user)) {
              return (
                <User
                  key={user._id}
                  requestFrom={userid}
                  userid={user._id}
                  imgsrc={user.profileimage}
                  username={user.username}
                  status={user.status}
                  friend={false}
                />
              );
            }
          })
        ) : (
          <h1>no users yet !!!</h1>
        )}
      </div>
    </div>
    </>
  );
};

export default Friends;
