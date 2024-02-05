import React, { useEffect, useState } from "react";
/*
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
*/
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/apiRequest";
import { useNavigate } from "react-router-dom";
/* 
import { useFormik } from "formik";
import { validatePassword } from "../helper/validate";
*/

const Recovery = () => {
  const navigate = useNavigate();

  const username = useAuthStore((state) => state.auth);

  const [otp, setOtp] = useState();

  useEffect(() => {
    function fetchOTP() {
      generateOTP(username).then((OTP) => {
        if (OTP) {
          return toast.success("OTP has been send to your email");
        }
        return toast.error("Problem while generating OTP");
      });
    }
    fetchOTP();
  }, [username]);

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, otp });

      if (status === 201) {
        toast.success("OTP verified successfully !");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP\nCheck email again!");
    }
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-5 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmitHandler}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  type="number"
                  className={styles.textbox}
                  name="otp"
                  id="otp"
                  placeholder="OTP"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className={styles.btn}>
                Recover
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?{" "}
              <button className="text-red-500" onClick={resendOTP}>
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
