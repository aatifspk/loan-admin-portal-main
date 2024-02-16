import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
  })
  .required();
const ForgotPasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const [isDark] = useDarkMode();

  // -----handling change and validation ----
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    width: "100%",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
  };

  // ---------------- Handling Validation -----------
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
    if (email === "") {
      setError("email", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("email");
    }
  };
  //submiting the form
  // async function handleSubmit(e) {
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter Email Id");
      validationFunction();
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/forgetpassword",
        {
          email: email,
        }
      );
      toast.success("Successfully otp sent");
      navigate("/resetpassword", { state: { email } });
      console.log("API response:", res);
    } catch (error) {
      toast.error(error.response.data.message);
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
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyUp={handleValidation}
        className="h-[48px]"
        value={email}
        style={inputBoxStyle}
      />
      {<p className="text-red-600">{errors.email?.message}</p>}
      <button className="btn btn-dark block w-full text-center">
        Forgot Password
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
