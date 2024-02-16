import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Card from "@/components/ui/Card";
import useDarkMode from "@/hooks/useDarkMode";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { stateData } from "@/redux/slices/StateSlice";
const schema = yup
  .object({
    loanFormId: yup.string().required("Loan Foem ID is required"),
    firstName: yup.string().required("First Name is required").min(3),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    address: yup.string().required("Addresss is required"),
    fatherName: yup.string().required("Father Name is required").min(3),
    motherName: yup.string().required("Mother Name is required").min(3),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    maritalStatus: yup.string().required("Maritial Status is required"),
    optionalEmail: yup
      .string()
      .email("Invalid Email")
      .required("Optional Email is required"),
    emergencyPhone: yup.string().required("Emergency Phone Number is required"),
    phone: yup.string().required("Phone Number is required"),
    zipCode: yup.string().required("Zipcode is required").min(6),
    state: yup.string().required("State Name is required").min(3),
    city: yup.string().required("City Name is required").min(3),
    propertyOwnerShip: yup.string().required("Last Name is required"),
    jobTitle: yup.string().required("Last Name is required"),
    placeOfWork: yup.string().required("Last Name is required"),
    workAddress: yup.string().required("Last Name is required"),
    yearOfExperience: yup.string().required("Last Name is required"),
    monthlyNetIncome: yup.string().required("Last Name is required"),
    adharNumber: yup.string().required("Last Name is required"),
    panNumber: yup.string().required("Last Name is required"),
    voterNumber: yup.string().required("Last Name is required"),
    drivingLicenseNumber: yup.string().required("Last Name is required"),
  })
  .required();
const steps = [
  {
    id: 1,
    title: " Details",
    link: "/layout/first-form",
  },
  {
    id: 2,
    title: "Loan Details",
    link: "/layout/loan-Details",
  },
  {
    id: 3,
    title: "Applicant Personal Info",
    link: "/layout/applicant-info",
  },
  {
    id: 4,
    title: "Applicant Bank Info",
    link: "/layout/applicant-bank-info",
  },
  {
    id: 5,
    title: " Applicant Guarantor Info",
    link: "/layout/applicant-guarantor-info",
  },
  {
    id: 6,
    title: "Guarantor Identity Upload",
    link: "/layout/guarantor-identity-upload",
  },
  {
    id: 7,
    title: "Applicant Identity Upload",
    link: "/layout/applicant-identity-upload",
  },
  {
    id: 8,
    title: "Applicant Photo & Signature ",
    link: "/layout/applicant-photo-signature",
  },
  {
    id: 9,
    title: "Preview All Details ",
    link: "/layout/first-form",
  },
];

