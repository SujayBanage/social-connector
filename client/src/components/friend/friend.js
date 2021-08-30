import React,{useContext}from 'react';
import {Link} from 'react-router-dom';
import './friend.css';
import Button from '../../UIshared/button/button.js';
import {socketContext} from '../../index.js';
const Friend = (props) => {

    const socket = useContext(socketContext);

    const unfriendHandler =()=>{
        console.log('unfriend handler is running!!!!');
        socket.emit('unfriend',{id:props.id,currentUserid:props.currentUser._id});
    }



    return (
        <div className={props.currentUser.username===props.postCreatorName || props.currentUser.username === props.user.Username ? "friend md:h-40 w-4/5 m-4 flex items-center justify-around rounded-md p-4" :"friend_2 w-4/5 md:h-40 m-4 flex items-center justify-center rounded-md p-4"}  >
        <div className="md:h-20 md:w-20">
           { 
            props.img ? 
           <img src={`http://localhost:8000/output/${props.img}`} className="h-14 md:h-20 w-14 md:w-20 rounded-full border-4 border-white " alt="image"/> : null
           } 
        </div>
            <Link to={`/profile/${props.name}`} className={props.currentUser.username===props.postCreatorName || props.currentUser.username === props.user.Username ? "text-white md:text-xl font-bold m-4 " :"text-white md:text-xl font-bold m-4"}>
                <span>
                {props.name}            
                </span>
            </Link>
            {
                props.currentUser.username === props.postCreatorName || props.currentUser.username === props.user.Username ? <Button text="unfriend ❌" classname="text-white bg-red-400 md:m-4 p-1 md:p-2 rounded-md hover:bg-red-500 border-2 border-white" onclickHandler={unfriendHandler}/> :null
            }
        </div>
    )
}

export default Friend;
