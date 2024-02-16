import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import Login from "../components/actions/Auth";
import axios from "axios";
import useDarkMode from "@/hooks/useDarkMode";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const [Login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const [isDark] = useDarkMode();

  const navigate = useNavigate();
  const inputBoxStyle = {
    backgroundColor: isDark ? "#0F172A" : "",
    width: "100%",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
  };
  //------ creating form data----

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  //----- destructureing form data----
  const { email, password, rememberMe } = formData;
  // ----handling the change in input box-----
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    schema
      .validateAt(name, { [name]: value })
      .then(() => {
        clearErrors(name);
      })
      .catch((error) => {
        setError(name, { type: "manual", message: error.message });
      });
  };
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
    if (password === "") {
      setError("password", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("password");
    }
  };
  // -----submiting the form-----
  const onSubmit = (e) => {
    let errorCount = 0;
    e.preventDefault();
    // -----applying validation------
    if (!email || !password) {
      errorCount++;
      toast.error("All fields are mandatory");
      validationFunction();
      return;
    }
    // if Everything work fine then submit the data----
    if (errorCount === 0) {
      axios
        .post("http://localhost:8080/api/admin/signIn", {
          email: email,
          password: password,
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/signinbyotp", { state: { email } });
        })
        .catch((error) => {
          toast.error("Error in Login");
        });
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4 ">
      <label htmlFor="email" className="inputlable">
        Email <span className="requiredInput">*</span>
      </label>
      <input
        name="email"
        label="email"
        type="email"
        className="h-[48px] rounded-lg"
        value={email}
        onKeyUp={handleValidation}
        onChange={handleChange}
        style={inputBoxStyle}
        placeholder="Enter Your Email"
      />
      {<p className="text-red-600">{errors.email?.message}</p>}
      <label htmlFor="password" className="inputlable">
        password <span className="requiredInput">*</span>{" "}
      </label>
      <input
        name="password"
        label="passwrod"
        type="password"
        className="h-[48px] rounded-lg"
        value={password}
        onChange={handleChange}
        // onKeyUp={handleValidation}
        onKeyUp={handleValidation}
        style={inputBoxStyle}
        placeholder="Enter Your Password"
      />
      {<p className="text-red-600">{errors.password?.message}</p>}

      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgetpassword"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <Button
        type="submit"
        text="Sign in"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
