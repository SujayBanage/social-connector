import React,{useContext} from "react";
import { Link } from "react-router-dom";
import "./singleChat.css";
import Button from "../../UIshared/button/button";
import { socketContext } from "../../index.js";



const SingleChat = (props) => {

  const socket = useContext(socketContext);

  const deleteChatHandler=()=>{
    let chatid = props.chatid
    let type = props.type
    let user = props.currentUser
    socket.emit('deleteChat',{chatid,type,user});
  }

  if (props.type === "privateChat") {
    return (
      <div className="chat flex items-center p-2 justify-between  md:justify-around m-2 rounded-lg  text-white w-4/5">
        <Link
          to={`/chat/${props.roomname}/${props.currentUser.username}`}
          className="flex items-center justify-start"
        >
          <img
            src={
              props.user1.username === props.currentUser.username &&
              (props.user1.profileimage || props.currentUser.username)
                ? `${process.env.OUTPUT_URL}/${props.user2.profileimage}`
                : `${process.env.OUTPUT_URL}/${props.user1.profileimage}`
            }
            className="h-12 w-12 rounded-full mr-4"
            alt="image"
          />
          <span>
            {props.user1.username === props.currentUser.username
              ? props.user2.username
              : props.user1.username}
          </span>
        </Link>

        <Button text="❌" classname="bg-red-400 p-2 rounded-md" onclickHandler={deleteChatHandler}/>
      </div>
    );
  } else {
    return (
      <div className="groupChat flex items-center justify-between md:justify-around p-2 md:p-4 m-2 md:m-4 text-white md:text-xl font-bold rounded-lg">
        <Link
          to={`/chat/${props.grpChat.roomname}/${props.currentUser.username}`}
        >
          <span>{props.grpChat.roomname}</span>
        </Link>
        <Button text="❌" classname="bg-red-400 p-2 rounded-md" onclickHandler={deleteChatHandler}/>
      </div>
    );
  }
};

export default SingleChat;
