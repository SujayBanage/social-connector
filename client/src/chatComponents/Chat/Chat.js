import React, { useContext, useEffect, useReducer ,Suspense,lazy} from "react";
import { socketContext } from "../../index.js";
import { useParams ,useHistory} from "react-router-dom";
import Button from "../../UIshared/button/button.js";
import apiRequestService from "../../services/apiRequestService.js";
import "./Chat.css";
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import iphone from './iPhone.mp3';
const ChatUser =lazy(() =>import('../chatUser/chatUser.js'));
const Friend = lazy(() =>import("../friend/friend.js"));
const Message= lazy(()=>import("../message/message.js"));
let ring = new Audio(iphone);


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






const ACTIONS = {
  SET_MESSAGE: "setMessage",
  SET_MESSAGES: "setMessages",
  SET_TEXT: "setText",
  SET_CHATTYPE: "setChatType",
  SET_ADDUSERS: "setAddUsers",
  SET_USERS: "setUsers",
  SET_CHATUSERS:"setChatUsers",
  SET_FRIENDS:'setFriends',
  SET_CHOSEN_EMOJI:'setChosenEmoji'
};

const Chat = () => {
  const socket = useContext(socketContext);
  const { chatroom, currentuser } = useParams();
  console.log('in chatroom : ',chatroom,"current user : ",currentuser);

  const history = useHistory();

  const initialState = {
    text: "",
    messages: [],
    chatType: "",
    addusers: false,
    users: "",
    chatusers:[],
    userfriends: [],
    emoji:null
  };
  
  const reducer = (state, action) => {
    if (action.type === "setText") {
      return { ...state, text: action.payload };
    }
    // else if(action.type === 'setMessage'){
      //     return {...state,message:{...action.payload}}
      // }
      else if (action.type === "setMessages") {
        return { ...state, messages: [...action.payload] };
      } else if (action.type === "setChatType") {
        return { ...state, chatType: action.payload };
      } else if (action.type === "setAddUsers") {
        return { ...state, addusers: action.payload };
      } else if (action.type === "setUsers") {
        return { ...state, users: action.payload };
      }
      else if(action.type==='setChatUsers'){
        return { ...state, chatusers:[...action.payload] };
      }
      else if(action.type==='setFriends'){
        return { ...state, userfriends:[...action.payload] };
      }
      else if(action.type==='setChosenEmoji'){
        return { ...state,emoji:{...action.payload} };
      }
      else {
        return state;
      }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(chatroom);
    if(currentuser){
      socket.emit("join", { roomname: chatroom });
    }
    (async () => {
      try {
        const res = await apiRequest.fetchPrivateData(
          `http://localhost:8000/private/getmessages/${chatroom}`,
          sessionStorage.getItem("authToken")
        );

        if(res.data.success===true) {
          dispatch({ type: ACTIONS.SET_MESSAGES, payload: res.data.messages });
          dispatch({ type: ACTIONS.SET_CHATTYPE, payload: res.data.chatType });
          dispatch({ type: ACTIONS.SET_CHATUSERS, payload: res.data.chatUsers });
          dispatch({ type: ACTIONS.SET_FRIENDS, payload: res.data.userfriends});
        }
        
      } catch (err) {
        console.log(err);
      }
    })();
    
    return () => {
      socket.off();
    };
  }, [socket]);
  
  socket.on("updatedMessages", ({ messages,currentmsg }) => {
    if(currentmsg.user!== currentuser){
      ring.play();
    }
    dispatch({ type: ACTIONS.SET_MESSAGES, payload: messages });
  });
  
  socket.on('updatedUsers',({users,userfriends,userAdded})=>{
    dispatch({ type: ACTIONS.SET_CHATUSERS, payload:users});
    dispatch({ type: ACTIONS.SET_FRIENDS, payload:userfriends});
    const message = {
      text :`${userAdded.username} is added to ${chatroom} room`,
      user:'admin'
    }
    // socket.emit('message',{message:message,roomname: chatroom});
    notify(true,message.text);
  })


  
  const messageHandler = () => {
    const message = {
      text: state.text,
      user: currentuser,
    };
    // dispatch({type:ACTIONS.SET_MESSAGE,payload:message});
    socket.emit("message", { message: message, roomname: chatroom });
    dispatch({ type: ACTIONS.SET_TEXT, payload: "" });
  };


  return (
    <div className="chatComponent flex flex-col md:flex-row h-full w-full md:w-screen  items-center md:items-center justify-center">
      <div className="chatUsers flex flex-row flex-wrap md:flex-col items-center md:items-center justify-center md:justify-start md:h-screen w-screen md:w-1/5 overflow-x-scroll overflow-y-scroll">
        {/* <h1 className="text-center text-white font-bold">Active Users</h1> */}
        {
          state.chatusers.length!==0 ? state.chatusers.map((usr)=>{

            return <Suspense fallback={<h1>loading....</h1>}>
            <ChatUser key ={usr._id} id={usr._id} username={usr.username} profileimage={usr.profileimage} status={usr.status}/> 
            </Suspense>
          }) : <h1>No users!!!</h1>
        }


      </div>

      <div className="chatContainer flex flex-col items-center justify-center md:h-screen w-screen md:w-7/12 mr-4 ml-4">
        <div className="chatBox flex flex-col overflow-y-scroll md:overflow-y-scroll p-4 mt-4 rounded-md h-full w-screen md:w-full">
          {state.messages.length !== 0 ? (
            state.messages.map((message) => {
              return (
                <Suspense fallback={<h1>loading.....</h1>}>
                <Message message={message} currentuser={currentuser}/>
                </Suspense>
              );
            })
          ) : (
            <h1>no messages</h1>
          )}
        </div>
        <div className="messageBox flex w-full">
          <input
            type="text"
            className="w-full mt-2"
            value={state.text}
            onChange={(e) =>
              dispatch({ type: ACTIONS.SET_TEXT, payload:e.target.value})
            }
          >
          </input>
          {/* <Picker onEmojiClick={(event,emojiObject)=>dispatch({ type:ACTIONS.SET_CHOSEN_EMOJI,payload:emojiObject})} pickerStyle={{width:"100%"}}/> */}
          <Button
            text="send"
            onclickHandler={messageHandler}
            classname="p-1 h-10 m-2 send rounded-md bg-green-500 text-white "
          />
          <Button text="leavechat" onclickHandler={()=>{
            history.push('/messages')
          }} classname="p-1 h-10 m-2 leavechat rounded-md bg-red-500 text-white "/>
        </div>
      </div>


           
      <div className={state.chatType==="groupChat" ? "Addusers overflow-y-scroll flex md:flex-col  flex-wrap m-2 items-center justify-center md:justify-start h-36 md:h-screen w-screen md:w-1/3" : "hidden"}>
            {
              state.userfriends.length!==0 ? state.userfriends.map((friend)=>{
                return <Suspense fallback={<h1>loading.....</h1>}>
                <Friend key ={friend._id} id={friend._id} username={friend.username} profileimage={friend.profileimage} chatroom ={chatroom} currentuser={currentuser} type="groupChat"/>
                </Suspense>
              }) : <h1 className="text-white">No friends</h1>
            }
      </div>

     
    </div>
  );
};

export default Chat;
