import React, { useContext, useEffect, useState,lazy,Suspense } from "react";
import { socketContext} from "../../index.js";
import FriendRequest from "./FriendRequest/friendRequest.js";
import apiRequestService from "../../services/apiRequestService.js";
const SideBar = lazy(()=>import("../sideBar/sideBar.js"));
const apiRequest = new apiRequestService();
let user;
const FriendRequests = () => {
  const socket = useContext(socketContext);
  // const userid = useContext(userContext);
  // console.log(userid);
  const [userid ,setUserid] = useState(user);

  const [friendRequests, setRequests] = useState([]);
  // const [state, setState] = useState({ requestFrom: "", requestTo: "" });

  useEffect(() => {
    socket.emit("join", { roomname: "friendrequest" });
    return () => {
      socket.off();
    };
  }, []);

  socket.on("addfriendupdate", ({ friendRequest, requestFrom, requestTo }) => {
    console.log("add friend update running on the client");
    console.log(friendRequest);
    // setState({ requestFrom: userid, requestTo: requestTo });
    // setUserid(userid);
    user = requestTo;
    // console.log(user);
    if(requestTo===userid){
      setRequests([...friendRequests, friendRequest]);
      console.log(friendRequests);
    }
  });

  socket.on('updatedRequests',({FriendRequests,userid})=>{
    console.log(FriendRequests);
    console.log(friendRequests);
    if(user===userid){
      setRequests([...FriendRequests]);
    }
  })

  useEffect(() => {
    async function fetchData() {
      const res = await apiRequest.fetchPrivateData(
        `${process.env.REACT_APP_PRIVATE_URL}/getuserdata`,
        sessionStorage.getItem("authToken")
      );
      console.log(res);
      user = res.data.user._id;
      setUserid(user);
      console.log(user);
      setRequests([...friendRequests, ...res.data.user.friendRequests]);
    }
    fetchData();
  }, []);

  return (
    <>
    <div className="friendRequestComponent h-screen w-screen">

<Suspense fallback={<h1>loading...</h1>}>
    <SideBar />
</Suspense>
      <h1 className="text-2xl font-bold text-center text-white mt-4">Friend Request's</h1>
      <div className="friendRequestContainer flex flex-col md:flex-row md:flex-wrap items-center justify-center">
        {friendRequests.length !== 0 ? (
          friendRequests.map((request) => {
            console.log(request);
            return (
              <FriendRequest
                key={request._id}
                username={request.username}
                profileimage={request.profileimage}
                status={request.status}
                requestFrom={request._id}
                requestTo={userid}
              />
            );
          })
        ) : (
          <h1 className="text-lg text-white">No friend requests!!!</h1>
        )}
      </div>
    </div>
    </>
  );
};

export default FriendRequests;
