(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[17],{100:function(e,t,a){"use strict";a(0),a(103);var n=a(14),r=a(1);t.a=function(e){return e.linkTo?Object(r.jsx)(n.b,{to:e.linkTo,children:Object(r.jsx)("button",{className:e.classname,children:e.text})}):Object(r.jsx)("button",{className:e.classname,type:e.type,onClick:e.onclickHandler,children:e.text})}},103:function(e,t,a){},118:function(e,t,a){"use strict";var n=a(97),r=a.n(n),s=a(98),o=(a(0),a(100)),c=a(2),i=a(14),u=a(128),l=a(129),p=a.n(l),d=a(99),b=a(29),m=(a(51),a(1)),h=new d.a;t.a=function(e){var t=Object(c.f)();console.log("this is form component");var a=function(e,t){!0===e?b.b.success(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):!1===e?b.b.error(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):Object(b.b)(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})},n=function(){var e=Object(s.a)(r.a.mark((function e(n){var s,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),s={tokenId:n.tokenId},e.next=4,h.userGoogleLogin("/auth/userGoogleLogin",s);case 4:o=e.sent,console.log(o),o.data.success?(sessionStorage.setItem("authToken",o.data.authToken),localStorage.setItem("refreshToken",o.data.refreshToken),a(o.data.success,o.data.message),setTimeout((function(){t.push("/feed")}),3e3)):a(o.data.success,o.data.message);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(s.a)(r.a.mark((function e(n){var s,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(n),s={accessToken:n.accessToken,userID:n.userID},e.next=4,h.userFacebookLogin("/auth/userFacebookLogin",s);case 4:(o=e.sent).data.success?(sessionStorage.setItem("authToken",o.data.authToken),localStorage.setItem("refreshToken",o.data.refreshToken),a(o.data.success,o.data.message),setTimeout((function(){t.push("/feed")}),3e3)):a(o.data.success,o.data.message);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsx)(m.Fragment,{children:"signup"===e.type?Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("div",{class:"w-full max-w-xs",children:Object(m.jsxs)("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",onSubmit:e.onSubmitHandler,children:[Object(m.jsxs)("div",{className:"mb-4",children:[Object(m.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",for:"username",children:"Username"}),Object(m.jsx)("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"username",name:"username",type:"text",placeholder:"Username",value:e.state.username,onChange:e.onChangeHandler})]}),Object(m.jsxs)("div",{className:"mb-4",children:[Object(m.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",for:"email",children:"Email"}),Object(m.jsx)("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"email",name:"email",type:"text",placeholder:"email",value:e.state.email,onChange:e.onChangeHandler})]}),Object(m.jsxs)("div",{className:"mb-6",children:[Object(m.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",for:"password",children:"Password"}),Object(m.jsx)("input",{className:"shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"password",name:"password",type:"password",placeholder:"******************",value:e.state.password,onChange:e.onChangeHandler})]}),Object(m.jsx)("div",{className:"flex items-center justify-center",children:Object(m.jsx)(o.a,{classname:e.type,type:"submit",text:e.type,onClick:e.onSubmitHandler})}),Object(m.jsx)("div",{className:"loginLink flex items-center justify-center underline",children:Object(m.jsx)(i.b,{to:"/login",children:"Already have an account ? "})})]})})}):Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{className:"w-full max-w-xs",children:[Object(m.jsxs)("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",onSubmit:e.onSubmitHandler,children:[Object(m.jsxs)("div",{className:"mb-4",children:[Object(m.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",for:"email",children:"Email"}),Object(m.jsx)("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"email",name:"email",type:"text",placeholder:"email",value:e.state.email,onChange:e.onChangeHandler})]}),Object(m.jsxs)("div",{className:"mb-6",children:[Object(m.jsx)("label",{className:"block text-gray-700 text-sm font-bold mb-2",for:"password",children:"Password"}),Object(m.jsx)("input",{className:"shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",id:"password",name:"password",type:"password",placeholder:"******************",value:e.state.password,onChange:e.onChangeHandler})]}),Object(m.jsx)("div",{className:"flex items-center justify-center",children:Object(m.jsx)(o.a,{classname:e.type,type:"submit",text:e.type,onClick:e.onSubmitHandler})}),Object(m.jsx)("div",{className:"signupLink flex items-center justify-center underline",children:Object(m.jsx)(i.b,{to:"/signup",children:"Don't have an account?"})})]}),Object(m.jsxs)("div",{className:"googleAndOtherLogin flex items-center justify-around",children:[Object(m.jsx)(u.GoogleLogin,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).GOOGLE_CLIENT_ID,buttonText:"Login",onSuccess:n,onFailure:function(e){console.log(e)},cookiePolicy:"single_host_origin"}),Object(m.jsx)(p.a,{appId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).FACEBOOK_ID,autoLoad:!1,fields:"name,email,picture",icon:"fa-facebook",size:"small",textButton:"Login",callback:l})]})]})})})}},271:function(e,t,a){"use strict";a.r(t);var n=a(97),r=a.n(n),s=a(98),o=a(102),c=a(104),i=a(101),u=a(0),l=a(2),p=a(118),d=a(99),b=a(138),m=a.n(b),h=a(29),f=(a(51),a(1)),g=function(e,t){!0===e?h.b.success(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):!1===e?h.b.error(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):Object(h.b)(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})};t.default=function(){var e=Object(u.useState)({username:"",email:"",password:""}),t=Object(i.a)(e,2),a=t[0],n=t[1],b=Object(l.f)(),h=function(){var e=Object(s.a)(r.a.mark((function e(t){var s,o,c,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a.username&&a.password&&a.email){e.next=4;break}return g(!1,"Please enter details again"),e.abrupt("return");case 4:if(m.a.isEmail(a.email)){e.next=8;break}return g(!1,"Please enter email again"),e.abrupt("return");case 8:return s={username:a.username,email:a.email,password:a.password},o=new d.a,e.next=12,o.sendformData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).AUTH_URL,"/userRegister"),s);case 12:c=e.sent,i=c.data,console.log(i),!0===i.success&&(localStorage.setItem("refreshToken",i.refreshToken),sessionStorage.setItem("authToken",i.authToken),n({username:"",email:"",password:""}),g(i.success,i.message),setTimeout((function(){b.push("/feed")}),3e3));case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(f.jsx)(f.Fragment,{children:Object(f.jsx)("div",{className:"signupComponenet h-screen",children:Object(f.jsx)("div",{className:"flex items-center justify-center mt-20",children:Object(f.jsx)(p.a,{type:"signup",state:a,onChangeHandler:function(e){var t=e.target.name,r=e.target.value;n(Object(c.a)(Object(c.a)({},a),{},Object(o.a)({},t,r)))},onSubmitHandler:h})})})})}},99:function(e,t,a){"use strict";var n=a(97),r=a.n(n),s=a(98),o=a(109),c=a(110),i=a(105),u=a.n(i),l=function(){function e(){Object(o.a)(this,e),this.userGoogleLogin=function(){var e=Object(s.a)(r.a.mark((function e(t,a){var n,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"content-type":"application/json"}},e.next=4,u.a.post(t,a,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,a){return e.apply(this,arguments)}}(),this.userFacebookLogin=function(){var e=Object(s.a)(r.a.mark((function e(t,a){var n,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"content-type":"application/json"}},e.next=4,u.a.post(t,a,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,a){return e.apply(this,arguments)}}()}return Object(c.a)(e,[{key:"sendformData",value:function(){var e=Object(s.a)(r.a.mark((function e(t,a){var n,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{"content-type":"application/json"}},e.prev=1,e.next=4,u.a.post(t,a,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getuser",value:function(){var e=Object(s.a)(r.a.mark((function e(t,a,n){var s,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(n)}},e.prev=1,e.next=4,u.a.post(t,a,s);case 4:return o=e.sent,e.abrupt("return",o);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"fetchData",value:function(){var e=Object(s.a)(r.a.mark((function e(t){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.get(t);case 3:return a=e.sent,e.abrupt("return",a);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"fetchPrivateData",value:function(){var e=Object(s.a)(r.a.mark((function e(t,a){var n,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(a)}},e.prev=1,e.next=4,u.a.get(t,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a){return e.apply(this,arguments)}}()},{key:"fileUpload",value:function(){var e=Object(s.a)(r.a.mark((function e(t,a,n){var s,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={headers:{"content-type":"multipart/form-data",Authorization:"Bearer ".concat(n)}},e.prev=1,e.next=4,u.a.post(t,a,s);case 4:return o=e.sent,e.abrupt("return",o);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a,n){return e.apply(this,arguments)}}()}]),e}();t.a=l}}]);
//# sourceMappingURL=17.2939de13.chunk.js.map