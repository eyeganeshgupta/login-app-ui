import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// TODO: Make API Requests
// ! Authenticate Function
export async function authenticate(username) {
  // { "username": "eyeganeshgupta" }
  // console.log(username);
  try {
    const response = await axios.post("/api/authenticate", username);
    return response;
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

// ! Get User Details
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "Password doesn't match...!" };
  }
}
