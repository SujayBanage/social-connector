import React from "react";
import "./button.css";
import { Link } from "react-router-dom";
const button = (props) => {
  return props.linkTo ? (
    <Link to={props.linkTo} >
      <button className={props.classname}>{props.text}</button>
    </Link>
  ) : (
    <button className={props.classname} type={props.type} onClick={props.onclickHandler}>
      {props.text}
    </button>
  );
};

export default button;
