(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{50:function(e,t,c){"use strict";c.r(t),c.d(t,"socketContext",(function(){return T}));var n=c(0),l=c(20),s=c.n(l),j=c(47),i=c.n(j),a=c(14),r=c(2),b=c(29),h=(c(51),c(59),c(60),c.p+"static/media/socialmedia2.0b7dcde3.svg"),d=c(1),o=function(){return Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{className:"homecomponent h-screen w-screen flex flex-col items-center justify-center",children:[Object(d.jsx)("h1",{className:"text-4xl lg:text-7xl text-white font-bold",children:"Social-Connector"}),Object(d.jsx)("img",{src:h,className:"mt-10 h-48 lg:h-80",alt:"svg"}),Object(d.jsxs)("div",{className:"buttons flex items-center justify-between",children:[Object(d.jsx)(a.b,{to:"/signup",children:Object(d.jsx)("button",{className:"signup m-4",children:"Signup"})}),Object(d.jsx)(a.b,{to:"/login",children:Object(d.jsx)("button",{className:"login m-4",children:"Login"})})]})]})})},x=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(2),c.e(16)]).then(c.bind(null,270))})),O=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(2),c.e(17)]).then(c.bind(null,271))})),u=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(7)]).then(c.bind(null,277))})),p=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(18)]).then(c.bind(null,154))})),f=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(19)]).then(c.bind(null,272))})),m=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(11)]).then(c.bind(null,278))})),g=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(12)]).then(c.bind(null,279))})),S=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(14)]).then(c.bind(null,280))})),k=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(8)]).then(c.bind(null,281))})),P=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(9)]).then(c.bind(null,273))})),y=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(15)]).then(c.bind(null,274))})),v=Object(n.lazy)((function(){return Promise.all([c.e(0),c.e(10)]).then(c.bind(null,282))}));i.a.config({path:"config.env"});var z=function(){return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(a.a,{children:Object(d.jsxs)(r.c,{children:[Object(d.jsx)(r.a,{path:"/",exact:!0,children:Object(d.jsx)(o,{})}),Object(d.jsx)(r.a,{path:"/login",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(x,{})})}),Object(d.jsx)(r.a,{path:"/signup",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(O,{})})}),Object(d.jsx)(r.a,{path:"/feed",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(u,{})})}),Object(d.jsx)(r.a,{path:"/postUpload",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(p,{})})}),Object(d.jsx)(r.a,{path:"/notifications",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(m,{})})}),Object(d.jsx)(r.a,{path:"/friends",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(g,{})})}),Object(d.jsx)(r.a,{path:"/friendrequests",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(S,{})})}),Object(d.jsx)(r.a,{path:"/messages",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(k,{})})}),Object(d.jsx)(r.a,{path:"/profile",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(P,{})})}),Object(d.jsx)(r.a,{path:"/profileUpload",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(f,{})})}),Object(d.jsx)(r.a,{path:"/profile/:postCreatorName",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(P,{})})}),Object(d.jsx)(r.a,{path:"/comments/:postid/:userid",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(y,{})})}),Object(d.jsx)(r.a,{path:"/chat/:chatroom/:currentuser",exact:!0,children:Object(d.jsx)(n.Suspense,{fallback:Object(d.jsx)("h1",{children:"...loading"}),children:Object(d.jsx)(v,{})})})]})}),Object(d.jsx)(b.a,{})]})},_=c(49),E=c.n(_),N=(c(95),Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).BASE_URL),C=E()(N,{transports:["websocket","polling","flashsocket"]}),T=Object(n.createContext)();s.a.render(Object(d.jsx)(T.Provider,{value:C,children:Object(d.jsx)(z,{})}),document.getElementById("root"))},59:function(e,t,c){},60:function(e,t,c){},95:function(e,t,c){}},[[50,5,6]]]);
//# sourceMappingURL=main.4c85c32b.chunk.js.map