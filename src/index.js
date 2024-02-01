import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
/*
import {
  generateOTP,
  loginUser,
  registerUser,
  resetPassword,
  verifyOTP,
} from "./helper/apiRequest";
*/

/*
registerUser({
  username: "eyeganeshgupta",
  password: "eye@ganesh",
  email: "eyeganeshgupta@gmail.com",
  profile: "",
});
*/

// loginUser({ username: "eyeganeshgupta", password: "eyeganesh" });

// verifyOTP({ username: "eyeganeshgupta", otp: "810286" });

// resetPassword({ username: "eyeganeshgupta", password: "eye123ganesh" });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
