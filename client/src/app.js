import React ,{lazy}from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './app.css';
const Home = lazy(()=>import('./components/home/home.js'));
const Login =lazy(()=>import("./components/login/login.js")) ;
const Signup = lazy(()=>import("./components/signup/signup.js")) ;
const Feed = lazy(()=>import("./components/feed/feed.js")) ;
const Postupload = lazy(()=>import("./components/postupload/postupload.js")) ;
const Profileupload = lazy(()=>import("./components/profileupload/profileupload.js")) 
const Notifications = lazy(()=>import("./components/Notifications/notifications.js")) ;
const Friends = lazy(()=>import("./components/Friends/Friends.js")) ;
const FriendRequests = lazy(()=>import("./components/friendRequests/friendRequests.js"));
const Messages = lazy(()=>import("./components/Messages/Messages.js")) ;
const Profile  = lazy(()=>import("./components/Profile/Profile.js")) ;
const Comments  = lazy(()=>import("./components/comments/comments.js")) ;
const Chat  = lazy(()=>import('./chatComponents/Chat/Chat.js'));

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
