import React, { useState, useRef, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { verifyAuth } from "@/redux/slices/AuthSlice";
import "../assets/scss/common.scss";
import { viewUser } from "@/redux/slices/ViewAuth";
const schema = yup
  .object({
    otp: yup.string().required("Email is Required"),
  })
  .required();
const SignInByOtpForm = () => {
  const location = useLocation();
  // ----taking email from login form
  const email = location?.state?.email;
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]); // Array to store OTP digits
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]; // Refs for input elements
  const [otp, setOtp] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  //submiting the form
  const authState = useSelector((state) => state.AuthSlice);
  console.log(authState, "authState");
  //-----Handling the Input with onChange event --------

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value) || value.length > 1) {
      return;
    }

    // Update the OTP array
    const newOtp = [...otpValue];
    newOtp[index] = value;

    setOtpValue(newOtp);

    // Auto-switch to the next box if a digit is entered
    if (value && index < otpValue.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    const newOtpValue = parseInt(newOtp.join(""), 10);
    setOtp(newOtpValue);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otpValue[index]) {
      // Auto-switch to the previous box on backspace if the current box is empty
      inputRefs[index - 1].current.focus();
    }
  };
  // -----submiting form ------
  const onSubmit = (e) => {
    let errorCount = 0;
    e.preventDefault();
    if (!otp) {
      errorCount++;
      toast.warn("Otp is required");
      return;
    }

    if (errorCount === 0) {
      console.log(otp);
      dispatch(verifyAuth({ email, otp }))
        .then((res) => {
          localStorage.setItem("roleId", res.payload.data.adminInfo.roleId);
          localStorage.setItem("id", res.payload.data.adminInfo._id);
          localStorage.setItem("token", res.payload.data.token);
          navigate("/layout/dashboard");
          dispatch(viewUser());
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 ">
      <p className="inputlable">
        OTP <span className="requiredInput">*</span>{" "}
      </p>
      <div className="otp-input-container rounded-lg">
        {otpValue.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otpInput rounded-lg"
          />
        ))}
      </div>

      <Button
        type="submit"
        text="Sign In"
        className="btn btn-dark block w-full text-center "
        // isLoading={isLoading}
      />
    </form>
  );
};

export default SignInByOtpForm;
