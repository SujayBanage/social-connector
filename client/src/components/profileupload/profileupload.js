import React,{useState} from 'react'
import {useHistory} from 'react-router-dom';
import Fileupload from '../fileupload/fileupload.js';
import apiRequestService from '../../services/apiRequestService.js';
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiRequest = new apiRequestService();



const notify = (success, message) => {
  if (success === true) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (success === false) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};


const Profileupload = () => {

    const history = useHistory();

    const [file,setFile] = useState('');

    const inputHandler =(e)=>{
        setFile(e.target.files[0]);
        console.log(file);
    }

    const onSubmitHandler =async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("image",file,file.name);

        const res = await apiRequest.fileUpload('http://localhost:8000/private/profileupload',formData,sessionStorage.getItem("authToken"));
        console.log(res);
        if(res.data.success===true){
            notify(res.data.success, res.data.message)
            setTimeout(()=>{
              history.push("/profile");
            },3000)
        }else{
            notify(res.data.success, res.data.message)
        }
    }

    return (
        <>
        <div className="profileUploadComponent w-full ">
        <Fileupload filesetHandler={inputHandler} onChangeHandler={inputHandler} onSubmitHandler={onSubmitHandler} description={false} />
        </div>
        {/* <ToastContainer/> */}
        </>
    )
}

export default Profileupload;
