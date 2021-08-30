import React,{useState,useContext} from "react";
import "./singlepost.css";
import Button from "../../UIshared/button/button.js";
import Lazyload from '../../UIshared/lazyload/lazyload.js';
import {socketContext} from '../../index.js';
const Singlepost = (props) => {

  const socket = useContext(socketContext);

  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  
  const deleteHandler = () => {
    console.log("delete handler is runnning!!!");
    socket.emit("postDelete", {
      postid: props.postid,
      postCreatorName: props.CreatorName,
    });
  };
  const editHandler = () => {
    setEdit(!edit);
    console.log("edit handler is runnning!!!");
    socket.emit("postUpdate", {
      postid: props.postid,
      postCreatorName: props.CreatorName,
      text:editText
    });
    setEditText('');
  };


  return (
    <div className="singlepost m-8 p-2 md:p-2 rounded-md flex flex-col items-center justify-center bg-white">
      <Lazyload
        imgsrc={`http://localhost:8000/output/min-${props.imgsrc}`}
        styleClass="object-cover rounded-md"
        alt="image"
      />

      <span className="text-md">{props.description}</span>

      <div className="buttons flex">
        {props.currentUser === props.user ? (
          <>
            <Button
              text="delete ❌"
              classname="bg-red-400 text-white m-2  text-lg rounded-md p-2 hover:bg-red-500 border-2 border-white "
              onclickHandler={deleteHandler}
            />
            <Button
              text="edit 🛠"
              classname="bg-blue-400 text-white  m-2 text-lg rounded-md p-2 hover:bg-blue-500 border-2 border-white "
              onclickHandler={()=>setEdit(!edit)}
            />
          </>
        ) : null}

        {/* //! below the edit text  */}
      </div>
        <div className={edit !== true ? "hidden" : "mb-4 flex flex-col items-center"}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            edit description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="edittext"
            type="text"
            placeholder="edit description.."
            value={editText}
            onChange={(e)=>{
              setEditText(e.target.value);
            }}
          />
          <button className="bg-blue-400 text-white p-2 m-2 rounded-md" onClick={editHandler}>edit</button>
        </div>
    </div>
  );
};

export default Singlepost;
