import React ,{lazy , Suspense}from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './app.css';
import Home from './components/home/home.js';
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
          <Route path="/" exact >
            <Home/>
          </Route>
          <Route path="/login" exact >
            <Suspense fallback={<h1>...loading</h1>}>
              <Login/>
            </Suspense>
          </Route>
          <Route path="/signup" exact>
            <Suspense fallback={<h1>...loading</h1>}>
            <Signup/>
            </Suspense>
          </Route>
          <Route path="/feed" exact>
            <Suspense fallback={<h1>...loading</h1>}>
              <Feed/>
            </Suspense>
          </Route>
          <Route path="/postUpload" exact>
            <Suspense fallback={<h1>...loading</h1>}>
                <Postupload/>
            </Suspense>
          </Route>
          <Route path="/notifications" exact >
            <Suspense fallback={<h1>...loading</h1>}>
                <Notifications/>
            </Suspense>
          </Route>
          <Route path="/friends" exact>
            <Suspense fallback={<h1>...loading</h1>}>
                <Friends/>
            </Suspense>
          </Route>
          <Route path="/friendrequests" exact >
            <Suspense fallback={<h1>...loading</h1>}>
              <FriendRequests/>
            </Suspense>
          </Route>
          <Route path="/messages" exact >
            <Suspense fallback={<h1>...loading</h1>}>
              <Messages/>
            </Suspense>
          </Route>
          <Route path="/profile" exact >
            <Suspense fallback={<h1>...loading</h1>}>
                <Profile/>
            </Suspense>
          </Route>
          <Route path="/profileUpload" exact >
            <Suspense fallback={<h1>...loading</h1>}>
                <Profileupload/>
            </Suspense>
          </Route>
          <Route path="/profile/:postCreatorName" exact >
            <Suspense fallback={<h1>...loading</h1>}>
              <Profile/>
            </Suspense>
          </Route>
          <Route path="/comments/:postid/:userid" exact >
            <Suspense fallback={<h1>...loading</h1>}>
                <Comments/>
            </Suspense>
          </Route>
          <Route path="/chat/:chatroom/:currentuser" exact >
            <Suspense fallback={<h1>...loading</h1>}>
                <Chat/>
            </Suspense>
          </Route>
        </Switch>
      </Router>
      <ToastContainer/>
    </>
  );
};

export default App;
