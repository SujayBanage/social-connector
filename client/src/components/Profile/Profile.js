import React, { useEffect, useState, useContext,Suspense,lazy } from "react";
import { useParams,useHistory} from "react-router-dom";
import { socketContext } from "../../index.js";
import Button from "../../UIshared/button/button.js";
import "./Profile.css";
import profile from "../../images/profile.png";
import axios from "axios";
import {toast } from "react-toastify";
import apiRequestService from "../../services/apiRequestService.js";
lazy(()=>import ('react-toastify/dist/ReactToastify.css'))
const SideBar = lazy(()=>import("../sideBar/sideBar.js"));
const apiRequest = new apiRequestService();
const Friend = lazy(()=>import('../friend/friend.js'));
const Singlepost = lazy(()=>import('../singlePost/singlepost.js'))


const notify = (success, message) => {
  if (success===true) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId:'success'
    });
  } else if (success===false){
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId:'fail'
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
      toastId:'no'
    });
  }
};


const Profile = () => {
  const { postCreatorName } = useParams();
  console.log(postCreatorName);
  const history = useHistory();
  const socket = useContext(socketContext);
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Profileimage: "",
    Posts: [],
    Friends: [],
  });

  useEffect(() => {
    socket.emit("join", { roomname: "profileroom" });
    return () => {
      socket.off();
    };
  }, []);

  socket.on("friendsUpdate", ({ UpdatedUser,message}) => {
    setUser({
      Username: UpdatedUser.username,
      Email: UpdatedUser.email,
      Profileimage: UpdatedUser.profileimage,
      Posts: [...user.Posts],
      Friends: [...UpdatedUser.friends],
    });
    notify(true,message);
  });
  
  socket.on("friendsUpdateError",({message}) => {
    notify(false,message);
  })
  
  socket.on('postupdate',({updatedPosts,message})=>{
    setUser({...user,Posts:[...updatedPosts]});
    notify(true,message);
  });
  
  socket.on('postupdateError',({message})=>{
    notify(false,message);
  })
  
  socket.on('postdelete',({updatedPosts,message})=>{
    setUser({...user,Posts:[...updatedPosts]});
    notify(true,message);
  })
  
  socket.on('postdeleteError',({message})=>{
    notify(false,message);
  })
  

  useEffect(() => {
    async function fetchData() {
      const res = await apiRequest.fetchPrivateData(
        "/private/getuserdata",
        sessionStorage.getItem("authToken")
      );
      console.log(res);
      setCurrentUser(res.data.user);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetch() {
      let res;
      postCreatorName
        ? (res = await apiRequest.fetchData(
            `/getuserdata/${postCreatorName}`
          ))
        : (res = await apiRequest.fetchPrivateData(
            "/private/getuserdata",
            sessionStorage.getItem("authToken")
          ));
      console.log(res.data);
      console.log(res.data.posts);
      const { username, email, profileimage, friends } = res.data.user;
      setUser({
        Username: username,
        Email: email,
        Profileimage: profileimage,
        Friends: [...friends],
        Posts: [...res.data.posts],
      });
      // console.log(user);
    }
    fetch();
  }, []);


  const logoutHandler=async()=>{
    const config = {
      headers:{
        "content-type":"application/json",
        "Authorization":`Bearer ${sessionStorage.getItem("authToken")}`,
      }
    }
    const data = {
      status:"offline"
    }
    const res = await axios.post('/auth/userLogout',data,config);
    console.log(res);

    if(res.data.success){
      sessionStorage.removeItem('authToken');
      notify(res.data.success, res.data.message);
      setTimeout(() => {
        history.push('/login')
      },3000)
    }
    else{
      notify(res.data.success, res.data.message);
    }

  }
  // console.log(user);

  return (
    <>
    <Suspense fallback={<h1>loading...</h1>}>
      <SideBar />
    </Suspense>
      <div className="profile h-full w-full flex flex-col items-center mt-4">
        <div className="profilePic h-1/4 flex flex-col items-center justify-center 4 h-96">
          {user.Profileimage ? (
            <img
              src={`http://143.244.133.3/output/${user.Profileimage}`}
              className="m-2 object-contained" alt="image"
            />
          ) : (
            <img src={profile} className="h-10 w-10" alt="icon" />
          )}
        </div>

          {currentUser.username === user.Username ? (
            <Button
              linkTo="/profileupload"
              text="Change Profile Pic"
              classname="profilechange mt-4"
            />
          ) : null}

        <div className="username m-4 w-4/5 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl">
          <span className="md:text-xl">
            Username:
            <h1 className="md:text-2xl font-bold text-left">{user.Username}</h1>
          </span>
        </div>
        <div className="email m-4 w-4/5 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl">
          <span className="md:text-xl">
            Email:<h1 className="md:text-2xl font-bold text-left">{user.Email}</h1>
          </span>
        </div>
        {currentUser.username === user.Username ? (
          <h1 className="text-center text-white font-bold md:text-2xl m-8">Your Friends</h1>
        ) : (
          <h1 className="text-center text-white font-bold md:text-2xl m-8">
            {user.Username}'s Friends
          </h1>
        )}
        {user.Friends.length !== 0 ? (
          <div className="friendsContainer h-1/4 flex flex-wrap w-full items-center justify-center overflow-y-scroll">
            {user.Friends.map((friend) => {
              return (
                <>
                <Suspense fallback={<h1 className="text-white">loading...</h1>}>
                <Friend
                  key={friend._id}
                  id={friend._id}
                  name={friend.username}
                  img={friend.profileimage}
                  currentUser={currentUser}
                  postCreatorName={postCreatorName}
                  user={user}
                />
                </Suspense>
                </>
              );
            })}
          </div>
        ) : (
          <div className="friends w-4/5 md:text-xl font-bold mt-4 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl">
            Friends : no friends yet
          </div>
        )}
        {currentUser.username === user.Username ? (
          <h1 className="text-center text-white font-bold md:text-2xl m-8">Your Posts</h1>
        ) : (
          <h1 className="text-center text-white font-bold md:text-2xl m-8">
            {user.Username}'s Posts
          </h1>
        )}
        <div className="postsContainer h-3/5 overflow-y-scroll flex flex-col flex-wrap items-center justify-center">
        {user.Posts.length !== 0 ? (
          user.Posts.map((post) => {
            return (<>
              <Suspense fallback={<h1 className="text-white">loading...</h1>}>
              <Singlepost
                key={post._id}
                postid={post._id}
                imgsrc={post.imgsrc}
                description={post.description}
                CreatorName={post.creatorName}
                currentUser={currentUser.username}
                user={user.Username}
              />
              </Suspense>
              </>
            );
          })
        ) : (
          <div className="friends md:text-xl font-bold mt-4 w-4/5 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl">
            posts : no posts yet
          </div>
        )}
        </div>
       <Button text="Logout" classname={currentUser.username===user.Username ? 'logout rounded-md p-2 m-2 text-white' : 'hidden'} onclickHandler={logoutHandler}/>   
      </div>
      {/* <ToastContainer/> */}
    </>
  );
};

export default Profile;
