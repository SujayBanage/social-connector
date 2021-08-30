import React, { useContext} from "react";
import Button from "../../UIshared/button/button.js";
import { Link } from "react-router-dom";
import profile from "../../images/profile.png";
import "./user.css";
import { socketContext } from "../../index.js";
const User = (props) => {
  const socket = useContext(socketContext);
  const onclickHandler = () => {
    socket.emit("addfriend", {
      userid: props.userid,
      requestFrom: props.requestFrom,
    });
  };

  return (
    <div className="userContainer flex items-center text-white justify-between md:justify-center md:max-w-6xl mb-2 md:mr-4 p-4 rounded-md">
      <div className="userimgContainer">
        <img
          src={
            props.imgsrc
              ? `http://localhost:8000/output/${props.imgsrc}`
              : profile
          }
          className="h-12 w-12 md:h-16 md:w-16 rounded-full mr-3 "
          alt="image"
        />
      </div>
      {props.notification === true && props.notificationType === "request" ? (
        <Link to={`/profile/${props.username}`}>
          <span className="text-xl">
            {props.username} sent you a friend request
          </span>
        </Link>
      ) : props.notificationType === "decline" ? (
        <Link to={`/profile/${props.username}`}>
          <span className="text-xl">
            {props.username} declined your friend request
          </span>
        </Link>
      ) : (
        <Link to={`/profile/${props.username}`}>
          <span className="text-sm mr-2 md:text-xl font-bold">{props.username}</span>
        </Link>
      )}
      <span
        className={
          props.status === "online"
            ? "text-green-500 hidden md:text-lg font-bold"
            : "text-blue-500 hidden md:text-lg font-bold"
        }
      >
        {props.status}
      </span>
      {props.notification ? <Button text="❌" classname="bg-red-500 p-2 rounded-md " onclickHandler={props.notificationRemove}/> : null}
      {props.friend === false ? (
        <Button
          text="Add"
          classname="border-2 border-white text-sm md:text-md font-bold text-white p-2 m-2  rounded-md"
          onclickHandler={onclickHandler}
        />
      ) : null}
    </div>
  );
};

export default User;
