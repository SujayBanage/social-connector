import React, { useReducer, useEffect, useContext ,Suspense,lazy} from "react";
import Button from "../../UIshared/button/button.js";
import { useHistory} from "react-router-dom";
import { socketContext } from "../../index.js";
import "./Messages.css";
import Friend from "../../chatComponents/friend/friend.js";
import SingleChat from "../../chatComponents/singlechat/singleChat.js";
import apiRequestService from "../../services/apiRequestService.js";
import {toast } from "react-toastify";
lazy(()=>import("react-toastify/dist/ReactToastify.css"))
const SideBar = lazy(()=>import("../sideBar/sideBar.js"));
const apiRequest = new apiRequestService();

const successid = 'success';
const failid = 'fail';
const noid = 'noid';

const ACTIONS = {
  SET_CURRENT_USER: "setCurrentUser",
  SET_FRIEND: "setFriend",
  SET_TEXT: "setText",
  SET_SEARCH: "setSearch",
  FIND_FRIEND: "findFriend",
  SET_CHATS: "setChats",
  SET_GROUPCHAT: "setGroupChat",
  SET_GROUPCHATS:'setGroupChats'
};

const notify = (success, message) => {
  if (success === true) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId:successid
    });
  } else if (success === false) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId:failid
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
      toastId:noid
    });
  }
};




