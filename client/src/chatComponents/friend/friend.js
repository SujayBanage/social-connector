import React,{useContext} from "react";
import {socketContext} from '../../index.js';
import { Link } from "react-router-dom";
import Button from "../../UIshared/button/button.js";
import './friend.css';
const Friend = (props) => {

  const socket = useContext(socketContext);

  const addUserToChatInvite =()=>{
    socket.emit('addUserToChatInvite',{user:props.id,chatroom:props.chatroom,currentuser:props.currentuser});
  }

  return (
    <div className="chatFriend flex w-1/5 items-center justify-around md:justify-center m-2 p-2 md:p-4 text-lg rounded-lg">
      <Link to={`/profile/${props.username}`} className="flex items-center justify-center">
        {props.profileimage ? (
          <img
            src={`http://143.244.133.3/output/${props.profileimage}`}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-white mr-4 "
            alt="image"
          />
        ) : null}

        <span className="mr-2 lg:flex lg:text-xl">{props.username}</span>
      </Link>
      {props.username &&  props.type!=="groupChat"? (
        <Button text="chat" classname="chatButton text-white text-lg m-2 p-2 rounded-md " onclickHandler={props.chatHandler} />
      ) : null}

      <Button text="Add" classname={props.type==="groupChat" ? "addbutton text-white text-sm md:text-md md:m-2 p-1 md:p-2 rounded-md " : "hidden"} onclickHandler={addUserToChatInvite}/>


    </div>
  );
};

export default Friend;
