(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[20,1],{104:function(A,e,t){"use strict";t.d(e,"a",(function(){return n}));var s=t(102);function i(A,e){var t=Object.keys(A);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(A);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(A,e).enumerable}))),t.push.apply(t,s)}return t}function n(A){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){Object(s.a)(A,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(A,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(A,e,Object.getOwnPropertyDescriptor(t,e))}))}return A}},116:function(A,e,t){},127:function(A,e,t){"use strict";t.r(e);var s=t(104),i=t(97),n=t.n(i),r=t(98),c=t(101),a=t(0),o=t(2),g=t(14),l=(t(116),t(29)),u=t(99),m=t(1),j=new u.a;e.default=function(){var A=Object(o.f)(),e=Object(a.useState)(!1),t=Object(c.a)(e,2),i=t[0],u=t[1],O=Object(a.useState)({feed:!1,bell:!1,friends:!1,profile:!1,message:!1,people:!1}),b=Object(c.a)(O,2),f=b[0],B=b[1],d=Object(a.useState)({username:"",profileimage:""}),h=Object(c.a)(d,2),U=h[0],C=h[1];return Object(a.useEffect)((function(){var e,t;sessionStorage.getItem("authToken")?Object(r.a)(n.a.mark((function A(){var e;return n.a.wrap((function(A){for(;;)switch(A.prev=A.next){case 0:return A.next=2,j.fetchPrivateData("".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).PRIVATE_URL,"/getuserdata"),sessionStorage.getItem("authToken"));case 2:e=A.sent,console.log(e),C({username:e.data.user.username,profileimage:e.data.user.profileimage});case 5:case"end":return A.stop()}}),A)})))():(t="please login first!!!!",!0===(e=!1)?l.b.success(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):!1===e?l.b.error(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):Object(l.b)(t,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),setTimeout((function(){A.push("/login")}),2e3))}),[]),Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("div",{className:"sidebar w-full flex flex-col lg:flex-row center justify-center lg:items-center lg:justify-end",children:[Object(m.jsxs)("div",{className:i?"activeNav flex flex-col justify-center items-start ":"hidden lg:flex flex-row  items-center justify-end w-full",children:[Object(m.jsxs)(g.b,{to:"/feed",className:"link  p-2 m-2 flex  items-center justify-center m-4 text-xl text-white ",onMouseOver:function(){return B(Object(s.a)(Object(s.a)({},f),{},{feed:!f.feed}))},onMouseOut:function(){return B(Object(s.a)(Object(s.a)({},f),{},{feed:!f.feed}))},children:[Object(m.jsx)("img",{src:f.feed?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACMSURBVDhPYxgFFAPG////6wDp80DMAhYhH/wBYkMmIAEyiFLDQABsDsiFPEBGAFSAEgBy4QYIk4oA5kIVCJci8IeRkfEKyEADIOc0EFMjHHVBkQLyOzUMA5vDCGJBkw41DL0DpakHQGEoCaSdgZhSF/4A4i2wSAHlFGoAcE4BmQwKUEoBtcwZ4YCBAQDjYSag1S9MpgAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACjSURBVDhPYxgFFANGINYB4vVA/AUkQAEAmWMIMtAAiOcD8UQgpgTEA3EhM5AAuew9EDMBMSXgLBAfgzCpCEBe5gFiFTCPMvAHiK/AwnA2iAPElAAHIPYFhRvIZBGQCIUAZA4LyIUgAIpyFgiTInAHSlMPgFwoAcQuQEypC38A8RZQGIIMTAaJUAjSgVgF5EINIL4MxJTGMgcQh0KYo4B8wMAAAEohFGmPttoSAAAAAElFTkSuQmCC",className:"h-6 w-6 mr-2",alt:"icon"}),"Feed"]}),Object(m.jsxs)(g.b,{to:"/notifications",className:"link  p-2 m-2   flex  items-center justify-center m-4 text-xl text-white ",onMouseOver:function(){return B(Object(s.a)(Object(s.a)({},f),{},{bell:!f.bell}))},onMouseOut:function(){return B(Object(s.a)(Object(s.a)({},f),{},{bell:!f.bell}))},children:[Object(m.jsx)("img",{src:f.bell?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAvUlEQVRIie2TPQrCQBBGZ2yieATtzGH0ADmGwevYehdFsNFaq3iHdPIs3EAI2biTHwjog+l2v/ftsivyMwAx8HATh+6bGByJiKzcJNaCXoAISF3zgjuwBaKu4Uvghp8rsOjSvCm8LLGfBNgFhBekbQQXg+Dsy9EGQS4is8A+uarOrQICwz9BqrVZln/Qir9ghAJgCuytQcABqH2q1YUnwwercvx6AhF5Wdv3tHdggGfpKrIhBBsgc7PuXTBa3mysUmE2wBOOAAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFCSURBVEiJxdY5SwRBEAXgTxePYD0SFUwEjb0SEfEHeKCB+GPM1dwLY0P9C2ogKCIIYmJiuIsgGrluYuARzKyBzLg9M4gPHgxdr+oVXd3NEI4FVGPOZ8gLRhUzmEXlLww+U75/RWuAph/r+EA95ke81lfUYBV36Bbt+0DMefTGsZWAJlOLVzD+i2ZCNJvMJv14blK8gUk8SdmuUkrSGu5xEGDwiCGM4ixAD24xFSrGNG4y6L2inEFfRi2LQfA5b5YTcg8K4V8MukQzyIq6hLklGYzI95hVMRxisITjHAbHWG4m6sUDxnIYTMS5PWmCEo6wl6N4A/s4lHJ4tnGCjgIGnTjFVlKwJmFIOTCMl6TAJt5EN7II37CRpaNFnP9Ya8GF6EegMEq4wg4GY+7iUvpz/42Qp+Idc2jHdcw2UffvzZK/AD27SdArWxOaAAAAAElFTkSuQmCC",className:"h-6 w-6 mr-2",alt:"icon"}),"Notifications"]}),Object(m.jsxs)(g.b,{to:"/friends",className:"link  p-2 m-2   flex  items-center justify-between m-4 text-xl text-white ",onMouseOver:function(){return B(Object(s.a)(Object(s.a)({},f),{},{friends:!f.friends}))},onMouseOut:function(){return B(Object(s.a)(Object(s.a)({},f),{},{friends:!f.friends}))},children:[Object(m.jsx)("img",{src:f.friends?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFpSURBVDhP7ZO7LwRRFIdn7G5CFKIjQSEeCVmFRkStk2j8F3qJR7QahYpGpRIKlUKiFYlHsY2IV0VCrIQswSaM79x7ZnJnZ2Qn0fqSL79z75x79+48vN8IgqCAA9ihUzLXqXMFncoOi+axjFWcxmEs4ReeYpO2ZoMFrxhSwRVbRkxpa4wGzTQeNYUbvLdlhHu9PpygiNu4h/J3G3ERD3EJx3EZm3WJwdeMoCFPjGI3Jq5DF07iEErvhO/7u2Q6bDiD9ZAHdYJzGPvR2EAvlrBoJuJs4gfKfa/gCPZgLycsk0nYcAyFVU2Xdc0QeYXENV1uqH3KrZqfmi45zZBvtd+MlNoN9/HNlpnZ0DTENuReyD3asqNMyLu4Y0tL2os9i7e29A40Xdy5BQ7xorUhsSEND8STHXmXmi7HmtJ7pGVE2gn/xP+GEedYRXnad3iG1/iOV/iMF5gdPqk+bFGlzuEg5rEN27XVwfN+ACzSKMtTp+soAAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAhQAAAIUB4uz/wQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHaSURBVEiJ7dXNi05xFAfwzzOZFIMkRsnLlCnGeK15UkpKWSopC4qVP2BSFhZkUGRjga2Fl4ykhNUsESkv5b1MhDSZLEzjLR5j8Tu3puve5/FYz7d+3X7nfH/n/O4533MvE2iASol9GnaiB2O4jfP4VsCdh2UYxqPg10UVH/ALT/AcNQyiaxyvFcfDNxbrFjrqBW+Pm9xH5zj7ikj0Bm1h68MP7MVSbMYrPMbksgRHMIL5Bb6uCNiL6fiOQzlON35jV1mCO7ha5sRNXMMqqSTrCzjvcSzbtOScU6QSlWEYU/ExEizO+WdgDobKAvRLjS1SVyve4XTsB+K23bFvw2V8VVxisClu1lvgOywppif2nZJsa3iJ0Ti7pyx4hlNB7McOqWHXw9YXnCpeSw29i7PB+RxvUJpkEnZLahnLrVFp+Kr4EoGX5M7PxMlIfCAffIGk4Z+4gG1YidXYjitRjhoeSIIowz5pUNdkhkV4ixfSUJVhrTRsg5hbh9ciDeY5kmIG4lB7nUMZFkoyvNGAd1BIfotU4w3/EDzDVn/3qGjdq+CipNt1TSSo4Fk8z5RwRnAJPmF/E8EznJDK2vAmDzFbakozWI6n2NgoQYf0yZ3VZIIhHJX+HRP4f/wBjhx8BumanjwAAAAASUVORK5CYII=",className:"h-6 w-6 mr-2",alt:"icon"}),"Friends"]}),Object(m.jsxs)(g.b,{to:"/friendrequests",className:"link   p-2 m-2  flex  items-center justify-between m-4 text-xl text-white ",onMouseOver:function(){return B(Object(s.a)(Object(s.a)({},f),{},{people:!f.people}))},onMouseOut:function(){return B(Object(s.a)(Object(s.a)({},f),{},{people:!f.people}))},children:[Object(m.jsx)("img",{src:f.people?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAB70lEQVRIie2VPUscURSGz6qQwviBZDeonSDRQtAiRYxpUgTRTrS0srAx1mmjgv6IgAhCoq02+ejSBXYVxM5S+3GUNRH0sfAsXGfv12y2sPCF4Qznvneee86duSPypMcg4D1QAa6AU2ALePW/Xh+wCCwBCfW6AqYMbw+wGOMNQXuBM8tDTCVAv/q/xXpNtVjYH0WkL7C+LhFZ1vvvObxuAceBCmo6Uv9wrNdUwQJORaQjuEKRaqFQaAc6RCSN8ZoJW6vrFuPQpcbbHF4v+E8kuKxxKIfXC65Ggm80htpser3gsUjwqMYkh9cL3o0E72iMWehO2CIiwK/A5/HD8H4x8j+BBWAQaAeeAwORhYgAkwHwh4z3BJiIBgTg6w7oJ4v3mcYSsAYcAJd6VYBVoJQHXiePdw5IPV1KgdmmghV6698dUI8fDsw4Jk9nfCVHpePAhCV/DhRtwJfACvDXAa4CG0Cn+tdsJl/XgBUTOAR8Bf45zFmN6rzDBsCV2uA8cB0JrKlb55ptHvdsndn2tA14LSKbItLq3XTLsyw535/NHEOA7ZyV1jSilRzYBo1Kbaq0iEijJ84bjfsNzN0T3G9vSL+1Itfn9BZ4Z8knwIsGi30oYJb4A2SmKdAM/NwDTZoONeBF7g+fMnChVxn4nG3vHasKAFZEjuIDAAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH/SURBVDhPjdQ/bE1RAMfxUm1URGmQShdEYrCUxFRDUyYWwdYBkRATBguNMEuq6dKpUZpIJMS/ThYk5jY1tDEQiURiQYSI/77fc89577z77kv9ks+759x73z1/713W1hjrQ7iIbtzAOMxRDGJ5qBVZE48XsFgU61mL6zgby8byUxxDD8odMDZ8H5tDLaYLt7Aj1JpzGvewNdSakzpTa3EYHbClLbDVPPP4Cxvdj36kUTgCcxeH03zsw2tMYi/8Q24UB/ESPsjheX4XZmP5C2q5iTtYF2rV8fplbA+1emzA3rmADSv2Gx+LYmXeo68oNuQT/hTF+gO/xeP/5Hs85nF+31pIDzyF9qLYMi6gW8eeVmXEn3zIX+OxVdzER1AejTui9pz8gU/gBq5KL37CoZVzCDNFsTmP4RbIkzatDZYzgEdIe7LyVfLPq7CATXCbnIGjmcZzvMM2fMAVuNItsyce7akb+FmoFb04h9Xwmh+RS2hI6qE374Rz+AsnkLIeJ7EbLsyrWDe+38ZN7WsbYmtTcFgbkBanEyk2KD8i3u+0OAUP4Hm/SnMI8+9r48k83uCf/P4Zr5+H5yzfhvOcN+rHZdZWVJ7UMRyHX5KH8MXfCLMSvqYr8MMTMW6rN/k+bJUXOAB76Iq6J13dzygnrInzt1SuwqlxESZQnqKYtmv/APozWlMY/8F9AAAAAElFTkSuQmCC",className:"h-6 w-6 mr-2",alt:"icon"}),"FriendRequests"]}),Object(m.jsxs)(g.b,{to:"/messages",className:"link   p-2 m-2  flex  items-center justify-between m-4 text-xl text-white ",onMouseOver:function(){return B(Object(s.a)(Object(s.a)({},f),{},{message:!f.message}))},onMouseOut:function(){return B(Object(s.a)(Object(s.a)({},f),{},{message:!f.message}))},children:[Object(m.jsx)("img",{src:f.message?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABdElEQVRIie2VPUsDQRCG3w2msEk0flWClZU/QQvB0sYfYCUi+E802AcLQdRW0U5rEbGyUqvYWPgFCiJoNHksXDHZXLzc3sYqL1wzO3PPzN3MrIAj2tehAskAJAowxoQAZ3wDgTWgkuBr/agCFL0rBiqSsp55f3hXnAIqSdk04FTqgv8VfJbA/7RTiTQI2LKzNxNxlko9MexlSROSnkIX5b3+ki4eV2maq5oi9rMJDPQBReDa7tUysArkHdedFOBtFzoEXLXoh0tgwPHPAf3AUp3furW1enJNadigv1SKSh+Yt+fnQG/i+oGHGPBdi7hJ4AYYb5fV0NVAzbW5DGNMkG3nvuQxxv8+BDQKvBfjvxsK3CBg0HZvlC6AQkfAFp7ne27L/M7xSuQYdOUr+48XgGnHPgUsAsOhgaPABvBW10wnQAk4BmrW9g5sAmMhoLPAS8zGcvUKzKXhGuBW0ohH7LOkgjHG617OSDpQ8ru1KmnfFypJXzNHYpoSg0LbAAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJdSURBVDhPhdRLS1VRFMDxm2nlI81nZaZYWGqYIgVCic2ERmlBOBCiuTiLJo36BA77HmKoUAgNeolWpJSPTMzMNK3UNJ//v3hgEydc8JPrveess/Zae58DifhIQTpuoQbVyEAqjH504TU++EUUcQnzcBZXkIwlHML3vf8PIgs5mMVn9OIPdn+MwuRJOIcKXMcUvOElnuAN3sEVnMB5nMQwTLgRVmiyTNyHVXaiByv4X9SiDV/xDF1hhUdwAy5rDFbkso4hO4bFrOM9vG8Z42FCL7qDEdjoj7iE0yiESwt57y943VXYhsUwoZXcg0t1eg7iJi7iAuxtKA0b+AR3hBVX2DfDL0zoEpyqT9Y0HMxkDKfutYYFrKEySliGOvjErYAD+YmFGCZbheF9OholrEIjNrHtF3vhU232YgxXECU0bF+qf1pQhMM4AzfpBIwHsOGeFnlaTPQI45iH4erysWbCVrjjnW4BvOg3fsDN6qZ9i0G4sZ2qfQ2jGa5szoTt8MLnOA6rsB9WOQofZDUm8rtv+IswbsP2jfrH5TpyJ9oBq2xCJfzdwVit7J3V/xu+LJx6sRU6jCG47OhGK7QVuTCpvzl1H+z+9Ky7P0tgWLWfG03YgBm4FTyTNt0oh2fb4+exdDM7NJnMh9kiT5jXufUafOJD2GT7040w7sIJXobHzS0kB/cKHgRPkRPePeMmfAx74AvBJzkA++kySlGPaxhAHxyg+9VksnrzeNJy/PAUHqUvcLluZk+HNxn28BRewEn7fowLe5sRJTScppva0n0f+oaxFe5Bl+c+3CcSiR27yK5ahjjJIAAAAABJRU5ErkJggg==",className:"h-6 w-6 mr-2",alt:"icon"}),"Messages"]}),Object(m.jsxs)("div",{className:"currentUser flex items-center justify-center text-white font-bold m-4",children:[U.profileimage?Object(m.jsx)("img",{src:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).OUTPUT_URL,"/").concat(U.profileimage),className:"userimg h-12 w-12 lg:h-16 lg:w-16 rounded-full border-2 lg:border-4 border-white mr-2",alt:"image"}):null,Object(m.jsx)(g.b,{to:"/profile/".concat(U.username),children:Object(m.jsx)("span",{children:U.username})})]})]}),Object(m.jsx)("button",{onClick:function(){return u(!i)},className:"flex items-center justify-center bg-black-500 m-2",children:Object(m.jsx)("img",{src:i?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFpSURBVDhPjZU9SgUxFIWD+CwsxEbX4RIsBRuXYGkpaC+i2AquRtyAlT+NFirYCGKjYKui5xtyHtdM8mYOfGRy383JzSSTl7LWxK34EQcERmpPfIgrgUcnHgjCs/gV+2JITEzuQ24Z35k+5s6WWBY3goQj0RITkkMuY9ZzH5/0Kd7EhI4UTWuVssxohjzmnY5LryUQj++0lXshiB8SQCzPibVKMYqVrQgUc04JRBHwgOns85MlD+j9JlzZMYGaYqVxIP3r/IyiWa+yUrFSLx8t5NYTjDKzommpmcucy22pl9zW5A35yu2gakdjMbcoLnnwi2od2ktRxmwaz+k/tczYXeL+rbY5vUpbX8C5IM4GVM+psOm00l3hxFUCEomuLB6NeE5rle4QeBVcW3HWWFmpWGk0xaO7bXwHcgW1Kit1JmzKmG2BGf3uUvwWJNh8lpnlSp8EZrAhOmF6LwjyTsfqRPC3cSc2U0rpD7C6kiZWPTY0AAAAAElFTkSuQmCC":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACFSURBVDhPYxgFFANGIJ4FxDxQNiWAGYj/gBjbQQQVADsQLwS5yguIE0AiVADboDT1AMiFQkDsAOZRDg4yAYkFQPyPSngXyEA+IKYWuAjyMjcQu4O5lINzUJp6AOTCYCAOB/MoB8tAxEogBuUUaoD9IBdOAmJRMJcyIADE1yHMUUA+YGAAAK/wHwotC0WBAAAAAElFTkSuQmCC",className:"h-8 w-8 lg:hidden",alt:"icon"})})]})})}}}]);
//# sourceMappingURL=20.2093277d.chunk.js.map