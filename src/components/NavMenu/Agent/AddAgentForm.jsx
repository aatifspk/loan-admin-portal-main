import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Label } from "recharts";
import "@/assets/scss/common.scss";
import { stateData } from "@/redux/slices/StateSlice";
import { addBranch } from "@/redux/slices/AddBranchSlice";
import useDarkMode from "@/hooks/useDarkMode";
import { addAgent } from "@/redux/slices/Agent/AddAgent";
import Card from "@/components/ui/Card";

const schema = yup
  .object({
    branchId: yup.string().required("Branch Id is required"),
    firstName: yup
      .string()
      .matches(/^[a-zA-Z]+$/, "First name should only contain letters")
      .required("First Name is required")
      .min(3, "First Name must Contain 3 letter"),
    lastName: yup
      .string()
      .matches(/^[a-zA-Z]+$/, "Last name should only contain letters")

      .required("Last Name is required")
      .min(3, "Last Name must Contain 3 letter"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      // .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    roleId: yup.string().required("Role Id is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
      .string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid Indian phone number")
      .required("Phone Number is required"),
    city: yup.string().required("City Name is required"),
    state: yup.string().required("State Name is required"),
    create: yup.string().required("create is required"),
  })
  .required();
const AddAgentForm = () => {
  const [Login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cityList, setCityList] = useState();
  const { stateList } = useSelector((state) => state.stateSlice);
  const [isDark] = useDarkMode();
  // ----Adding style in input ----
  const inputBoxStyle = {
    backgroundColor: isDark
      ? "#0F172A"
      : // : "rgb(221 214 254 / var(--tw-bg-opacity))", // rgb(241 245 249 / var(--tw-bg-opacity))
        "rgb(235,240,245 / var(--tw-bg-opacity))",
    width: "100%",
    padding: "12px 14px",
    border: isDark ? "1.5px solid white" : "1.5px solid #ad9f9fa8",
    height: "38px",
  };
  const optionStyle = {
    backgroundColor: isDark
      ? "#0F172A"
      : "rgb(235,240,245 / var(--tw-bg-opacity))",
    border: isDark ? "1px solid white" : "1.5px solid #ad9f9fa8",
  };

  const { branchList } = useSelector((state) => state.branchSlice);

  //--------- creating form data ---------
  const [formData, setFormData] = useState({
    // branchId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    roleId: 2,
    email: "",
    create: true,
    phone: "",
    city: "",
    state: "",
    // country: "",
    // address: "",
    // locality: "",
    // GSTIN: "",
    // status: true,
  });
  // ------destructing the form data -------
  const {
    branchId,
    firstName,
    middleName,
    lastName,
    password,
    confirmPassword,
    roleId,
    email,
    create,
    phone,
    city,
    state,
    // country,
    // address,
    // locality,
    // GSTIN,
    // status,
  } = formData;
  const passwordMatch = password === confirmPassword;
  // ----handling the input box -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
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
  //   const AddBranchData = useSelector((state) => state.addBranchSlice);
  // -----creating branch data object
  //   const id = null;
  const agentData = {
    branchId,
    firstName,
    lastName,
    password,
    roleId,
    email,
    create,
    phone,
    city,
    state,
  };
  const validationFunction = () => {
    if (branchId === "" || branchId === null || branchId === undefined) {
      setError("branchId", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("branchId");
    }
    if (firstName === "") {
      setError("firstName", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("firstName");
    }
    if (lastName === "") {
      setError("lastName", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("lastName");
    }
    if (password === "") {
      setError("password", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("password");
    }

    if (email === "") {
      setError("email", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("email");
    }
    if (phone === "") {
      setError("phone", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("phone");
    }
    if (city === "") {
      setError("city", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("city");
    }
    if (state === "") {
      setError("state", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("state");
    }
  };
  // -----submiting the form ----
  const onSubmit = (e) => {
    e.preventDefault();
    let errorCount = 0;
    // --------applying validation ------
    if (
      !branchId ||
      !firstName ||
      !lastName ||
      !password ||
      !email ||
      !phone ||
      !city ||
      !state
    ) {
      validationFunction();
      errorCount++;
      toast.warn("All Fields are Required");
      return;
    }
    if (!passwordMatch) {
      errorCount++;
      toast.error("Password And Confirm Password Must Mathches");
      return;
    }
    if (errorCount === 0) {
      dispatch(addAgent(agentData))
        .then((res) => {
          toast.success(res.payload.data.message);
          navigate("/layout/agents");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  //Handling State
  useEffect(() => {
    dispatch(stateData());
  }, [state]);
  //Handling Cities after state change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: "",
    }));
    if (state.length)
      axios
        .get(`http://localhost:8080/api/getCities/${state}`)
        .then((res) => setCityList(res.data.data))
        .catch((error) => console.log(error));
  }, [state]);
  const handleBack = () => {
    navigate("/layout/agents");
  };

  const handleKeyPress2 = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces

    if (cleanedValue.trim() !== "") {
      e.target.value = cleanedValue;
    } else {
      e.target.value = ""; // Clear the input if no valid characters are present
    }
  };
  const handleKeyPress = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^6-9\d]/g, ""); //Allow only number starts with 6 to 9
    if (cleanedValue.trim() !== "") {
      e.target.value = cleanedValue;
    } else {
      e.target.value = ""; // Clear the input if no valid characters are present
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <div
          className={`${
            isDark
              ? "bg-secondary-900 shadow-custom-DarkMode"
              : "form-body shadow-custom"
          } grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5  p-10 rounded-3xl `}
        >
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Branch Name <span className="requiredInput">*</span>
            </p>
            <select
              value={branchId}
              name="branchId"
              // label="State"
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={optionStyle}
              className="h-10 mr-6 w-full pl-2"
            >
              <option value="">Branch Name</option>
              {branchList?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.branchVisibleName}
                </option>
              ))}
            </select>
            {<p className="text-red-600 text-xs">{errors.branchId?.message}</p>}
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              First Name <span className="requiredInput">*</span>
            </p>

            <input
              name="firstName"
              type="text"
              className="h-[48px] rounded-sm"
              value={firstName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your First Name"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.firstName?.message}
              </p>
            }
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">Middle Name</p>

            <input
              name="middleName"
              type="text"
              className=" rounded-sm"
              value={middleName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your First Name"
            />
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Last Name <span className="requiredInput">*</span>
            </p>
            <input
              name="lastName"
              type="text"
              className="h-[48px] rounded-sm"
              value={lastName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your Last Name"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.lastName?.message}
              </p>
            }
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              email <span className="requiredInput">*</span>
            </p>
            <input
              name="email"
              type="email"
              className="h-[48px] rounded-sm"
              value={email}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Email"
            />
            {<p className="text-red-600  text-xs">{errors.email?.message}</p>}
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Phone<span className="requiredInput">*</span>
            </p>

            <input
              name="phone"
              type="text"
              className="h-[48px] rounded-sm"
              value={phone}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress}
              placeholder="Enter Your Phone"
            />
            {<p className="text-red-600  text-xs">{errors.phone?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              State <span className="requiredInput">*</span>
            </p>
            <select
              value={state}
              name="state"
              label="State"
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={optionStyle}
              className="h-10 mr-6 w-full pl-2"
            >
              <option value="">Select</option>
              {stateList?.data?.map((item) => (
                <option
                  key={item._id}
                  value={item.state_code}
                  // onChange={handleState}
                >
                  {item.name}
                </option>
              ))}
            </select>
            {<p className="text-red-600  text-xs">{errors.state?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              City <span className="requiredInput">*</span>
            </p>
            <select
              name="city"
              value={city}
              label="City"
              onChange={handleChange}
              style={optionStyle}
              onKeyUp={handleValidation}
              className="h-10 w-full mr-5 pl-2"
            >
              <option value="">Select</option>
              {cityList?.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {<p className="text-xs text-red-600">{errors.city?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Password<span className="requiredInput">*</span>
            </p>
            <input
              name="password"
              type="password"
              className=" rounded-sm"
              value={password}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Password"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.password?.message}
              </p>
            }
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Confirm Password<span className="requiredInput">*</span>
            </p>
            <input
              name="confirmPassword"
              type="password"
              className="rounded-sm"
              value={confirmPassword}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your confrim  Password"
            />
            {!passwordMatch && (
              <p style={{ color: "red" }} className="text-sm">
                Passwords do not match
              </p>
            )}
            {/* {!confirmPassword && (
              <p style={{ color: "red" }} className="text-sm">
                Confirm Passwords is Required
              </p>
            )} */}
          </label>
          {/* <label className="inputlable">
            <p className="inputlable">
              Role Id <span className="requiredInput">*</span>
            </p>
            <input
              name="roleId"
              type="text"
              className="cursor-not-allowed"
              value={roleId}
              // onChange={handleChange}
              // onKeyUp={handleValidation}
              style={inputBoxStyle}
              // placeholder="Enter Your Role Id"
              disabled={true}
            />
            {<p className="text-red-600">{errors.roleId?.message}</p>}
          </label> */}
        </div>
        <div className="flex justify-between">
          <div className=" mt-5">
            <Button
              type="button"
              text="Back"
              onClick={handleBack}
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 "
                  : "btn btn-dark"
              }   py-2 rounded-lg`}
              isLoading={isLoading}
            />
          </div>
          <div className=" mt-5">
            <Button
              type="submit"
              text="Save Agent"
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 "
                  : "btn btn-dark"
              }  flex text-center  py-2 rounded-lg`}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AddAgentForm;