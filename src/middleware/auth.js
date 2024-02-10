import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizedUser = ({ children }) => {
  const token = localStorage.getItem("loginAppToken");

  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }

  return children;
};
