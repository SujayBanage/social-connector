import React,{useState} from 'react';
import Fileupload from '../fileupload/fileupload.js';
import apiRequestService from '../../services/apiRequestService.js';
import {useHistory} from 'react-router-dom';
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



const Postupload = () => {
    const history = useHistory();
    const [file,setFile] = useState('');
    const [description,setDescription] = useState('');

    const fileUpload=(e)=>{
        setFile(e.target.files[0]);
    }
    
    const inputchange =(e)=>{
        setDescription(e.target.value);
    }

    const onSubmitHandler =async (e)=>{
        e.preventDefault();
        console.log("submit handler is working!!!")
        const formData = new FormData();
        formData.append("description",description);
        formData.append("image",file,file.name);
        console.log(formData);
        const res = await apiRequest.fileUpload('http://localhost:8000/private/postUpload',formData,sessionStorage.getItem("authToken"));
        console.log(res);
        if(res.data.success===true){
            setFile('');
            setDescription('');
            notify(res.data.success, res.data.message);
            history.push('/feed');
        }
        else{
            notify(res.data.success, res.data.message);
        }
    }

    return (
        <>
        <div className="postUploadComponent md:w-3/5">
        <Fileupload file={file} description={description} filesetHandler={fileUpload} onChangeHandler={inputchange} onSubmitHandler={onSubmitHandler}/>
        </div>
        </>
    )
}

export default Postupload;
