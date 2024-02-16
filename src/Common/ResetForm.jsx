import React, { useState, useRef } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import "../assets/scss/common.scss";
import useDarkMode from "@/hooks/useDarkMode";
import { index } from "d3-array";
const schema = yup
  .object({
    otp: yup.string().required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const ResetForm = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();

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
  const [isDark] = useDarkMode();

  const navigate = useNavigate();
  const location = useLocation();
  //----- taking email from forgot password -----
  const email = location?.state?.email;
  //------ creating form data -----
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });
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
  //-------  destructing form data ------
  const { password, confirmpassword } = formData;

  const passwordMatch = password === confirmpassword;
  const confirmpasswordStyle = passwordMatch ? {} : { borderColor: "red" };
  // ----Adding style in input ----
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    width: "100%",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
    // marginBottom: "2px",
    // marginTop: "1px",
    // margin: "0px",
  };

  //----- handling otp -------
  const handleChangeOtp = (e, index) => {
    const value = e.target.value;

    if (isNaN(value) || value.length > 1) {
      return; // Allow only single numeric input
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
  //------ moving forward and backward in otp field------
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otpValue[index]) {
      // Auto-switch to the previous box on backspace if the current box is empty
      inputRefs[index - 1].current.focus();
    }
  };
  //----- handling change in input box ---------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ----Handling Validation -------
  const handleValidation = (e) => {
    const { name, value } = e.target;
    schema
      .validateAt(name, { [name]: value })
      .then(() => {
        clearErrors(name);
      })
      .catch((error) => {
        setError(name, { type: "manual", message: error.message });
      });
  };
  const validationFunction = () => {
    if (password === "") {
      setError("password", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("password");
    }
    if (confirmpassword === "") {
      setError("confirmpassword", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("confirmpassword");
    }
  };
  //----- Submitting the form -----
  const onSubmit = (e) => {
    e.preventDefault();

    let errorCount = 0;

    let OtpErrorCount = 0;
    //------ checking otp count -----
    if (OtpErrorCount > 0) {
      toast.warning("please fill the OTP");
      errorCount++;
    }
    //----- applying validation ------
    if (!password || !confirmpassword) {
      toast.error("All fields are mandatory");
      errorCount++;
      validationFunction();
      return;
    }

    if (password !== confirmpassword) {
      setInputBoxColor("red");
      toast.warn("password must match");
      errorCount++;
      return;
    }

    // ----here we submit the form ------
    if (errorCount == 0) {
      console.log("sent OTP", otp);
      axios
        .post("http://localhost:8080/api/admin/resetpassword", {
          email: email,
          otp: otp,
          password: password,
          confirmpassword: confirmpassword,
        })
        .then((response) => {
          toast.success("successfully Reset Password");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 ">
      <label htmlFor="email" className="inputlable">
        Email <span className="requiredInput">*</span>
      </label>
      <input
        name="email"
        label="email"
        type="email"
        placeholder="Your Email"
        defaultValue={email}
        disabled={true}
        className="h-[48px] rounded-lg"
        style={inputBoxStyle}
      />
      <label htmlFor="otp" className="inputlable">
        OTP <span className="requiredInput"> *</span>
      </label>
      <div className="otp-input-container mb-3 rounded-lg">
        {otpValue.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChangeOtp(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otpInput rounded-lg"
          />
        ))}
        {<p className="text-red-600 text-xs">{errors.otp?.message}</p>}
      </div>
      <label htmlFor="password" className="inputlable">
        password <span className="requiredInput">*</span>
      </label>
      <input
        name="password"
        label="password"
        type="password"
        placeholder="Enter password"
        onChange={handleChange}
        onKeyUp={handleValidation}
        className="h-[48px] rounded-lg"
        value={password}
        style={inputBoxStyle} //margin 0
      />
      {<p className="text-red-600 text-xs">{errors.password?.message}</p>}
      {/* {formError.password && <div>{formError.password}</div>} */}
      <label htmlFor="confirmpassword" className="inputlable">
        confirm password <span className="requiredInput">*</span>
      </label>
      <input
        name="confirmpassword"
        label="confirmPassword"
        type="password"
        placeholder="Enter confirm Password"
        onChange={handleChange}
        className="h-[48px] border border-black-500 mt-4 rounded-lg"
        onKeyUp={handleValidation}
        value={confirmpassword}
        style={{
          width: "100%",
          padding: "12px 14px",
          confirmpasswordStyle,
          inputBoxStyle,
          margin: 0,
        }}
      />
      {!passwordMatch && (
        <p className="text-red-600 text-xs">Passwords do not match</p>
      )}
      <Button
        type="submit"
        text="Reset password"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default ResetForm;
