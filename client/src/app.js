import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/home.js";
import Login from "./components/login/login.js";
import Signup from "./components/signup/signup.js";
import Feed from "./components/feed/feed.js";
import Postupload from "./components/postupload/postupload.js";
import Profileupload from "./components/profileupload/profileupload.js";
import Notifications from "./components/Notifications/notifications.js";
import Friends from "./components/Friends/Friends.js";
import FriendRequests from "./components/friendRequests/friendRequests.js";
import Messages from "./components/Messages/Messages.js";
import Profile from "./components/Profile/Profile.js";
import Comments from "./components/comments/comments.js";
import Chat from './chatComponents/Chat/Chat.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './app.css';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/feed" exact component={Feed} />
          <Route path="/postUpload" exact component={Postupload} />
          <Route path="/notifications" exact component={Notifications} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/friendrequests" exact component={FriendRequests} />
          <Route path="/messages" exact component={Messages} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/profileUpload" exact component={Profileupload} />
          <Route path="/profile/:postCreatorName" exact component={Profile} />
          <Route path="/comments/:postid/:userid" exact component={Comments} />
          <Route path="/chat/:chatroom/:currentuser" exact component={Chat}/>
        </Switch>
      </Router>
      <ToastContainer/>
    </>
  );
};

export default App;
