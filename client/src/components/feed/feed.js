import React, {useEffect,Suspense,lazy} from "react";
import "./feed.css";
import {useHistory} from 'react-router-dom';
import {toast } from "react-toastify";
import Posts from '../posts/posts.js';
import Postupload from "../postupload/postupload";
const SideBar = lazy(()=>import('../sideBar/sideBar'));
lazy(()=>import ('react-toastify/dist/ReactToastify.css'));

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



const Feed = () => {
  const history = useHistory();

  useEffect(() => {
    if(!sessionStorage.getItem("authToken")){
      notify(false,"pls Login first!!")
        history.push("/login");
    }
  })

  return (
    <>
    <div className="feedContainer flex flex-col items-center overflow-y-scroll w-full">
      <Suspense fallback={<div className="text-white">loading.....</div>}>
      <SideBar/>
      </Suspense>

      <Postupload/>

        <Posts/>
        
      {/* <Suspense fallback={<h1>loading.....</h1>}>  */}
      {/* <div className="upload h-24 w-full flex items-center justify-center mt-2 bg-green-400 ">
        <Button linkTo="/postUpload" text="Upload" classname="Upload rounded-md p-2 text-white" />
      </div> */}
      {/* </Suspense> */}
    </div>
    </>
  );
};

export default Feed;
