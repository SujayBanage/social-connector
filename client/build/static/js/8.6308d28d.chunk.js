(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[8,22],{100:function(e,t,r){"use strict";r(0),r(103);var n=r(14),a=r(1);t.a=function(e){return e.linkTo?Object(a.jsx)(n.b,{to:e.linkTo,children:Object(a.jsx)("button",{className:e.classname,children:e.text})}):Object(a.jsx)("button",{className:e.classname,type:e.type,onClick:e.onclickHandler,children:e.text})}},102:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},103:function(e,t,r){},104:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(102);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},108:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(112);var a=r(111);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},126:function(e,t,r){},155:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(50),c=r(14),s=r(100),o=(r(126),r(1));t.default=function(e){var t=Object(n.useContext)(a.socketContext);return Object(o.jsxs)("div",{className:"chatFriend flex w-1/5 items-center justify-around md:justify-center m-2 p-2 md:p-4 text-lg rounded-lg",children:[Object(o.jsxs)(c.b,{to:"/profile/".concat(e.username),className:"flex items-center justify-center",children:[e.profileimage?Object(o.jsx)("img",{src:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).OUTPUT_URL,"/").concat(e.profileimage),className:"h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-white mr-4 ",alt:"image"}):null,Object(o.jsx)("span",{className:"mr-2 lg:flex lg:text-xl",children:e.username})]}),e.username&&"groupChat"!==e.type?Object(o.jsx)(s.a,{text:"chat",classname:"chatButton text-white text-lg m-2 p-2 rounded-md ",onclickHandler:e.chatHandler}):null,Object(o.jsx)(s.a,{text:"Add",classname:"groupChat"===e.type?"addbutton text-white text-sm md:text-md md:m-2 p-1 md:p-2 rounded-md ":"hidden",onclickHandler:function(){t.emit("addUserToChatInvite",{user:e.id,chatroom:e.chatroom,currentuser:e.currentuser})}})]})}},258:function(e,t,r){},259:function(e,t,r){},281:function(e,t,r){"use strict";r.r(t);var n=r(101),a=r(104),c=r(97),s=r.n(c),o=r(98),u=r(108),i=r(0),l=r(100),p=r(2),d=r(50),h=(r(258),r(155)),f=r(14),m=(r(259),r(1)),j=function(e){var t=Object(i.useContext)(d.socketContext),r=function(){var r=e.chatid,n=e.type,a=e.currentUser;t.emit("deleteChat",{chatid:r,type:n,user:a})};return"privateChat"===e.type?Object(m.jsxs)("div",{className:"chat flex items-center p-2 justify-between  md:justify-around m-2 rounded-lg  text-white w-4/5",children:[Object(m.jsxs)(f.b,{to:"/chat/".concat(e.roomname,"/").concat(e.currentUser.username),className:"flex items-center justify-start",children:[Object(m.jsx)("img",{src:e.user1.username===e.currentUser.username&&(e.user1.profileimage||e.currentUser.username)?"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).OUTPUT_URL,"/").concat(e.user2.profileimage):"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).OUTPUT_URL,"/").concat(e.user1.profileimage),className:"h-12 w-12 rounded-full mr-4",alt:"image"}),Object(m.jsx)("span",{children:e.user1.username===e.currentUser.username?e.user2.username:e.user1.username})]}),Object(m.jsx)(l.a,{text:"\u274c",classname:"bg-red-400 p-2 rounded-md",onclickHandler:r})]}):Object(m.jsxs)("div",{className:"groupChat flex items-center justify-between md:justify-around p-2 md:p-4 m-2 md:m-4 text-white md:text-xl font-bold rounded-lg",children:[Object(m.jsx)(f.b,{to:"/chat/".concat(e.grpChat.roomname,"/").concat(e.currentUser.username),children:Object(m.jsx)("span",{children:e.grpChat.roomname})}),Object(m.jsx)(l.a,{text:"\u274c",classname:"bg-red-400 p-2 rounded-md",onclickHandler:r})]})},b=r(99),O=r(29),x=Object(i.lazy)((function(){return r.e(1).then(r.bind(null,127))})),v=new b.a,y="setCurrentUser",g="setFriend",C="setText",S="setSearch",w="findFriend",_="setChats",T="setGroupChat",E="setGroupChats",U=function(e,t){!0===e?O.b.success(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"success"}):!1===e?O.b.error(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"fail"}):Object(O.b)(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"noid"})};t.default=function(){var e=Object(i.useContext)(d.socketContext);Object(i.useEffect)((function(){return e.emit("join",{roomname:"messagesRoom"}),function(){e.off()}}),[]),e.on("chatRoomCreated",(function(e){var r=e.roomname,n=e.currentuser;console.log(r),t.push("/chat/".concat(r,"/").concat(n.username))})),e.on("groupChatCreated",(function(e){var r=e.groupChat,n=e.currentuser;console.log(r),console.log(n),t.push("/chat/".concat(r.roomname,"/").concat(n.username))})),e.on("groupChatFailed",(function(e){var t=e.message;U(!1,t),O({type:T,payload:""})})),e.on("deletedPrivateChat",(function(e){var t=e.privateChats;O({type:_,payload:Object(u.a)(t)}),U(!0,"chat deleted successfully!!!")})),e.on("deletedGroupChat",(function(e){var t=e.groupChats;O({type:E,payload:Object(u.a)(t)}),U(!0,"chat deleted successfully!!!")})),Object(i.useEffect)((function(){function e(){return(e=Object(o.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.fetchPrivateData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getchats"),sessionStorage.getItem("authToken"));case 3:t=e.sent,console.log(t),!0===t.data.success&&O({type:_,payload:Object(u.a)(t.data.chats)}),O({type:y,payload:t.data.user}),console.log(t.data.user),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(i.useEffect)((function(){function e(){return(e=Object(o.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.fetchPrivateData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getGroupChats"),sessionStorage.getItem("authToken"));case 3:t=e.sent,console.log(t),!0===t.data.success&&O({type:E,payload:t.data.groupChats}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var t=Object(p.f)(),r=function(){var e=Object(o.a)(s.a.mark((function e(t){var r,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={username:t},e.prev=1,e.next=4,v.getuser("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getuser"),r,sessionStorage.getItem("authToken"));case 4:n=e.sent,console.log(n.data.user),O({type:g,payload:n.data.user}),O({type:y,payload:n.data.currentUser}),O({type:C,payload:""}),O({type:S,payload:!b.search}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0.message);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}(),c=Object(i.useReducer)((function(e,t){return"setCurrentUser"===t.type?Object(a.a)(Object(a.a)({},e),{},{currentUser:Object(a.a)({},t.payload)}):"setSearch"===t.type?Object(a.a)(Object(a.a)({},e),{},{search:t.payload}):"setText"===t.type?Object(a.a)(Object(a.a)({},e),{},{text:t.payload}):"findFriend"===t.type?(r(t.payload),e):"setFriend"===t.type?Object(a.a)(Object(a.a)({},e),{},{friend:Object(a.a)({},t.payload)}):"setChats"===t.type?Object(a.a)(Object(a.a)({},e),{},{chats:Object(u.a)(t.payload)}):"setGroupChat"===t.type?Object(a.a)(Object(a.a)({},e),{},{groupchat:t.payload}):"setGroupChats"===t.type?(console.log(e.groupChats),Object(a.a)(Object(a.a)({},e),{},{groupChats:Object(u.a)(t.payload)})):e}),{search:!1,friend:{},currentUser:{},text:"",chats:[],groupchat:"",groupChats:[]}),f=Object(n.a)(c,2),b=f[0],O=f[1];return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(i.Suspense,{fallback:Object(m.jsx)("h1",{children:"loading..."}),children:Object(m.jsx)(x,{})}),Object(m.jsxs)("div",{className:"messagesContainer flex h-full md:h-full w-screen flex-col md:flex-row items-center justify-center",children:[Object(m.jsxs)("div",{className:"searchUserContainer flex flex-col items-center justify-center h-1/2 md:h-screen w-screen md:w-1/2",children:[Object(m.jsx)(l.a,{text:"search user",classname:"searchUser text-white text-sm rounded-md p-2 mt-4 ",onclickHandler:function(){return O({type:S,payload:!b.search})}}),Object(m.jsxs)("div",{className:b.search?"searchDiv flex items-center justify-center w-full":"hidden",children:[Object(m.jsx)("input",{className:"h-10 rounded-md ",type:"text",placeholder:"...search friend",value:b.text,onChange:function(e){return O({type:C,payload:e.target.value})}}),Object(m.jsx)(l.a,{text:"search",classname:"search m-2 bg-blue-500 text-white text-lg rounded-md p-2",onclickHandler:function(){return O({type:w,payload:b.text})}})]}),Object(m.jsx)("div",{className:"friends flex flex-col items-center justify-center",children:b.friend.username?Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(i.Suspense,{children:Object(m.jsx)(h.default,{username:b.friend.username,profileimage:b.friend.profileimage,chatHandler:function(){e.emit("createChatRoom",{currentuser:b.currentUser,friend:b.friend})}})})}):null}),Object(m.jsx)("h1",{className:"text-center font-bold text-white mt-10 text-xl",children:"Previous Chats"}),Object(m.jsx)("div",{className:"previousChats flex flex-col w-full  md:h-1/2 items-center justify-center overflow-y-scroll",children:0!==b.chats.length?b.chats.map((function(e){if(null!==e){var t=Object(n.a)(e.users,2),r=t[0],a=t[1];return console.log(b.currentUser.username),console.log(r.username),Object(m.jsx)(i.Suspense,{children:Object(m.jsx)(j,{chatid:e._id,type:e.chatType,user1:r,user2:a,currentUser:b.currentUser,roomname:e.roomname},e._id)})}})):Object(m.jsx)("h1",{className:"text-white",children:" no chat found"})})]}),Object(m.jsxs)("div",{className:"groupChats p-4 flex flex-col items-center justify-center h-1/2 md:h-screen w-screen md:w-1/2",children:[Object(m.jsxs)("div",{className:"groupChatDiv flex flex-col h-44 w-full md:w-1/2 justify-center items-center mt-8 md:m-4 p-4 bg-white rounded-lg",children:[Object(m.jsx)("input",{type:"text",placeholder:"...enter group chat name",onChange:function(e){return O({type:T,payload:e.target.value})},className:"m-2 p-2 w-full",value:b.groupchat}),Object(m.jsx)(l.a,{text:"create group chat",onclickHandler:function(){e.emit("createGroupChat",{roomname:b.groupchat,currentUser:b.currentUser})},classname:"createGroupChat p-2 m-2 w-full text-white font-bold"})]}),Object(m.jsx)("h1",{className:" text-xl text-center text-white font-bold mt-4",children:"Your Group Chat's"}),Object(m.jsx)("div",{className:"previousGroupChats mt-4 h-4/5 md:h-1/2 w-full overflow-y-scroll",children:0!==b.groupChats.length?b.groupChats.map((function(e){return Object(m.jsx)(i.Suspense,{children:Object(m.jsx)(j,{chatid:e._id,type:e.chatType,grpChat:e,currentUser:b.currentUser},e._id)})})):Object(m.jsx)("h1",{className:"text-white",children:"no chats found!!"})})]})]})]})}},99:function(e,t,r){"use strict";var n=r(97),a=r.n(n),c=r(98),s=r(109),o=r(110),u=r(105),i=r.n(u),l=function(){function e(){Object(s.a)(this,e),this.userGoogleLogin=function(){var e=Object(c.a)(a.a.mark((function e(t,r){var n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"content-type":"application/json"}},e.next=4,i.a.post(t,r,n);case 4:return c=e.sent,e.abrupt("return",c);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,r){return e.apply(this,arguments)}}(),this.userFacebookLogin=function(){var e=Object(c.a)(a.a.mark((function e(t,r){var n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"content-type":"application/json"}},e.next=4,i.a.post(t,r,n);case 4:return c=e.sent,e.abrupt("return",c);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,r){return e.apply(this,arguments)}}()}return Object(o.a)(e,[{key:"sendformData",value:function(){var e=Object(c.a)(a.a.mark((function e(t,r){var n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{"content-type":"application/json"}},e.prev=1,e.next=4,i.a.post(t,r,n);case 4:return c=e.sent,e.abrupt("return",c);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r){return e.apply(this,arguments)}}()},{key:"getuser",value:function(){var e=Object(c.a)(a.a.mark((function e(t,r,n){var c,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(n)}},e.prev=1,e.next=4,i.a.post(t,r,c);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r,n){return e.apply(this,arguments)}}()},{key:"fetchData",value:function(){var e=Object(c.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.get(t);case 3:return r=e.sent,e.abrupt("return",r);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"fetchPrivateData",value:function(){var e=Object(c.a)(a.a.mark((function e(t,r){var n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(r)}},e.prev=1,e.next=4,i.a.get(t,n);case 4:return c=e.sent,e.abrupt("return",c);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r){return e.apply(this,arguments)}}()},{key:"fileUpload",value:function(){var e=Object(c.a)(a.a.mark((function e(t,r,n){var c,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={headers:{"content-type":"multipart/form-data",Authorization:"Bearer ".concat(n)}},e.prev=1,e.next=4,i.a.post(t,r,c);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r,n){return e.apply(this,arguments)}}()}]),e}();t.a=l}}]);
//# sourceMappingURL=8.6308d28d.chunk.js.map