import React, { useState, useEffect ,useContext} from "react";
import './posts.css';
import {useHistory} from 'react-router-dom';
import Post from "../posts/post/post.js";
import apiRequestService from "../../services/apiRequestService.js";
import {socketContext} from '../../index.js';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

const apiRequest = new apiRequestService();

// let socket;
// let updatedPosts;
// const END_POINT = 'http://localhost:5000';

const Posts = () => {

  const history = useHistory();

  const socket = useContext(socketContext);
  
  const [posts, setPosts] = useState([]);
  const [userid,setUserid] = useState('');
  const [message,setMessage] = useState('');

  
  // socket = io(END_POINT,{
      // transports: ["websocket", "polling", "flashsocket"],
  // })

  useEffect(() => {
    if(sessionStorage.getItem("authToken")){
      console.log(posts);
      socket.emit('join',{roomname:"postsRoom"}); 
    }
    else{
      notify(false,"pls login first!!")
      setTimeout(() =>{
        history.push("/login");
      },2000);
    }
    return ()=>{
      // socket.emit('disconnect');
      socket.off();
    }
  },[])
  
  socket.on('updatedPosts',({postsUpdated,message}) => {
      console.log("updated posts on clinet side is running");
      console.log(postsUpdated);
      setPosts(postsUpdated);
      setMessage(message);
      notify(message);
  })
  
  useEffect(() => {
    (
      async ()=>{
        const res = await apiRequest.fetchPrivateData(
          `${process.env.PRIVATE_URL}/getPosts`,
          sessionStorage.getItem("authToken")
        );
        // console.log(data);
        console.log(res);
        setPosts(res.data.posts);
        setUserid(res.data.user.id);
        console.log(userid);
      }
    )()
  }, []);

  return (
    <>
    <div className="Container flex flex-col items-center w-full  ">
      {posts.length!==0 ? posts.map((post,index) => {
        return (
          <Post
            key={post._id}
            unique={post._id}
            index={index}
            userid={userid}
            postid={post._id}
            // likes={post.likes.length}
            // dislikes={post.dislikes.length}
            likes={post.likes}
            dislikes={post.dislikes}
            postCreator={post.creatorName}
            postCreatorImg={post.creatorImg}
            imgSrc={post.imgsrc}
            description={post.description}
          />
        );
      }):<h1>No posts yet!!!</h1>}
    </div>
    </>
  );
};

export default Posts;
