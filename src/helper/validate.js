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
