(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{100:function(e,t,r){"use strict";r(0),r(103);var n=r(14),a=r(1);t.a=function(e){return e.linkTo?Object(a.jsx)(n.b,{to:e.linkTo,children:Object(a.jsx)("button",{className:e.classname,children:e.text})}):Object(a.jsx)("button",{className:e.classname,type:e.type,onClick:e.onclickHandler,children:e.text})}},102:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},103:function(e,t,r){},104:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(102);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},108:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r(112);var a=r(111);function s(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},125:function(e,t,r){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI9SURBVEiJrdaxaxRREAbw3wsXtRch2Jx2FiGGpFACCaKgqZJC/4q02ggJBhurlPYpLBS0kRAVCwNaGEiMVdAycIUY0mkIF+FZ3Kyum90zggPD7s18882+N+/NXMo5a5KU0hAuYQzj8YQP2Iznes75SyNJzvmIooUFdJHxFau4H7oathyYBbRquWrIL2IrAhfRrgsMbDsw3Yi52DcB5gL8EaNNxDWJRiOmi7naBPHlXTzEYIUgYRJ3QieRKpjBiO2WV1Le8634iip5G29iv7+H5rC1a5JshbbKCRaqmcN+Ctv4jCkMhE6FbRunarari4XihA4VBa3Z23l8w/ka3/nwzdf4isIPwWws+chpwRoe9ynuY6w1nK6M2QG9y7Obc95xVNro1NgL6QTmDwmuXYwN6N3QjQaCdQz3STAcmDrZwHixgqYEL3E9pXSt6gjb9cA0JRhrxY/DOkTOeTmldBUrKaUHeBWuG7iLRznn5YYEvzhX8KRPIafxQ69oZf2B6T5xT7DS0uuKt2q2oI0l3MQ7vMencF/AZbxIKT3D7ZpDMoyn9I7pIU6Xss9gX6+AV/p85ZXA7GOmZD8dnLP8vmhL4TyLvdi6k8dodCcDu4ezYVtSXLRSqzjAObzGW5z4h256ImJeB8eBolVUmt1OFHDiuOSlJBMRu6Pa7Crt+pOG6fSXBK2IPdquS6Bi4Gxi5B/IRyKmeeBUVlKMzHs404f4TGCONzIryy0P/Q6e67XhxXjvOMbQT0FYK//jb8tPzIIZExSXogkAAAAASUVORK5CYII="},260:function(e,t,r){},273:function(e,t,r){"use strict";r.r(t);var n=r(97),a=r.n(n),s=r(98),c=r(104),o=r(108),i=r(101),u=r(0),l=r(2),p=r(50),d=r(100),f=(r(260),r(125)),m=r(105),b=r.n(m),j=r(29),O=r(99),h=r(1),x=Object(u.lazy)((function(){return r.e(1).then(r.bind(null,127))})),v=new O.a,g=Object(u.lazy)((function(){return r.e(24).then(r.bind(null,263))})),A=Object(u.lazy)((function(){return r.e(21).then(r.bind(null,265))})),y=function(e,t){!0===e?j.b.success(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"success"}):!1===e?j.b.error(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"fail"}):Object(j.b)(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,toastId:"no"})};t.default=function(){var e=Object(l.g)().postCreatorName;console.log(e);var t=Object(l.f)(),r=Object(u.useContext)(p.socketContext),n=Object(u.useState)({}),m=Object(i.a)(n,2),j=m[0],O=m[1],S=Object(u.useState)({Username:"",Email:"",Profileimage:"",Posts:[],Friends:[]}),P=Object(i.a)(S,2),w=P[0],E=P[1];Object(u.useEffect)((function(){return r.emit("join",{roomname:"profileroom"}),function(){r.off()}}),[]),r.on("friendsUpdate",(function(e){var t=e.UpdatedUser,r=e.message;E({Username:t.username,Email:t.email,Profileimage:t.profileimage,Posts:Object(o.a)(w.Posts),Friends:Object(o.a)(t.friends)}),y(!0,r)})),r.on("friendsUpdateError",(function(e){var t=e.message;y(!1,t)})),r.on("postupdate",(function(e){var t=e.updatedPosts,r=e.message;E(Object(c.a)(Object(c.a)({},w),{},{Posts:Object(o.a)(t)})),y(!0,r)})),r.on("postupdateError",(function(e){var t=e.message;y(!1,t)})),r.on("postdelete",(function(e){var t=e.updatedPosts,r=e.message;E(Object(c.a)(Object(c.a)({},w),{},{Posts:Object(o.a)(t)})),y(!0,r)})),r.on("postdeleteError",(function(e){var t=e.message;y(!1,t)})),Object(u.useEffect)((function(){function e(){return(e=Object(s.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.fetchPrivateData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getuserdata"),sessionStorage.getItem("authToken"));case 2:t=e.sent,console.log(t),O(t.data.user);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(u.useEffect)((function(){function t(){return(t=Object(s.a)(a.a.mark((function t(){var r,n,s,c,i,u;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=6;break}return t.next=3,v.fetchData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getuserdata/").concat(e));case 3:r=t.sent,t.next=9;break;case 6:return t.next=8,v.fetchPrivateData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getuserdata"),sessionStorage.getItem("authToken"));case 8:r=t.sent;case 9:console.log(r.data),console.log(r.data.posts),n=r.data.user,s=n.username,c=n.email,i=n.profileimage,u=n.friends,E({Username:s,Email:c,Profileimage:i,Friends:Object(o.a)(u),Posts:Object(o.a)(r.data.posts)});case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[]);var T=function(){var e=Object(s.a)(a.a.mark((function e(){var r,n,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(sessionStorage.getItem("authToken"))}},n={status:"offline"},e.next=4,b.a.post("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).AUTH_URL,"/userLogout"),n,r);case 4:s=e.sent,console.log(s),s.data.success?(sessionStorage.removeItem("authToken"),y(s.data.success,s.data.message),setTimeout((function(){t.push("/login")}),3e3)):y(s.data.success,s.data.message);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(u.Suspense,{fallback:Object(h.jsx)("h1",{children:"loading..."}),children:Object(h.jsx)(x,{})}),Object(h.jsxs)("div",{className:"profile h-full w-full flex flex-col items-center mt-4",children:[Object(h.jsx)("div",{className:"profilePic h-1/4 flex flex-col items-center justify-center 4 h-96",children:w.Profileimage?Object(h.jsx)("img",{src:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).OUTPUT_URL,"/").concat(w.Profileimage),className:"m-2 object-contained",alt:"image"}):Object(h.jsx)("img",{src:f.a,className:"h-10 w-10",alt:"icon"})}),j.username===w.Username?Object(h.jsx)(d.a,{linkTo:"/profileupload",text:"Change Profile Pic",classname:"profilechange mt-4"}):null,Object(h.jsx)("div",{className:"username m-4 w-4/5 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl",children:Object(h.jsxs)("span",{className:"md:text-xl",children:["Username:",Object(h.jsx)("h1",{className:"md:text-2xl font-bold text-left",children:w.Username})]})}),Object(h.jsx)("div",{className:"email m-4 w-4/5 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl",children:Object(h.jsxs)("span",{className:"md:text-xl",children:["Email:",Object(h.jsx)("h1",{className:"md:text-2xl font-bold text-left",children:w.Email})]})}),j.username===w.Username?Object(h.jsx)("h1",{className:"text-center text-white font-bold md:text-2xl m-8",children:"Your Friends"}):Object(h.jsxs)("h1",{className:"text-center text-white font-bold md:text-2xl m-8",children:[w.Username,"'s Friends"]}),0!==w.Friends.length?Object(h.jsx)("div",{className:"friendsContainer h-1/4 flex flex-wrap w-full items-center justify-center overflow-y-scroll",children:w.Friends.map((function(t){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(u.Suspense,{fallback:Object(h.jsx)("h1",{className:"text-white",children:"loading..."}),children:Object(h.jsx)(g,{id:t._id,name:t.username,img:t.profileimage,currentUser:j,postCreatorName:e,user:w},t._id)})})}))}):Object(h.jsx)("div",{className:"friends w-4/5 md:text-xl font-bold mt-4 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl",children:"Friends : no friends yet"}),j.username===w.Username?Object(h.jsx)("h1",{className:"text-center text-white font-bold md:text-2xl m-8",children:"Your Posts"}):Object(h.jsxs)("h1",{className:"text-center text-white font-bold md:text-2xl m-8",children:[w.Username,"'s Posts"]}),Object(h.jsx)("div",{className:"postsContainer h-3/5 overflow-y-scroll flex flex-col flex-wrap items-center justify-center",children:0!==w.Posts.length?w.Posts.map((function(e){return Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(u.Suspense,{fallback:Object(h.jsx)("h1",{className:"text-white",children:"loading..."}),children:Object(h.jsx)(A,{postid:e._id,imgsrc:e.imgsrc,description:e.description,CreatorName:e.creatorName,currentUser:j.username,user:w.Username},e._id)})})})):Object(h.jsx)("div",{className:"friends md:text-xl font-bold mt-4 w-4/5 flex items-center justify-start p-4 h-20 bg-gray-300 rounded-2xl",children:"posts : no posts yet"})}),Object(h.jsx)(d.a,{text:"Logout",classname:j.username===w.Username?"logout rounded-md p-2 m-2 text-white":"hidden",onclickHandler:T})]})]})}},99:function(e,t,r){"use strict";var n=r(97),a=r.n(n),s=r(98),c=r(109),o=r(110),i=r(105),u=r.n(i),l=function(){function e(){Object(c.a)(this,e),this.userGoogleLogin=function(){var e=Object(s.a)(a.a.mark((function e(t,r){var n,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"content-type":"application/json"}},e.next=4,u.a.post(t,r,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,r){return e.apply(this,arguments)}}(),this.userFacebookLogin=function(){var e=Object(s.a)(a.a.mark((function e(t,r){var n,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={headers:{"content-type":"application/json"}},e.next=4,u.a.post(t,r,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,r){return e.apply(this,arguments)}}()}return Object(o.a)(e,[{key:"sendformData",value:function(){var e=Object(s.a)(a.a.mark((function e(t,r){var n,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{"content-type":"application/json"}},e.prev=1,e.next=4,u.a.post(t,r,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r){return e.apply(this,arguments)}}()},{key:"getuser",value:function(){var e=Object(s.a)(a.a.mark((function e(t,r,n){var s,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(n)}},e.prev=1,e.next=4,u.a.post(t,r,s);case 4:return c=e.sent,e.abrupt("return",c);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r,n){return e.apply(this,arguments)}}()},{key:"fetchData",value:function(){var e=Object(s.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.get(t);case 3:return r=e.sent,e.abrupt("return",r);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"fetchPrivateData",value:function(){var e=Object(s.a)(a.a.mark((function e(t,r){var n,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{"content-type":"application/json",Authorization:"Bearer ".concat(r)}},e.prev=1,e.next=4,u.a.get(t,n);case 4:return s=e.sent,e.abrupt("return",s);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r){return e.apply(this,arguments)}}()},{key:"fileUpload",value:function(){var e=Object(s.a)(a.a.mark((function e(t,r,n){var s,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s={headers:{"content-type":"multipart/form-data",Authorization:"Bearer ".concat(n)}},e.prev=1,e.next=4,u.a.post(t,r,s);case 4:return c=e.sent,e.abrupt("return",c);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,r,n){return e.apply(this,arguments)}}()}]),e}();t.a=l}}]);
//# sourceMappingURL=9.fd007094.chunk.js.map