const ApplicantGuarantorInfo = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    loanFormId: "",
    firstName: "",
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
    propertyOwnerShip: "",
    jobTitle: "",
    placeOfWork: "",
    workAddress: "",
    yearOfExperience: "",
    monthlyNetIncome: "",
    adharNumber: "",
    panNumber: "",
    voterNumber: "",
    drivingLicenseNumber: "",
  });
  const [stepNumber, setStepNumber] = useState(4);

  const [cityList, setCityList] = useState();
  // ----destructuring form data-----
  const {
    loanFormId,
    firstName,
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
    propertyOwnerShip,
    jobTitle,
    placeOfWork,
    workAddress,
    yearOfExperience,
    monthlyNetIncome,
    adharNumber,
    panNumber,
    voterNumber,
    drivingLicenseNumber,
  } = formData;

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
  const onSubmit = () => {
    navigate("/layout/guarantor-identity-upload");
    setStepNumber((prev) => ({
      ...prev,
      prev: prev + 1,
    }));
  };
  const handleBack = () => {
    navigate("/layout/applicant-bank-info");
  };
  const handleClick = (item) => {
    navigate(item.link);
  };
  return (
    <div>
      <Card>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={stepNumber} alternativeLabel>
            {steps.map(
              (item) => (
                <Step key={item.id} onClick={() => handleClick(item)}>
                  <StepLabel>{item.title}</StepLabel>
                </Step>
              )
              // console.log(item)
            )}
          </Stepper>
        </Box>
        <form
          onSubmit={onSubmit}
          // encType="multipart/form-data"
        >
          <div
            className={`${
              isDark
                ? "bg-secondary-900 shadow-custom-DarkMode"
                : "form-body shadow-custom"
            } grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5  p-10 rounded-3xl `}
          >
            <label className=" rounded-sm">
              <p className="inputlable">
                Loan Form ID <span className="requiredInput">*</span>
              </p>
              <input
                name="loanFormId"
                type="text"
                className="rounded-sm form-control "
                value={loanFormId}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your loanFormId"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.loanFormId?.message}
                </p>
              }
            </label>
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
                placeholder="Enter Your First Name"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.firstName?.message}
                </p>
              }
            </label>

            <label className=" rounded-sm">
              <p className="inputlable">
                Last Name <span className="requiredInput">*</span>
              </p>

              <input
                name="lastName"
                label="lastName"
                type="test"
                className=" rounded-sm form-control"
                value={lastName}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Last Name"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.lastName?.message}
                </p>
              }
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
                type="test"
                className=" rounded-sm"
                value={motherName}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
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
                placeholder="Enter Your Contact Number"
              />
              {<p className="text-red-600 text-xs">{errors.phone?.message}</p>}
            </label>

            <label className=" rounded-sm">
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
            </label>

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
                {
                  <p className="text-red-600 text-xs">
                    {errors.gender?.message}
                  </p>
                }
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
                Optional Email <span className="requiredInput">*</span>
              </p>
              <input
                name="optionalEmail"
                type="email"
                className="h-[48px] rounded-sm"
                value={optionalEmail}
                onKeyUp={handleValidation}
                onChange={handleChange}
                style={inputBoxStyle}
                placeholder="Enter Your Optional Email"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.optionalEmail?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Emergency Contact Number{" "}
                <span className="requiredInput">*</span>
              </p>
              <input
                name="emergencyPhone"
                type="text"
                className="h-[48px] rounded-sm"
                value={emergencyPhone}
                onKeyUp={handleValidation}
                onChange={handleChange}
                style={inputBoxStyle}
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
              {
                <p className="text-red-600 text-xs">
                  {errors.address?.message}
                </p>
              }
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
                placeholder="Enter Your Zip Code"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.zipCode?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Property Owner Ship Name{" "}
                <span className="requiredInput">*</span>
              </p>
              <input
                name="propertyOwnerShip"
                type="text"
                className="rounded-sm form-control "
                value={propertyOwnerShip}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Property Owner Ship Name"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.propertyOwnerShip?.message}
                </p>
              }
            </label>

            <label className=" rounded-sm">
              <p className="inputlable">
                Job Title <span className="requiredInput">*</span>
              </p>

              <input
                name="jobTitle"
                type="text"
                className=" rounded-sm form-control"
                value={jobTitle}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Job Title"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.jobTitle?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Place Of Work <span className="requiredInput">*</span>
              </p>
              <input
                name="placeOfWork"
                type="text"
                className="rounded-sm"
                value={placeOfWork}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Place Of Work"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.placeOfWork?.message}
                </p>
              }
            </label>

            <label className=" rounded-sm">
              <p className="inputlable">
                Work Address <span className="requiredInput">*</span>
              </p>

              <input
                name="workAddress"
                // label="lastName"
                type="text"
                className=" rounded-sm"
                value={workAddress}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Work Address"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.workAddress?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Year Of Experience <span className="requiredInput">*</span>
              </p>
              <input
                name="yearOfExperience"
                type="text"
                className=" rounded-sm"
                value={yearOfExperience}
                onChange={handleChange}
                style={inputBoxStyle}
                onKeyUp={handleValidation}
                placeholder="Enter Your Year Of Experience"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.yearOfExperience?.message}
                </p>
              }
            </label>

            <label className=" rounded-sm">
              <p className="inputlable">
                Monthly Net Income <span className="requiredInput">*</span>
              </p>

              <input
                name="monthlyNetIncome"
                type="text"
                className=" rounded-sm"
                value={monthlyNetIncome}
                onChange={handleChange}
                style={inputBoxStyle}
                onKeyUp={handleValidation}
                placeholder="Enter Your Monthly Net Income"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.monthlyNetIncome?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                adharNumber <span className="requiredInput">*</span>
              </p>
              <input
                name="adharNumber"
                type="number"
                className="rounded-sm form-control "
                value={adharNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Adhar Number"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.adharNumber?.message}
                </p>
              }
            </label>

            <label className=" rounded-sm">
              <p className="inputlable">
                panNumber <span className="requiredInput">*</span>
              </p>

              <input
                name="panNumber"
                type="number"
                className=" rounded-sm form-control"
                value={panNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Pan Number "
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.panNumber?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Voter Number <span className="requiredInput">*</span>
              </p>
              <input
                name="voterNumber"
                type="text"
                className="rounded-sm"
                value={voterNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Voter Number"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.voterNumber?.message}
                </p>
              }
            </label>

            <label className=" rounded-sm">
              <p className="inputlable">
                Driving License Number <span className="requiredInput">*</span>
              </p>

              <input
                name="drivingLicenseNumber"
                type="text"
                className=" rounded-sm"
                value={drivingLicenseNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Driving License Number"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.drivingLicenseNumber?.message}
                </p>
              }
            </label>
          </div>
          <div className="flex justify-between m-5">
            <div>
              <Button
                type="button"
                text="prev"
                onClick={handleBack}
                className={`${
                  isDark
                    ? "btn bg-primary-200 font-bold  text-black-500 "
                    : "btn btn-dark"
                }  flex text-center `}
              />
            </div>
            <div>
              <Button
                type="submit"
                text="Next"
                className={`${
                  isDark
                    ? "btn bg-primary-200 font-bold  text-black-500 "
                    : "btn btn-dark"
                }  flex text-center `}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ApplicantGuarantorInfo;
