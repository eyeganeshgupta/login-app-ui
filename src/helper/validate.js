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
