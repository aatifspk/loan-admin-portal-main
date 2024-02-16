import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { stateData } from "@/redux/slices/StateSlice";
import { profile } from "@/redux/slices/ProfileSlice";
import "../assets/scss/common.scss";
import useDarkMode from "@/hooks/useDarkMode";
import { viewUser } from "@/redux/slices/ViewAuth";
import Card from "@/components/ui/Card";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed in the First Name field.")
    .required("First Name is required")
    .min(3, "Enter at Least 3 Character"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Addresss is required"),
  fatherName: yup
    .string()
    .required("Father Name is required")
    .min(3, "Enter at Least 3 Character"),
  motherName: yup
    .string()
    .required("Mother Name is required")
    .min(3, "Enter at Least 3 Character"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  maritalStatus: yup.string().required("Maritial Status is required"),
  optionalEmail: yup
    .string()
    .email("Invalid Email")
    .required(" Email is required"),
  emergencyPhone: yup.string().required("Emergency Phone Number is required"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"),
  zipCode: yup.string().required("Zipcode is required").min(6),
  state: yup.string().required("State Name is required"),
  city: yup.string().required("City Name is required"),
  designation: yup.string().required("Designation is Required"),
});
const EditProfile = () => {
  const [Login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.ProfileSlice);
  useEffect(() => {
    dispatch(viewUser());
  }, [dispatch]);
  const { data } = useSelector((state) => state.viewUserSlice);
  console.log(data, "data");
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

  // ---creating form data-----
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    email: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    optionalEmail: "",
    emergencyPhone: "",
    phone: "",
    ZipCode: "",
    state: "",
    city: "",
    designation: "",
  });
  // ----destructuring form data-----
  const {
    firstName,
    middleName,
    lastName,
    address,
    email,
    fatherName,
    motherName,
    gender,
    dateOfBirth,
    maritalStatus,
    optionalEmail,
    emergencyPhone,
    phone,
    ZipCode,
    state,
    city,
    designation,
  } = formData;
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState();
  const [isPending, startTransition] = useTransition();
  //setting default value
  useEffect(() => {
    // startTransition(() => {
    setFormData((prev) => ({
      ...prev,
      firstName: data?.data?.data?.firstName,
      middleName: data?.data?.data?.middleName,
      lastName: data?.data?.data?.lastName,
      city: data?.data?.data?.city,
      state: data?.data?.data?.state,
      ZipCode: data?.data?.data?.ZipCode,
      email: data?.data?.data?.email,
      phone: data?.data?.data?.phone,
      dateOfBirth: data?.data?.data?.dateOfBirth
        ? new Date(data?.data?.data?.dateOfBirth).toISOString().split("T")[0]
        : "",
      emergencyPhone: data?.data?.data?.emergencyPhone,
      fatherName: data?.data?.data?.fatherName,
      gender: data?.data?.data?.gender,
      maritalStatus: data?.data?.data?.maritalStatus,
      motherName: data?.data?.data?.motherName,
      optionalEmail: data?.data?.data?.optionalEmail,
      address: data?.data?.data?.address,
      designation: data?.data?.data?.designation,
    }));
    setAvatar(
      `http://localhost:8080/profile/${data?.data?.data?.profileImage} `
    );
    setAvatarPreview(
      `http://localhost:8080/profile/${data?.data?.data?.profileImage} `
    );
    // });
  }, [data]);
  const [cityList, setCityList] = useState();

  // ----taking all state list data from redux store-----
  const { stateList } = useSelector((state) => state.stateSlice);

  // ------Handling the change in a input ------

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  // -----handling avatar and also applying validation -------
  const [profileImageErr, setProfileImageErr] = useState("");
  const handleAvatar = (e) => {
    let fileSize = 0;
    let errorCount = 0;
    const { name, value } = e.target;

    const file = e.target.files[0];
    if (file) {
      fileSize = file.size / 1024;
    }
    if (!file) {
      setProfileImageErr("profile Image is Required");
    }
    if (fileSize > 1024) {
      setProfileImageErr("profile Image Size must Be Less Than 1 MB");
      errorCount++;
    }
    // if(fileSize*1024 >maxFileSize)
    if (errorCount === 0) {
      setProfileImageErr();

      const imageAsBase64 = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarPreview(imageAsBase64);

      const render = new FileReader();
      render.onload = () => {
        setAvatarPreview(render.result);
      };
      render.readAsDataURL(file);
    }
  };
  // ----Removing avatar after clicking the profile image-------
  const handleRemoveAvatar = (e) => {
    setAvatarPreview();
  };
  const validationFunction = () => {
    if (avatar === "") {
      setError("avatar", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("avatar");
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
    if (address === "") {
      setError("address", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("address");
    }
    if (fatherName === "") {
      setError("fatherName", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("fatherName");
    }
    if (motherName === "") {
      setError("motherName", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("motherName");
    }
    if (gender === "") {
      setError("gender", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("gender");
    }
    if (dateOfBirth === "") {
      setError("dateOfBirth", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("dateOfBirth");
    }
    if (maritalStatus === "") {
      setError("maritalStatus", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("maritalStatus");
    }
    if (optionalEmail === "") {
      setError("optionalEmail", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("optionalEmail");
    }
    if (emergencyPhone === "") {
      setError("emergencyPhone", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("emergencyPhone");
    }
    if (phone === "") {
      setError("phone", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("phone");
    }
    if (ZipCode === "") {
      setError("ZipCode", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("ZipCode");
    }
    if (state === "") {
      setError("state", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("state");
    }
    if (city === "") {
      setError("city", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("city");
    }
    if (designation === "") {
      setError("designation", {
        type: "all",
        message: "This field is required..",
      });
    } else {
      clearErrors("designation");
    }
  };
  // -------submitting the form------
  const onSubmit = (e) => {
    e.preventDefault();
    let errorCount = 0;
    // ------sending all data in payload-----
    const payload = new FormData();
    if (avatar instanceof File) {
      payload.append("profileImage", avatar);
    }
    payload.append("firstName", firstName);
    payload.append("middleName", middleName);
    payload.append("lastName", lastName);
    payload.append("address", address);
    // payload.append("email", email);
    payload.append("fatherName", fatherName);
    payload.append("motherName", motherName);
    payload.append("gender", gender);
    payload.append("dateOfBirth", dateOfBirth);
    payload.append("maritalStatus", maritalStatus);
    payload.append("optionalEmail", optionalEmail);
    payload.append("emergencyPhone", emergencyPhone);
    payload.append("phone", phone);
    payload.append("ZipCode", ZipCode);
    payload.append("state", state);
    payload.append("city", city);
    payload.append("designation", designation);
    console.log(payload, "payload");
    console.log(formData, "formData");
    // ------Applying Validation -------

    if (
      !firstName ||
      !lastName ||
      !address ||
      // !email ||
      !fatherName ||
      !motherName ||
      // !avatar ||
      !gender ||
      !dateOfBirth ||
      !maritalStatus ||
      !optionalEmail ||
      !emergencyPhone ||
      !phone ||
      !ZipCode ||
      !state ||
      !city
    ) {
      console.log(avatar);
      errorCount++;
      validationFunction();

      toast.warn("All Fields are Required");
      return;
    }
    // if (profileState.isError) {
    //   console.log(formData, avatar);
    //   errorCount++;
    //   return;
    // }
    // ----if Everthing is correctly work then submiting the form------;
    if (errorCount === 0) {
      dispatch(profile(payload))
        .then((res) => {
          navigate("/layout/profile");
          toast.success(res.payload.data.message);
        })
        .catch((error) => {
          // console.log("API response Error", error);
          toast.error(error.response.data.message);
        });
    }
  };
  //-----Handling states after page refresh-------
  useEffect(() => {
    dispatch(stateData());
  }, [state]);

  // ------ handling city after state change-------
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: "",
    }));
    if (state.length)
      axios
        .get(`http://localhost:8080/api/getCities/${state}`)
        .then((res) => {
          setCityList(res.data.data);
        })
        .catch((error) => console.log(error));
  }, [state]);

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
      <form
        onSubmit={onSubmit}
        // encType="multipart/form-data"
      >
        <div
          className={`${
            isDark
              ? "bg-secondary-900 shadow-custom-DarkMode"
              : "form-body shadow-custom"
          } grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5  p-10 rounded-xl `}
        >
          <div>
            <div className="avatar">
              <label>
                <input
                  type="file"
                  name="avatar"
                  // value={avatar}
                  onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px]"
                  // register={register}
                  error={errors.avatar}
                />
                {avatarPreview && (
                  <div>
                    <input
                      type="image"
                      className="avatarPreview"
                      src={avatarPreview}
                      // alt="preview"
                      onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {<p className="text-center ">Profile Image</p>}
              </label>
            </div>

            {<p className="text-red-600 p-2 text-xs mt-3">{profileImageErr}</p>}
          </div>
          <label className=" rounded-sm">
            <p className="inputlable">
              First Name <span className="requiredInput">*</span>
            </p>
            <input
              name="firstName"
              type="text"
              className="rounded-sm form-control "
              value={firstName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your First Name"
            />
            {
              <p className="text-red-600 text-xs">
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
          <label className=" rounded-sm">
            <p className="inputlable">
              Last Name <span className="requiredInput">*</span>
            </p>

            <input
              name="lastName"
              label="lastName"
              type="text"
              className=" rounded-sm form-control"
              value={lastName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your Last Name"
            />
            {<p className="text-red-600 text-xs">{errors.lastName?.message}</p>}
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Father's Name <span className="requiredInput">*</span>
            </p>
            <input
              name="fatherName"
              // label="fatherName"
              type="text"
              className="rounded-sm"
              value={fatherName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your Father's Name"
            />
            {
              <p className="text-red-600 text-xs">
                {errors.fatherName?.message}
              </p>
            }
          </label>

          <label className=" rounded-sm">
            <p className="inputlable">
              Mother's Name <span className="requiredInput">*</span>
            </p>

            <input
              name="motherName"
              // label="lastName"
              type="text"
              className=" rounded-sm"
              value={motherName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              onInput={handleKeyPress2}
              placeholder="Enter Your Mother's Name"
            />
            {
              <p className="text-red-600 text-xs">
                {errors.motherName?.message}
              </p>
            }
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Contact Number <span className="requiredInput">*</span>
            </p>
            <input
              name="phone"
              // label="email"
              type="text"
              className=" rounded-sm"
              value={phone}
              onChange={handleChange}
              style={inputBoxStyle}
              onKeyUp={handleValidation}
              onInput={handleKeyPress}
              placeholder="Enter Your Contact Number"
            />
            {<p className="text-red-600 text-xs">{errors.phone?.message}</p>}
          </label>

          {/* <label className=" rounded-sm">
            <p className="inputlable">
              Email Address <span className="requiredInput">*</span>
            </p>

            <input
              name="email"
              // label="lastName"
              type="email"
              className=" rounded-sm"
              value={email}
              onChange={handleChange}
              style={inputBoxStyle}
              onKeyUp={handleValidation}
              placeholder="Enter Your Email Address"
              // defaultValue={defaultEmail}
            />
            {<p className="text-red-600 text-xs">{errors.email?.message}</p>}
          </label> */}

          <label className=" rounded-sm">
            <p className="inputlable">
              Gender <span className="requiredInput">*</span>
            </p>
            <div className="flex gap-2">
              <label className="flex gap-2">
                <p className="pt-2.5 ">Male</p>
                <input
                  name="gender"
                  type="radio"
                  className="h-[48px] rounded-sm"
                  value="male"
                  // onKeyUp={handleValidation}
                  checked={gender === "male"}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="pt-2.5">FeMale</p>
                <input
                  name="gender"
                  type="radio"
                  className="h-[48px]"
                  value="female"
                  // onKeyUp={handleValidation}
                  checked={gender === "female"}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="pt-2.5">Others</p>
                <input
                  name="gender"
                  type="radio"
                  className="h-[48px]"
                  value="other"
                  // onKeyUp={handleValidation}
                  onChange={handleChange}
                  checked={gender === "other"}
                />
              </label>
              {<p className="text-red-600 text-xs">{errors.gender?.message}</p>}
            </div>
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Date Of Birth <span className="requiredInput">*</span>
            </p>
            <input
              name="dateOfBirth"
              // label="email"
              type="date"
              className="h-[48px] rounded-sm"
              value={dateOfBirth}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Date Of Birth"
            />
            {
              <p className="text-red-600 text-xs">
                {errors.dateOfBirth?.message}
              </p>
            }
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Marital Status <span className="requiredInput">*</span>
            </p>
            <div className="flex gap-2">
              <label className="flex gap-2">
                <p className="pt-2.5 ">Married</p>
                <input
                  name="maritalStatus"
                  type="radio"
                  className="h-[48px] rounded-sm"
                  value="married"
                  // onKeyUp={handleValidation}
                  checked={maritalStatus === "married"}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="pt-2.5">UnMarried</p>
                <input
                  name="maritalStatus"
                  type="radio"
                  className="h-[48px]"
                  value="unMarried"
                  // onKeyUp={handleValidation}
                  onChange={handleChange}
                  checked={maritalStatus === "unMarried"}
                />
              </label>
              {
                <p className="text-red-600 text-xs">
                  {errors.maritalStatus?.message}
                </p>
              }
            </div>
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Email <span className="requiredInput">*</span>
            </p>
            <input
              name="optionalEmail"
              type="email"
              className="h-[48px] rounded-sm"
              value={optionalEmail}
              onKeyUp={handleValidation}
              onChange={handleChange}
              style={inputBoxStyle}
              placeholder="Enter Your  Email"
            />
            {
              <p className="text-red-600 text-xs">
                {errors.optionalEmail?.message}
              </p>
            }
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Emergency Contact Number <span className="requiredInput">*</span>
            </p>
            <input
              name="emergencyPhone"
              type="text"
              className="h-[48px] rounded-sm"
              value={emergencyPhone}
              onKeyUp={handleValidation}
              onChange={handleChange}
              style={inputBoxStyle}
              onInput={handleKeyPress}
              placeholder="Enter Your Emergency Contact Number"
            />
            {
              <p className="text-red-600 text-xs">
                {errors.emergencyPhone?.message}
              </p>
            }
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Address <span className="requiredInput">*</span>
            </p>
            <input
              name="address"
              type="text"
              className="h-[48px] rounded-sm"
              value={address}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Address"
            />
            {<p className="text-red-600 text-xs">{errors.address?.message}</p>}
          </label>
          <label className=" ">
            <p className="inputlable ">
              State <span className="requiredInput">*</span>
            </p>
            <select
              value={state}
              name="state"
              label="State"
              onKeyUp={handleValidation}
              style={optionStyle}
              onChange={handleChange}
              className="h-10 mr-6 w-full pl-2"
            >
              <option value="" className="mr-4">
                Select
              </option>
              {stateList &&
                stateList?.data?.map((item) => (
                  <option
                    key={item._id}
                    value={item.state_code}
                    // value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
            {<p className="text-red-600 text-xs">{errors.state?.message}</p>}
          </label>
          <label className="">
            <p className="inputlable">
              City <span className="requiredInput">*</span>
            </p>
            <select
              name="city"
              value={city}
              label="City"
              onKeyUp={handleValidation}
              onChange={handleChange}
              style={optionStyle}
              className="h-10 w-full pl-2"
            >
              <option value="">Select</option>
              {cityList?.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {<p className="text-red-600 text-xs">{errors.city?.message}</p>}
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Zip Code <span className="requiredInput">*</span>
            </p>
            <input
              name="ZipCode"
              type="text"
              className="h-[48px] rounded-sm"
              value={ZipCode}
              onKeyUp={handleValidation}
              onChange={handleChange}
              style={inputBoxStyle}
              onInput={handleKeyPress}
              placeholder="Enter Your Zip Code"
            />
            {<p className="text-red-600 text-xs">{errors.zipCode?.message}</p>}
          </label>
          <label className="inputlable ">
            <p className="inputlable">
              Designation <span className="requiredInput">*</span>
            </p>
            <select
              name="designation"
              value={designation}
              label="City"
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={optionStyle}
              className="h-10 w-full pl-2"
            >
              <option value="">Select</option>
              <option value="ceo">CEO</option>
              <option value="cofounder">CO-Founder</option>
              <option value="cofounder">Managing Director</option>

              {<p className="text-red-600">{errors.designation?.message}</p>}
            </select>
          </label>
        </div>
        <div className="flex justify-end w-full mt-5">
          <Button
            type="submit"
            text="Update Profile"
            className={`${
              isDark
                ? "btn bg-secondary-500 font-bold  text-black-500 mb-11"
                : "btn btn btn-dark"
            }   block text-center`}
          />
        </div>
      </form>
    </Card>
  );
};

export default EditProfile;
