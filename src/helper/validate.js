import toast from "react-hot-toast";
import { authenticate } from "./apiRequest";

// ! Validate login page username
export async function validateUsername(values) {
  const error = verifyUsername({}, values);
  if (values.username) {
    // TODO: check user exist or not
    const { status } = await authenticate(values);
    if (status !== 200) {
      error.exist = toast.error("User doesn't exists...!");
    }
  }
  return error;
}

// ! Verify Username
function verifyUsername(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }
  return error;
}

// ! Validate password page "password"
export async function validatePassword(values) {
  const error = verifyPassword({}, values);
  return error;
}

// ! Verify Password
function verifyPassword(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be more than 4 character");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }

  return error;
}

// ! Validate reset password
export async function validateResetPassword(values) {
  const error = verifyPassword({}, values);

  if (values.password !== values.confirmPassword) {
    error.exist = toast.error("Password not match...!");
  }

  return error;
}

// ! Verify e-mail
function verifyEmail(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address");
  }

  return error;
}

// ! Validate Register Form
export async function validateRegister(values) {
  const error = verifyUsername({}, values);
  verifyPassword(error, values);
  verifyEmail(error, values);

  return error;
}

// ! Validate profile
export async function validateProfile(values) {
  const error = verifyEmail({}, values);
  return error;
}
