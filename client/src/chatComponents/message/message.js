import React from "react";
import './message.css';

const Message = (props) => {

  return (
    <div
      className={
        props.message.user === props.currentuser
          ? "messageYou flex flex-col  text-white text-xl m-2 p-2 rounded-lg"
          : "messageOther flex flex-col  text-white text-xl m-2 p-2 rounded-lg"
      }
    >
      <div className="flex items-center ">
        {props.message.user === "admin" ? null : (
          <img
            src={`http://143.244.133.3/output/${props.message.profileimage}`}
            className="h-10 w-10 rounded-full m-2"
            alt="image"
          />
        )}
        {props.message.user === props.currentuser ? (
          <span>you</span>
        ) : (
          <span>{props.message.user}</span>
        )}
      </div>
      <span className="break-words">{props.message.text}</span>
    </div>
  );
};

export default Message;
