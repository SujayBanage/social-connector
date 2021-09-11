import React, {createContext} from "react";
import ReactDOM from "react-dom";
import App from "./app.js";
import io from "socket.io-client";
import './index.css';

const END_POINT = process.env.BASE_URL;
console.log(END_POINT);
const socket = io(END_POINT, {
  transports: ["websocket", "polling", "flashsocket"],
});
const socketContext = createContext();


ReactDOM.render(
    <socketContext.Provider value={socket}>
      <App />
    </socketContext.Provider>,
  document.getElementById("root")
);

export {socketContext};