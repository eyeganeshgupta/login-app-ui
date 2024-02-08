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

// ! Generate OTP
export async function generateOTP(username) {
  try {
    const response = await axios.get("/api/generate-otp", {
      params: { username },
    });

    const status = response?.status;
    const otp = response?.data?.code;

    if (status === 201) {
      let response = await getUser({ username });

      const email = response?.data?.email;

      let text = `Your password recovery OTP is ${otp}. Verify and recover your password`;

      await axios.post("/api/register-mail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }

    return Promise.resolve(otp);
  } catch (error) {
    // console.log(error);
    // console.log(error?.response?.status);
    // console.log(error?.response?.data?.message);
    // return error?.response?.data?.message;
    return Promise.reject(error?.response?.data?.message);
  }
}

// ! Verify OTP
export async function verifyOTP({ username, otp }) {
  try {
    const response = await axios.get("/api/verify-otp", {
      params: { username, otp },
    });
    const status = response?.status;
    const message = response?.data?.message;
    return {
      status,
      message,
    };
  } catch (error) {
    // console.log(error?.response?.status);
    // console.log(error?.response?.data?.message);
    // return error?.response?.data?.message;
    Promise.reject(error?.response?.data?.message);
  }
}

// ! Reset password
export async function resetPassword({ username, password }) {
  try {
    const {
      status,
      data: { message },
    } = await axios.put("/api/reset-password", {
      username,
      password,
    });

    // console.log(status);
    // console.log(message);

    return {
      status,
      message,
    };
  } catch (error) {
    // console.log(error?.response?.status);
    // console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
}
