import React, {useState ,useEffect} from "react";
import Form from "../../UIshared/form/form.js";
import apiRequestService from "../../services/apiRequestService.js";
import {useHistory} from 'react-router-dom';
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

const Login = () => {

  const history = useHistory();

  const [state, setState] = useState({ email: "", password: "" });

  useEffect(() => {
    if(sessionStorage.getItem("authToken")){
      history.push("/");
      return;
    }
  },[])

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!state.password || !state.email) {
      console.log("Please enter details again");
      return;
    }

    const isEmail = validator.isEmail(state.email);

    if(!isEmail) {
      console.log("Please enter details again")
      return;
    }

    const data = {
      email: state.email,
      password: state.password,
    };

    const loginRequest = new apiRequestService();
    const response = await loginRequest.sendformData("http://143.244.133.3/auth/userLogin",data);
    if(response.data.success===true){
      console.log("login successfulll!!!");
    }
        
    const {success,authToken,refreshToken,message} = response.data;
    console.log(response);
    if(success===true){
      sessionStorage.setItem("authToken",authToken);
      localStorage.setItem("refreshToken",refreshToken);
      setState({ email: "", password: "" });
      notify(response.data.success,response.data.message);
      setTimeout(()=>{
        history.push('/feed');
      },3000)
    }
    else{
      notify(response.data.success,response.data.message);
      console.log(message);
    }
    

  };

  return (
    <>
    <div className="loginComponent h-screen">
      <div className="flex items-center justify-center mt-20">
      <Form
        type="login"
        state={state}
        onChangeHandler={inputChangeHandler}
        onSubmitHandler={submitHandler}
      />
      </div>
    </div>
    </>
  );
};

export default Login;
