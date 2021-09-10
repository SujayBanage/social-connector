import React, { useState,useContext } from "react";
import {Link} from "react-router-dom";
import "./comment.css";
import {socketContext} from "../../../index.js";
import replyactive from "../../../images/reply-active.png";
import reply from "../../../images/reply.png";
import like from "../../../images/like.png";
import dislike from "../../../images/dislike.png";
import likeActive from "../../../images/likeActive.png";
import dislikeActive from "../../../images/dislikeActive.png";
import LazyLoad from "../../../UIshared/lazyload/lazyload";
const Comment = (props) => {
    
  const socket = useContext(socketContext);

  const [state, setState] = useState({
    likestate: false,
    dislikestate: false,
    replystate: false,
    replyClick: false,
  });

  const [Reply,setReply] = useState('');

  const replyHandler =()=>{ 
    socket.emit("reply",{replytext:Reply,repliedBy:props.userid,repliedTo:props.commentid,postid:props.postid});
    setReply('');
    setState({...state,replyClick:!state.replyClick});
  }

  const likeHandler = ()=>{
    console.log('commentlike running on client!!!')
    socket.emit('commentLike',{userid:props.userid,commentid:props.commentid,postid:props.postid});
  }
  
  
  const dislikeHandler = ()=>{
    console.log('commentdislike running on client!!!')
    socket.emit('commentDislike',{userid:props.userid,commentid:props.commentid,postid:props.postid});
  }


  return (
    <div className={state.replyClick ? "comment-active flex flex-col items-start justify-center m-2 md:m-4 rounded-lg w-5/6 md:w-3/5 p-2 text-center text-white":"comment flex flex-col items-start justify-center m-5 md:m-4 rounded-lg w-4/5 md:w-3/5 p-2 text-center text-white"}>
      <div className="commentByDiv flex items-center justify-center md:m-2">
      <Link to={`/profile/${props.commentBy.username}`}>
        <div className="flex items-center justify-center">
        <LazyLoad imgsrc={`${process.env.OUTPUT_URL}/${props.commentBy.profileimage}`} styleClass="h-10 w-10 md:h-12 md:w-12 rounded-full mr-4" alt="image"/>
        <span className="md:text-lg">{props.commentBy.username}</span>
        </div>
      </Link>
      </div>
      <div className="flex items-center justify-start m-2 w-4/5">
        <span className="md:text-lg">{props.text}</span>
      </div>

      <div className="commentResponse flex items-center justify-center m-2">
        <img
          src={state.likestate ? likeActive : like}
          onMouseOver={() => setState({...state, likestate:!state.likestate})}
          onMouseOut={() => setState({...state,likestate:!state.likestate})}
          className="h-4 md:h-7 w-4 md:w-7 m-2 md:m-4"
          onClick={likeHandler}
        />
        {props.likes.length}
        <img
          src={state.dislikestate ? dislikeActive : dislike}
          onMouseOver={() => setState({...state,dislikestate:!state.dislikestate})}
          onMouseOut={() => setState({...state,dislikestate:!state.dislikestate})}
          className="h-4 md:h-7 w-4 md:w-7 m-2 md:m-4"
          onClick={dislikeHandler}
        />
        {props.dislikes.length}
        <img
          src={state.replystate ? replyactive : reply}
          onClick={() => setState({...state,replyClick:!state.replyClick})}
          onMouseOver={() => setState({...state, replystate:!state.replystate})}
          onMouseOut={() => setState({...state,replystate:!state.replystate})}
          className="h-4 md:h-7 w-4 md:w-7 m-2 md:m-4"
        />
        {props.children.length}
      </div>
      <div className={state.replyClick ? "replydiv flex flex-col items-start justify-center w-full" : "hidden"}>
        <div className="m-2 md:mb-4">
              <label
                className="block text-gray-700 text-center md:text-xl font-bold mb-2"
                htmlFor="descreption"
              >
                reply...
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                name="comment"
                type="text"
                placeholder="reply..."
                value={Reply}
                onChange={(e)=>setReply(e.target.value)}
              />
              <button onClick={replyHandler} className="h-12 w-26 bg-green-500 text-center text-white font-bold md:text-lg p-2 rounded-md">reply</button>
        </div>
        <div className="repliesContainer w-full overflow-y-scroll">
          <h1 className="text-center font-bold md:text-lg">replies:</h1>
            {
              props.children.length!==0 ? props.children.map((child)=>{
                console.log(child);
                return <div className="reply flex flex-col w-4/5 items-start justify-center m-2 md:m-4 p-2 md:p-4 rounded-lg">              
                  <Link to={`/profile/${child.replyBy.name}`} className="flex items-center justify-center">
                    <LazyLoad imgsrc={`${process.env.OUTPUT_URL}/${child.replyBy.profileimage}`} styleClass="h-10 md:h-16 w-10 md:w-16 rounded-full mr-4"/>
                    <span>{child.replyBy.name}</span>
                  </Link>
                  <span className="mt-2 md:mt-4 break-words">{child.text}</span>
                </div>
              }) : null
            }
        </div>
      </div>
    </div>
  );
};

export default Comment;
