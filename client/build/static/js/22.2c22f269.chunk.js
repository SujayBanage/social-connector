(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[22],{126:function(e,t,c){},155:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c(50),a=c(14),s=c(100),d=(c(126),c(1));t.default=function(e){var t=Object(n.useContext)(r.socketContext);return Object(d.jsxs)("div",{className:"chatFriend flex w-1/5 items-center justify-around md:justify-center m-2 p-2 md:p-4 text-lg rounded-lg",children:[Object(d.jsxs)(a.b,{to:"/profile/".concat(e.username),className:"flex items-center justify-center",children:[e.profileimage?Object(d.jsx)("img",{src:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).OUTPUT_URL,"/").concat(e.profileimage),className:"h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-white mr-4 ",alt:"image"}):null,Object(d.jsx)("span",{className:"mr-2 lg:flex lg:text-xl",children:e.username})]}),e.username&&"groupChat"!==e.type?Object(d.jsx)(s.a,{text:"chat",classname:"chatButton text-white text-lg m-2 p-2 rounded-md ",onclickHandler:e.chatHandler}):null,Object(d.jsx)(s.a,{text:"Add",classname:"groupChat"===e.type?"addbutton text-white text-sm md:text-md md:m-2 p-1 md:p-2 rounded-md ":"hidden",onclickHandler:function(){t.emit("addUserToChatInvite",{user:e.id,chatroom:e.chatroom,currentuser:e.currentuser})}})]})}}}]);
//# sourceMappingURL=22.2c22f269.chunk.js.map