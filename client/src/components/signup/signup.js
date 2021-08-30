import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import Form from "../../UIshared/form/form.js";
import apiRequestService from '../../services/apiRequestService.js';
import validator from 'validator';

import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

const Signup = () => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const history = useHistory();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state,[name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!state.username||!state.password||!state.email){
      notify(false,"Please enter details again")
      // console.log("Please enter details again")
      return;
    }
    
    const isEmail = validator.isEmail(state.email);
    
    if(!isEmail){
        notify(false,"Please enter email again")
        // console.log("Please enter email again")
        return;
    }


    const data = {
      username: state.username,
      email: state.email,
      password: state.password,
    };

    const signupRequest = new apiRequestService();
    const response = await signupRequest.sendformData('http://localhost:8000/auth/userRegister',data);
    const responseData = response.data;
    console.log(responseData);

    if(responseData.success===true){
      localStorage.setItem("refreshToken",responseData.refreshToken);
      sessionStorage.setItem("authToken",responseData.authToken);
      setState({username:'',email:'',password:''});
      notify(responseData.success,responseData.message);
      setTimeout(() => {
        history.push('/feed');
      },3000);
    }




  };

  return (
    <>
    <div className="signupComponenet h-screen">
      <div className="flex items-center justify-center mt-20">
      <Form
        type="signup"
        state={state}
        onChangeHandler={inputChangeHandler}
        onSubmitHandler={submitHandler}
      />
       </div>
    </div>
    </>
  );
};

export default Signup;
