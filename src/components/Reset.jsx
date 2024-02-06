import React from "react";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";

const Reset = () => {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-5 text-xl w-2/3 text-center text-gray-500">
              Enter new password.
            </span>
          </div>

          <form className="pt-12" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
                name="password"
                id="password"
                placeholder="New Password"
              />

              <input
                type="password"
                className={styles.textbox}
                {...formik.getFieldProps("confirmPassword")}
                name="repeatpassword"
                id="repeatpassword"
                placeholder="Repeat Password"
              />

              <button type="submit" className={styles.btn}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
