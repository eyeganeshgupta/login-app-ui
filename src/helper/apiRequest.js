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

// ! Register user function
export async function registerUser(credentials) {
  try {
    const response = await axios.post("/api/register", credentials);
    const status = response?.status;
    const message = response?.data?.message;

    let { username, email } = credentials;

    // TODO: send mail
    if (status === 201) {
      await axios.post("/api/register-mail", {
        username,
        userEmail: email,
        text: message,
      });
    }
    return message;
  } catch (error) {
    // return Promise.reject({ error });
    // console.log(error?.response?.status);
    // console.log(error?.response?.data?.message);
    // return error?.response?.data?.message;
    return Promise.reject(error?.response?.data?.message);
  }
}

// ! Login function
export async function loginUser({ username, password }) {
  try {
    if (username) {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      return response?.data;
    }
  } catch (error) {
    // console.log(error?.response?.status);
    // console.log(error?.response?.data?.message);
    // return error?.response?.data?.message;
    return Promise.reject(error?.response?.data?.message);
  }
}

// ! Update user profile function
export async function updateUser(user) {
  try {
    const token = await localStorage.getItem("loginAppToken");
    const response = await axios.put("/api/update-user", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response?.data;
  } catch (error) {
    // console.log(error?.response?.status);
    // console.log(error?.response?.data?.message);
    // return error?.response?.data?.message;
    return Promise.reject(error?.response?.data?.message);
  }
}
