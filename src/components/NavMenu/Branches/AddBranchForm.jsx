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
import Card from "@/components/ui/Card";

const schema = yup
  .object({
    branchVisibleName: yup.string().required("Branch Visible Name is required"),
    branchName: yup.string().required("Branch Name is required"),
    branchCode: yup.string().required("Branch Code is required"),
    pinCode: yup.string().required("pin Code is required"),
    openingDate: yup.string().required("opening Date is required"),
    contactEmail: yup
      .string()
      .email("Email must be a valid Email")
      .required("Email is required"),
    landlineNumber: yup.string().required("Landline Number is required"),
    phone: yup.string().required("Phone Number is required"),
    city: yup.string().required("City Name is required"),
    state: yup.string().required("State Name is required"),
    country: yup.string().required("Country Name is required"),
    address: yup.string().required("Address is required"),
    locality: yup.string().required("Locality is required"),
  })
  .required();
const AddBranchForm = () => {
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
  const [stateCode, setStateCode] = useState();
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

  //--------- creating form data ---------
  const [formData, setFormData] = useState({
    branchName: "",
    branchVisibleName: "",
    branchCode: "",
    pinCode: "",
    openingDate: "",
    contactEmail: "",
    landlineNumber: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    address: "",
    locality: "",
    GSTIN: "",
    status: true,
  });
  // ------destructing the form data -------
  const {
    branchVisibleName,
    branchName,
    branchCode,
    pinCode,
    openingDate,
    contactEmail,
    landlineNumber,
    phone,
    city,
    state,
    country,
    address,
    locality,
    GSTIN,
    status,
  } = formData;
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
  const AddBranchData = useSelector((state) => state.addBranchSlice);
  // -----creating branch data object
  const id = null;
  const branchData = {
    branchName,
    branchVisibleName,
    branchCode,
    pinCode,
    openingDate,
    contactEmail,
    landlineNumber,
    phone,
    city,
    state,
    country,
    address,
    locality,
    GSTIN,
    status,
    id,
  };
  const validationFunction = () => {
    if (branchName === "") {
      setError("branchName", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("branchName");
    }
    if (branchVisibleName === "") {
      setError("branchVisibleName", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("branchVisibleName");
    }
    if (branchCode === "") {
      setError("branchCode", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("branchCode");
    }
    if (openingDate === "") {
      setError("openingDate", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("openingDate");
    }
    if (pinCode === "") {
      setError("pinCode", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("pinCode");
    }
    if (contactEmail === "") {
      setError("contactEmail", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("contactEmail");
    }
    if (landlineNumber === "") {
      setError("landlineNumber", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("landlineNumber");
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
    if (country === "") {
      setError("country", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("country");
    }
    if (address === "") {
      setError("address", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("address");
    }
    if (locality === "") {
      setError("locality", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("locality");
    }
  };
  // -----submiting the form ----
  const onSubmit = async (e) => {
    e.preventDefault();
    let errorCount = 0;

    // --------applying validation ------

    if (
      !branchVisibleName ||
      !branchName ||
      // !branchCode ||
      !pinCode ||
      !openingDate ||
      !contactEmail ||
      !landlineNumber ||
      !phone ||
      !city ||
      !state ||
      !country ||
      !address ||
      !locality ||
      // !GSTIN ||
      !status
    ) {
      errorCount++;
      toast.warn("All Fields are Required");
      validationFunction();
      return;
    }

    if (errorCount === 0) {
      dispatch(addBranch(branchData))
        .then((res) => {
          toast.success(res.payload.data.message);
          navigate("/layout/branches");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // Handling State
  useEffect(() => {
    dispatch(stateData());
  }, [state]);
  // Handling Cities after state change
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
    navigate("/layout/branches");
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

  const handleKeyPress2 = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only letters and spaces

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
              Branch Visible Name <span className="requiredInput">*</span>
            </p>
            <input
              name="branchVisibleName"
              type="text"
              className=" rounded-sm"
              value={branchVisibleName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Branch Visible Name"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.branchVisibleName?.message}
              </p>
            }
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Branch Name <span className="requiredInput">*</span>
            </p>

            <input
              name="branchName"
              type="test"
              className=" rounded-sm"
              value={branchName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Branch Name"
              onInput={handleKeyPress2}
            />
            {
              <p className="text-red-600  text-xs">
                {errors.branchName?.message}
              </p>
            }
          </label>
          {/* <label className="inputlable rounded-sm">
            <p className="inputlable">
              Branch Code <span className="requiredInput">*</span>
            </p>
            <input
              name="branchCode"
              type="text"
              className=" rounded-sm"
              value={branchCode}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Branch Code"
            />
            {<p className="text-red-600  text-xs">{errors.branchCode?.message}</p>}
          </label> */}

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Opening Date <span className="requiredInput">*</span>
            </p>
            <input
              name="openingDate"
              type="date"
              className=" rounded-sm"
              value={openingDate}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Opening Date"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.openingDate?.message}
              </p>
            }
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Contact Email <span className="requiredInput">*</span>
            </p>

            <input
              name="contactEmail"
              type="email"
              className=" rounded-sm"
              value={contactEmail}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Email Address"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.contactEmail?.message}
              </p>
            }
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Landline Number <span className="requiredInput">*</span>
            </p>
            <input
              name="landlineNumber"
              type="text"
              className=" rounded-sm"
              value={landlineNumber}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress}
              placeholder="Enter Your Landline Number"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.landlineNumber?.message}
              </p>
            }
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Contact Number <span className="requiredInput">*</span>
            </p>
            <input
              name="phone"
              type="text"
              className=" rounded-sm"
              value={phone}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress}
              placeholder="Enter Your Contact Number"
            />
            {<p className="text-red-600  text-xs">{errors.phone?.message}</p>}
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">GSTIN</p>
            <input
              name="GSTIN"
              type="text"
              className=" rounded-sm"
              value={GSTIN}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your GSTIN"
            />
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Country <span className="requiredInput">*</span>
            </p>
            <select
              name="country"
              value={country}
              label="country"
              onChange={handleChange}
              style={optionStyle}
              onKeyUp={handleValidation}
              className="h-10 w-full pl-2"
            >
              <option value="">Country</option>
              <option value="india">India</option>
            </select>
            {<p className="text-red-600  text-xs">{errors.country?.message}</p>}
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
            {<p className="text-red-600  text-xs">{errors.city?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Address<span className="requiredInput">*</span>
            </p>
            <input
              name="address"
              type="text"
              className=""
              value={address}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Address"
            />
            {<p className="text-red-600  text-xs">{errors.address?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Locality <span className="requiredInput">*</span>
            </p>
            <input
              name="locality"
              type="text"
              className=""
              value={locality}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Locality/Street"
            />
            {
              <p className="text-red-600  text-xs">
                {errors.locality?.message}
              </p>
            }
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Pin Code<span className="requiredInput">*</span>
            </p>

            <input
              name="pinCode"
              type="text"
              className=""
              value={pinCode}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress}
              placeholder="Enter Your Pin Code"
            />
            {<p className="text-red-600  text-xs">{errors.pinCode?.message}</p>}
          </label>
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
              } py-2  rounded-lg`}
              isLoading={isLoading}
            />
          </div>
          <div className=" mt-5">
            <Button
              type="submit"
              text="Save Branch"
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 py-2"
                  : "btn btn-dark py-2"
              }  rounded-lg`}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default AddBranchForm;