const Messages = () => {
  const socket = useContext(socketContext);
  
  useEffect(() => {
    socket.emit("join", { roomname: "messagesRoom" });
    return () => {
      socket.off();
    };
  }, []);
  
  socket.on("chatRoomCreated", ({ roomname, currentuser }) => {
    console.log(roomname);
    history.push(`/chat/${roomname}/${currentuser.username}`);
  });
  
  socket.on('groupChatCreated',({groupChat,currentuser})=>{
    console.log(groupChat);
    console.log(currentuser);
    history.push(`/chat/${groupChat.roomname}/${currentuser.username}`);
  })

  socket.on('groupChatFailed',({message})=>{
    notify(false,message);
    dispatch({type:ACTIONS.SET_GROUPCHAT,payload:''})
  })

  // socket.on('updatedChats',({chats})=>{
  //   dispatch({type:ACTIONS.SET_CHATS,payload:[...chats]})
  // })
  
  // socket.on('updatedGroupChats',({chats})=>{
  //   dispatch({type:ACTIONS.SET_GROUPCHATS,payload:[...chats]})
  // })
  
  socket.on('deletedPrivateChat',({privateChats})=>{
    // console.log(privateChats);
    dispatch({type:ACTIONS.SET_CHATS,payload:[...privateChats]})
    notify(true,"chat deleted successfully!!!")
  })
  
  socket.on('deletedGroupChat',({groupChats})=>{
    dispatch({type:ACTIONS.SET_GROUPCHATS,payload:[...groupChats]})
    notify(true,"chat deleted successfully!!!")
  })


  useEffect(() => {
    async function fetchChat() {
      try {
        const res = await apiRequest.fetchPrivateData(
          `${process.env.PRIVATE_URL}/getchats`,
          sessionStorage.getItem("authToken")
        );
        console.log(res);
        if(res.data.success === true) {
          dispatch({ type: ACTIONS.SET_CHATS, payload: [...res.data.chats] });
        }
        dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: res.data.user });
        console.log(res.data.user);
      } catch (err) {
        console.log(err);
      }
    }
    fetchChat();
  }, []);

  useEffect(() =>{
    async function fetchGroupChat(){
      try{
        const res = await apiRequest.fetchPrivateData(`${process.env.PRIVATE_URL}/getGroupChats`,sessionStorage.getItem("authToken"));
        console.log(res);
        if(res.data.success===true){
          dispatch({type:ACTIONS.SET_GROUPCHATS, payload:res.data.groupChats});
        }
      }
      catch(err){
        console.log(err);
      }
    }
    fetchGroupChat();
  },[])

  


  const history = useHistory();

  const initialState = {
    search: false,
    friend: {},
    currentUser: {},
    text: "",
    chats: [],
    groupchat:'',
    groupChats:[]
  };

  const findFriend = async (friend) => {
    const data = {
      username: friend,
    };
    try {
      const res = await apiRequest.getuser(
        `${process.env.PRIVATE_URL}/getuser`,
        data,
        sessionStorage.getItem("authToken")
      );
      console.log(res.data.user);
      dispatch({ type: ACTIONS.SET_FRIEND, payload: res.data.user });
      dispatch({
        type: ACTIONS.SET_CURRENT_USER,
        payload: res.data.currentUser,
      });
      dispatch({ type: ACTIONS.SET_TEXT, payload: "" });
      dispatch({ type: ACTIONS.SET_SEARCH, payload: !state.search });
    } catch (e) {
      console.log(e.message);
    }
  };

  const reducer = (state, action) => {
    if (action.type === "setCurrentUser") {
      return { ...state, currentUser: { ...action.payload } };
    } else if (action.type === "setSearch") {
      return { ...state, search: action.payload };
    } else if (action.type === "setText") {
      return { ...state, text: action.payload };
    } else if (action.type === "findFriend") {
      findFriend(action.payload);
      return state;
    } else if (action.type === "setFriend") {
      return { ...state, friend: { ...action.payload } };
    } else if (action.type === "setChats") {
      return { ...state, chats: [...action.payload] };
    }
    else if(action.type === "setGroupChat"){
      return {...state,groupchat: action.payload}
    } 
    else if(action.type === "setGroupChats"){
      console.log(state.groupChats);
      return {...state,groupChats:[...action.payload]}
    }
    else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const chatHandler = () => {
    socket.emit("createChatRoom", {
      currentuser: state.currentUser,
      friend: state.friend,
    });
  };

  const groupChatHandler = () => {
    socket.emit("createGroupChat",{roomname:state.groupchat,currentUser:state.currentUser})
  } 

  return (
    <>
    <Suspense fallback={<h1>loading...</h1>}>
      <SideBar />
    </Suspense>
      <div className="messagesContainer flex h-full md:h-full w-screen flex-col md:flex-row items-center justify-center">
        <div className="searchUserContainer flex flex-col items-center justify-center h-1/2 md:h-screen w-screen md:w-1/2">


          {/* //! search button */}
          <Button
            text="search user"
            classname="searchUser text-white text-sm rounded-md p-2 mt-4 "
            onclickHandler={() =>
              dispatch({ type: ACTIONS.SET_SEARCH, payload: !state.search })
            }
          />

          {/* //! search div */}

          <div
            className={
              state.search
                ? "searchDiv flex items-center justify-center w-full"
                : "hidden"
            }
          >
            <input
              className="h-10 rounded-md "
              type="text"
              placeholder="...search friend"
              value={state.text}
              onChange={(e) =>
                dispatch({ type: ACTIONS.SET_TEXT, payload: e.target.value })
              }
            />
            <Button
              text="search"
              classname="search m-2 bg-blue-500 text-white text-lg rounded-md p-2"
              onclickHandler={() =>
                dispatch({ type: ACTIONS.FIND_FRIEND, payload: state.text })
              }
            />
          </div>

          {/* //! searched friend*/}

          <div className="friends flex flex-col items-center justify-center">
            {state.friend.username ? (<>
            <Suspense>
              <Friend
                username={state.friend.username}
                profileimage={state.friend.profileimage}
                chatHandler={chatHandler}
              />
            </Suspense>
              </>
            ) : (null
            )}
          </div>

          <h1 className="text-center font-bold text-white mt-10 text-xl">
            Previous Chats
          </h1>

          {/* //! all chats */}

          <div className="previousChats flex flex-col w-full  md:h-1/2 items-center justify-center overflow-y-scroll">
            {state.chats.length !== 0 ? (
              state.chats.map((chat) => {
                if(chat!==null){
                const [user1, user2] = chat.users;
                console.log(state.currentUser.username);
                console.log(user1.username);
                return (
                  <Suspense>
                  <SingleChat key ={chat._id} chatid={chat._id} type={chat.chatType} user1={user1} user2={user2} currentUser={state.currentUser} roomname={chat.roomname}/>
                  </Suspense>
                );
                }
              })
            ) : (
              <h1 className="text-white"> no chat found</h1>
            )}
          </div>
        </div>
        <div className="groupChats p-4 flex flex-col items-center justify-center h-1/2 md:h-screen w-screen md:w-1/2">
              {/* //! search div */}
              <div className="groupChatDiv flex flex-col h-44 w-full md:w-1/2 justify-center items-center mt-8 md:m-4 p-4 bg-white rounded-lg">
                <input type="text" placeholder="...enter group chat name" onChange={(e)=>dispatch({ type:ACTIONS.SET_GROUPCHAT,payload:e.target.value})} className="m-2 p-2 w-full" value={state.groupchat}/>
                <Button text="create group chat" onclickHandler={groupChatHandler} classname="createGroupChat p-2 m-2 w-full text-white font-bold"/>
              </div>
              
              <h1 className=" text-xl text-center text-white font-bold mt-4">Your Group Chat's</h1>
              
              <div className="previousGroupChats mt-4 h-4/5 md:h-1/2 w-full overflow-y-scroll">
                {
                  state.groupChats.length!==0 ? state.groupChats.map((grpChat)=>{
                    return <Suspense>
                    <SingleChat key={grpChat._id} chatid={grpChat._id} type={grpChat.chatType} grpChat={grpChat} currentUser={state.currentUser}/>
                    </Suspense>
                  }) : <h1 className="text-white">no chats found!!</h1>
                }
              </div>
        </div>      
      </div>
    </>
  );
};

export default Messages;
