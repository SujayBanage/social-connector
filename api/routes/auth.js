import express from 'express';
const auth = new express.Router();
import {checkUser} from '../middlewares/checkUser.js';

//! controllers 
import {userRegistration,userLogin,userLogout,userGoogleLogin,userFacebookLogin} from '../controllers/authControllers.js';

auth.get('/',(req, res)=>{
    res.send('<h1>helloo from auth </h1>')
})


// ! routes
auth.post('/userRegister',userRegistration)
auth.post('/userLogin',userLogin)
auth.post('/userLogout',checkUser,userLogout)
auth.post('/userGoogleLogin',userGoogleLogin)
auth.post('/userFacebookLogin',userFacebookLogin)


export {auth};