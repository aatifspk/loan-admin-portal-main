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

const schema = yup
  .object({
    loanFormId: yup.string().required("Loan Form Id is required"),
    userId: yup.string().required("User Id is required"),
    bankName: yup.string().required("Bank Name is required"),
    branchName: yup.string().required("Branch Name is required"),
    accountType: yup.string().required("Account Type is required"),
    accountNumber: yup.string().required("Account Number is required"),
    ifscCode: yup.string().required("IFSC Code is required"),
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

const ApplicantIdentity = () => {
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
  const [image, setImage] = useState({
    adharFrontImage: "",
    adharBackImage: "",
    panFrontImage: "",
    panBackImage: "",
    voterFrontImage: "",
    voterBackImage: "",
    drivingLicenceFrontImage: "",
    drivingLicenceBackImage: "",
  });
  const [preview, setPreview] = useState({
    adharFrontImagePreview: "",
    adharBackImagePreview: "",
    panFrontImagePreview: "",
    panBackImagePreview: "",
    voterFrontImagePreview: "",
    voterBackImagePreview: "",
    drivingLicenceFrontImagePreview: "",
    drivingLicenceBackImagePreview: "",
  });
  const [stepNumber, setStepNumber] = useState(6);

  const [formData, setFormData] = useState({
    adharNumber: "",
    panNumber: "",
    voterNumber: "",
    drivingLicenceNumber: "",
  });
  const { adharNumber, panNumber, voterNumber, drivingLicenceNumber } =
    formData;
  const {
    adharFrontImage,
    adharBackImage,
    panFrontImage,
    panBackImage,
    voterFrontImage,
    voterBackImage,
    drivingLicenceFrontImage,
    drivingLicenceBackImage,
  } = image;
  const {
    adharFrontImagePreview,
    adharBackImagePreview,
    panFrontImagePreview,
    panBackImagePreview,
    voterFrontImagePreview,
    voterBackImagePreview,
    drivingLicenceFrontImagePreview,
    drivingLicenceBackImagePreview,
  } = preview;
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const onSubmit = () => {
    navigate("/layout/applicant-photo-signature");
    setStepNumber((prev) => ({
      ...prev,
      prev: prev + 1,
    }));
  };
  const handleBack = () => {
    navigate("/layout/guarantor-identity-upload");
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
        <form onSubmit={onSubmit}>
          <div
            className={`${
              isDark
                ? "bg-secondary-900 shadow-custom-DarkMode"
                : "form-body shadow-custom"
            } grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5  p-10 rounded-3xl `}
          >
            <div>
              <label>
                <input
                  type="file"
                  name="adharFrontImage"
                  value={adharFrontImage}
                  // onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  // error={errors.avatar}
                />
                {adharFrontImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={adharFrontImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="file"
                  name="adharBackImage"
                  value={adharBackImage}
                  //   onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  //   error={errors.avatar}
                />
                {adharBackImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={adharBackImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <label className=" rounded-sm">
              <p className="inputlable">
                Adhar Number<span className="requiredInput">*</span>
              </p>
              <input
                name="adharNumber"
                type="text"
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
            <div className="flex justify-end w-full mt-5">
              <Button
                type="button"
                text="Upload"
                //   onClick={handleAdhar}
                className={`${
                  isDark
                    ? "btn bg-secondary-500 font-bold  text-black-500 mb-11"
                    : "btn btn btn-dark"
                }   block text-center`}
              />
            </div>
            {/*----------------- PAN ------- */}
            <div>
              <label>
                <input
                  type="file"
                  name="panFrontImage"
                  value={panFrontImage}
                  // onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  // error={errors.avatar}
                />
                {panFrontImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={panFrontImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="file"
                  name="panBackImage"
                  value={panBackImage}
                  //   onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  //   error={errors.avatar}
                />
                {panBackImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={panBackImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <label className=" rounded-sm">
              <p className="inputlable">
                Pan Number<span className="requiredInput">*</span>
              </p>
              <input
                name="panNumber"
                type="text"
                className="rounded-sm form-control "
                value={panNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Pan Number"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.panNumber?.message}
                </p>
              }
            </label>
            <div className="flex justify-end w-full mt-5">
              <Button
                type="button"
                text="Upload"
                //   onClick={handleAdhar}
                className={`${
                  isDark
                    ? "btn bg-secondary-500 font-bold  text-black-500 mb-11"
                    : "btn btn btn-dark"
                }   block text-center`}
              />
            </div>
            {/* ----------------Voter---------------------- */}
            <div>
              <label>
                <input
                  type="file"
                  name="voterFrontImage"
                  value={voterFrontImage}
                  // onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  // error={errors.avatar}
                />
                {voterFrontImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={voterFrontImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="file"
                  name="voterBackImage"
                  value={voterBackImage}
                  //   onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  //   error={errors.avatar}
                />
                {voterBackImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={voterBackImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <label className=" rounded-sm">
              <p className="inputlable">
                Voter Number<span className="requiredInput">*</span>
              </p>
              <input
                name="voterNumber"
                type="text"
                className="rounded-sm form-control "
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
            <div className="flex justify-end w-full mt-5">
              <Button
                type="button"
                text="Upload"
                //   onClick={handleAdhar}
                className={`${
                  isDark
                    ? "btn bg-secondary-500 font-bold  text-black-500 mb-11"
                    : "btn btn btn-dark"
                }   block text-center`}
              />
            </div>
            {/*-------------------- Driving Licence ---------------- */}
            <div>
              <label>
                <input
                  type="file"
                  name="drivingLicenceFrontImage"
                  value={drivingLicenceFrontImage}
                  // onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  // error={errors.avatar}
                />
                {drivingLicenceFrontImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={drivingLicenceFrontImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <div>
              <label>
                <input
                  type="file"
                  name="drivingLicenceBackImage"
                  value={drivingLicenceBackImage}
                  //   onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  //   error={errors.avatar}
                />
                {drivingLicenceBackImagePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={drivingLicenceBackImagePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
            <label className=" rounded-sm">
              <p className="inputlable">
                Driving Licence Number<span className="requiredInput">*</span>
              </p>
              <input
                name="drivingLicenceNumber"
                type="text"
                className="rounded-sm form-control "
                value={drivingLicenceNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Driving Licence Number"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.drivingLicenceNumber?.message}
                </p>
              }
            </label>
            <div className="flex justify-end w-full mt-5">
              <Button
                type="button"
                text="Upload"
                //   onClick={handleAdhar}
                className={`${
                  isDark
                    ? "btn bg-secondary-500 font-bold  text-black-500 mb-11"
                    : "btn btn btn-dark"
                }   block text-center`}
              />
            </div>
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

export default ApplicantIdentity;
