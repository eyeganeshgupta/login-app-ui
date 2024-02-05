import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateRegister } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/apiRequest";

const Register = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "eyeganeshgupta@gmail.com",
      username: "eyeganeshgupta",
      password: "eye@ganesh",
    },

    validate: validateRegister,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);

      /*
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Registered Successfully...!</b>,
        error: <b>{registerPromise.message}</b>,
      });
      */

      registerPromise
        .then((value) => {
          console.log(value);
          toast.success(value);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((value) => {
          console.log(value);
          toast.error(value);
          return;
        });
    },
  });

  // * formik doesn't support file upload, so I need to create this handler
  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "40%", paddingTop: "2em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-5 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={onUpload}
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="email"
                className={styles.textbox}
                {...formik.getFieldProps("email")}
                name="email"
                id="email"
                placeholder="Email*"
              />

              <input
                type="text"
                className={styles.textbox}
                {...formik.getFieldProps("username")}
                name="username"
                id="username"
                placeholder="Username*"
              />

              <input
                type="password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
                name="password"
                id="password"
                placeholder="Password*"
              />

              <button type="submit" className={styles.btn}>
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?{" "}
                <Link to="/" className="text-red-500">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
