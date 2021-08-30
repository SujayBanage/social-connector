import React,{useEffect,useContext} from 'react';
import {socketContext} from '../../../index.js';
import {Link} from 'react-router-dom';
import './friendRequest.css';
import Button from '../../../UIshared/button/button.js';
const FriendRequest = (props) => {

    const socket = useContext(socketContext);

    useEffect(() => {
        socket.emit('join',{roomname:"requestAccept"});
        return ()=>{
            socket.off()
        }
    },[])

    const acceptHandler=()=>{
        console.log("Accept request is running on client")
        socket.emit('acceptRequest',{requestFrom:props.requestFrom,requestTo:props.requestTo});       
    }

    const declineHandler=()=>{
        console.log("declineHandler is running on client");
        console.log("requestFrom : ",props.requestFrom,"requestTo : ",props.requestTo);
        socket.emit('declineRequest',{requestFrom:props.requestFrom,requestTo:props.requestTo});
    }
    

    return (
        <div className="friendrequest w-4/5 md:w-1/4 md:h-40 flex items-center justify-center m-4 md:m-8 p-2 md:p-4 rounded-md">

{

            props.profileimage ?<img src={`http://localhost:8000/output/${props.profileimage}`} className="h-14 md:h-16 w-14  md:w-16 rounded-full border-4 border-white" alt="image"/> : null
}
        
            <Link to={`/profile/${props.username}`} className="m-2 md:m-8">
                <span className="md:text-xl text-white font-bold">{props.username}</span>
            </Link>
            <span className={props.status ? "text-xl font-bold text-green-300" : "text-xl font-bold text-blue-300"}>{props.status}</span>
            <Button classname="bg-green-400 text-white font-bold p-1 md:p-2 rounded-md border-2 border-white  hover:bg-green-500 m-1 md:m-4" text="✔" onclickHandler={acceptHandler}/>
            <Button classname="bg-red-400 text-white font-bold p-1 md:p-2 rounded-md  border-2 border-white hover:bg-red-500 m-1 md:m-4" text="❌" onclickHandler={declineHandler}/>
        </div>
    )
}

export default FriendRequest;
