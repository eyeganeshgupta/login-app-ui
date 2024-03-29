import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validatePassword } from "../helper/validate.js";
import useFetch from "../hooks/useFetch.js";
import { useAuthStore } from "../store/store.js";
import { loginUser } from "../helper/apiRequest.js";

const Password = () => {
  const navigate = useNavigate();

  const username = useAuthStore((state) => state.auth.username);

  const [{ isLoading, apiData, serverError }] = useFetch(
    `user/${username ? username : localStorage.getItem("loginAppUsername")}`
  );

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = loginUser({
        username,
        password: values.password,
      });

      /*
      toast.promise(loginPromise, {
        loading: "Checking",
        success: <b>Login Successfully</b>,
        error: <b>Invalid/Wrong Password</b>,
      });
      */

      loginPromise
        .then((response) => {
          const { message, token, userFound } = response;

          toast.success(message);

          localStorage.setItem("loginAppToken", token);
          localStorage.setItem("loginAppUsername", userFound?.username);

          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        })
        .catch((value) => {
          toast.error(value);
          return;
        });
    },
  });

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }

  if (serverError) {
    return <h1 className="text-xl text-red-500">{serverError?.message}</h1>;
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.data?.firstName || apiData?.data?.username}!
            </h4>
            <span className="py-5 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.data?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
                name="password"
                id="password"
                placeholder="Password"
              />
              <button type="submit" className={styles.btn}>
                Sign In
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Forgot Password?{" "}
                <Link to="/recovery" className="text-red-500">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
