import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import apiRequestService from "../../services/apiRequestService.js";
const apiRequest = new apiRequestService();
const ChatUser = (props) => {
  
  const [status,setStatus] = useState(null);
  useEffect(() => {
    (
      async () => {
        const res = await apiRequest.fetchData(`/private/getuser/${props.id}`)
        console.log(res);
        setStatus(res.data.user.status)
      }
    )()
  },[])


  return (
    <div className={status==='online' ? "chatuser flex items-center justify-center text-white p-2 md:p-4 rounded-lg m-2 md:m-4":"hidden"}>
      <div className="userinfo flex flex-col items-center justify-center">
        <Link className="flex flex-col items-center justify-center" to={`/profile/${props.username}`} >
          <img
            src={`http://143.244.133.30/output/${props.profileimage}`}
            className={status==="online" ? "h-14 md:h-18 w-14 md:w-18 rounded-full md:mr-4 border-4 border-green-400":"h-14 md:h-20 w-14 md:w-20 rounded-full md:mr-4 border-4 border-blue-400"}
            alt="image"
          />
          {/* <span>{props.username}</span> */}
        </Link>
      </div>
      {/* <span
        className={
          status === "online" ? "text-green-400 text-xl font-bold" : "text-blue-500 text-xl font-bold"
        }
      >
        {status} */}
      {/* </span> */}
    </div>
  );
};

export default ChatUser;
