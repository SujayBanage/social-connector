import React, { useState ,useEffect,lazy} from "react";
import { Link ,useHistory} from "react-router-dom";
import "./sideBar.css";
import {toast } from "react-toastify";
import apiRequestService from "../../services/apiRequestService.js";
import menu from '../../images/menu.png';
import close from '../../images/close.png';
import bell from '../../images/bell.png';
import bellActive from '../../images/bellActive.png';
import people from '../../images/people.png';
import peopleActive from '../../images/peopleActive.png';
import friends from '../../images/friends.png';
import friendsActive from '../../images/friendsActive.png';
import message from '../../images/message.png';
import messageActive from '../../images/messageActive.png';
import feed from '../../images/feed.png';
import feedActive from '../../images/feedActive.png';
lazy(()=>import('react-toastify/dist/ReactToastify.css'))

const apiRequest = new apiRequestService();
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


const SideBar = () => {
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [state, setState] = useState({
    feed:false,
    bell: false,
    friends: false,
    profile: false,
    message: false,
    people: false,
  });
  
  const [user, setUser] = useState({username:'',profileimage:''});
  
  useEffect(() => {
    if(sessionStorage.getItem("authToken")){
      (
        async()=>{
          const res = await apiRequest.fetchPrivateData(`${process.env.PRIVATE_URL}/getuserdata`,sessionStorage.getItem("authToken"));
          console.log(res);
          setUser({username:res.data.user.username,profileimage:res.data.user.profileimage});
        }
      )()
    }
    else{
      notify(false,"please login first!!!!");
      setTimeout(() => {
        history.push("/login");
      },2000);
    }
  },[])

  


  return (
    <>
      <div className="sidebar w-full flex flex-col lg:flex-row center justify-center lg:items-center lg:justify-end">
        {/* <Suspense fallback={<div>loading...</div>}> */}

        <div
          className={
            active
              ? "activeNav flex flex-col justify-center items-start "
              : "hidden lg:flex flex-row  items-center justify-end w-full"
          }
        >
          <Link
            to="/feed"
            className="link  p-2 m-2 flex  items-center justify-center m-4 text-xl text-white "
            onMouseOver={() =>setState({...state,feed:!state.feed})}
            onMouseOut={() =>setState({...state,feed:!state.feed})}
          >
            <img src={state.feed ? feedActive : feed} className="h-6 w-6 mr-2" alt="icon" />
            Feed
          </Link>
          <Link
            to="/notifications"
            className="link  p-2 m-2   flex  items-center justify-center m-4 text-xl text-white "
            onMouseOver={() =>setState({...state,bell:!state.bell})}
            onMouseOut={() =>setState({...state,bell:!state.bell})}
          >
            <img src={state.bell ? bellActive : bell} className="h-6 w-6 mr-2" alt="icon" />
            Notifications
          </Link>
          <Link
            to="/friends"
            className="link  p-2 m-2   flex  items-center justify-between m-4 text-xl text-white "
            onMouseOver={() =>setState({...state,friends:!state.friends})}
            onMouseOut={() =>setState({...state,friends:!state.friends})}
          >
            <img src={state.friends ? friendsActive : friends} className="h-6 w-6 mr-2"  alt="icon"/>
            Friends
          </Link>

          <Link
            to="/friendrequests"
            className="link   p-2 m-2  flex  items-center justify-between m-4 text-xl text-white "
            onMouseOver={() =>setState({...state,people:!state.people})}
            onMouseOut={() =>setState({...state,people:!state.people})}
          >
            <img src={state.people ? peopleActive : people} className="h-6 w-6 mr-2"  alt="icon"/>
            FriendRequests
          </Link>
          <Link
            to="/messages"
            className="link   p-2 m-2  flex  items-center justify-between m-4 text-xl text-white "
            onMouseOver={() =>setState({...state,message:!state.message})}
            onMouseOut={() =>setState({...state,message:!state.message})}
          >
            <img src={state.message ? messageActive:message} className="h-6 w-6 mr-2"  alt="icon"/>
            Messages
          </Link>
          {/* <Link
            to="/profile"
            className="link  p-2 m-2   flex  items-center justify-between m-4 text-xl text-white "
            onMouseOver={() =>setState({...state,profile:!state.profile})}
            onMouseOut={() =>setState({...state,profile:!state.profile})}
          >
            <img src={state.profile ? profileActive:profile} className="h-6 w-6 mr-2" />
            Profile
          </Link> */}
        <div className="currentUser flex items-center justify-center text-white font-bold m-4">
          {/* <div className="userimg"/> */}
          {
            user.profileimage ?<img src={`${process.env.OUTPUT_URL}/${user.profileimage}`} className="userimg h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 lg:border-4 border-white mr-2" alt="image"/> : null
          }
          <Link to={`/profile/${user.username}`}>
          <span>{user.username}</span>
          </Link>
        </div>  
        </div>
        {/* </Suspense> */}
        <button
          onClick={() => setActive(!active)}
          className="flex items-center justify-center bg-black-500 m-2"
        >
          <img src={active ? close : menu} className="h-8 w-8 lg:hidden" alt="icon" />
        </button>
      </div>
    </>
  );
};

export default SideBar;
