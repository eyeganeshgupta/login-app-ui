import React, { useState } from "react";
// import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { validateProfile } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import useFetch from "../hooks/useFetch";
import { useAuthStore } from "../store/store";
import { updateUser } from "../helper/apiRequest";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.data?.firstName || "",
      lastName: apiData?.data?.lastName || "",
      mobile: apiData?.data?.mobile || "",
      email: apiData?.data?.email || "",
      address: apiData?.data?.address || "",
    },
    enableReinitialize: true,
    validate: validateProfile,
    validateOnBlur: false,
    validateOnChange: false,
  });

  // * formik doesn't support file upload, so I need to create this handler
  const onUpload = async (event) => {
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);
  };

  // logoutHandler function
  const logoutHandler = () => {
    localStorage.removeItem("loginAppToken");
    localStorage.removeItem("loginAppUsername");
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "40%", paddingTop: "2em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-5 text-xl w-2/3 text-center text-gray-500">
              You can update the details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.data?.profile || file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="email"
                  placeholder="Email*"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Come back later?{" "}
                <button className="text-red-500" onClick={logoutHandler}>
                  Logout Now
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
