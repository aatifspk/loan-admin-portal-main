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

const ApplicantPhotoAndSignature = () => {
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
  // ------Handling the change in a input ------

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [stepNumber, setStepNumber] = useState(7);

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
  const [image, setImage] = useState({
    photo: "",
    signature: "",
  });
  const [preview, setPreview] = useState({
    photoPreview: "",
    signaturePreview: "",
  });
  const { photo, signature } = image;
  const { photoPreview, signaturePreview } = preview;
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/layout/applicant-photo-signature");
    setStepNumber((prev) => ({
      ...prev,
      prev: prev + 1,
    }));
  };
  const handleBack = () => {
    navigate("/layout/guarantor-identity-upload");
    console.log("clicked");
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
                  name="photo"
                  value={photo}
                  // onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  // error={errors.avatar}
                />
                {photoPreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={photoPreview}
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
                  name="signature"
                  value={signature}
                  //   onChange={handleAvatar}
                  accept="image/png, image/jpeg"
                  className="opacity-0 rounded-full border border-secondary-400 h-[100px] w-[100px] flex justify-center items-center text-center right-5"
                  // register={register}
                  //   error={errors.avatar}
                />
                {signaturePreview && (
                  <div>
                    <input
                      type="image"
                      //   className="avatarPreview"
                      src={signaturePreview}
                      alt="preview"
                      //   onClick={handleRemoveAvatar}
                    />
                  </div>
                )}
                {/* {<p className="text-red-600">{profileImageErr}</p>} */}
              </label>
            </div>
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

export default ApplicantPhotoAndSignature;
