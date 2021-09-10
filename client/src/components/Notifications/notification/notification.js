import React ,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Button from '../../../UIshared/button/button.js';
import {socketContext} from '../../../index.js';
import './notification.css';
const Notification = (props) => {

    const socket = useContext(socketContext);

    const notificationClearHandler =()=>{
        console.log('notification clear handler is running on client!!!');
        socket.emit('singleNotificationClear',{id:props.id,userid:props.userid});
    }

    const groupChatAccept =()=>{
        const chatroom = props.text.split(':');
        console.log(chatroom);
        socket.emit('addUserToChat',{user:props.userid,chatroom:chatroom[1],currentuser:props.name})
    }
    
    const groupChatDecline =()=>{
        const chatroom = props.text.split(':');
        console.log(chatroom);
        socket.emit('groupChatDecline',{user:props.userid,chatroom:chatroom[1],currentuser:props.name})
    }


    return (
        <div className={props.type==="request"||props.type==="accept"||props.type==="groupChatRequest" || props.type==="positive" ? " notificationSuccess flex  items-center justify-center p-2 md:p-4 m-2 md:m-4 rounded-lg": "notification flex  items-center justify-center p-2 md:p-4 m-2 md:m-4 rounded-lg"}>
            <div className="notificationfrom flex items-center justify-center">
            {
                props.img ? <img src={`${process.env.PRIVATE_URL}/${props.img}`} alt="profileimg" className="h-12 md:h-16 w-12 md:w-16 rounded-full border-2 border-white" alt="image"/>: null
            }
            <Link to={`/profile/${props.name}`} className="m-2 md:m-4">
                <span className="hidden md:flex md:text-xl font-bold">
                    {props.name}
                </span>
            </Link>
            </div>
            <span className="md:text-xl text-white">{props.text}</span>
            <Button text="❌" classname="rounded-md p-1 border-2 bordet-white md:p-2 bg-red-400 md:m-4 hover:bg-red-500" onclickHandler={notificationClearHandler} />
            {
                props.type === 'groupChatRequest' ? <>
                    <Button text="accept" classname="rounded-md p-1 md:p-2 bg-blue-400 md:m-4 hover:bg-blue-500" onclickHandler={groupChatAccept}/>
                    <Button text="decline"  classname="rounded-md p-1 md:p-2 bg-red-400 md:m-4 hover:bg-red-500"  onclickHandler={groupChatDecline}/>
                </> : null
            }    
        </div>
    )
}

export default Notification
