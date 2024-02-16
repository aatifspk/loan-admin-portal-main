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

const ApplicantBankInfo = () => {
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
  const [stepNumber, setStepNumber] = useState(3);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    loanFormId: "",
    userId: "",
    bankName: "",
    branchName: "",
    accountType: "",
    accountNumber: "",
    ifscCode: "",
  });
  const {
    loanFormId,
    userId,
    bankName,
    branchName,
    accountType,
    accountNumber,
    ifscCode,
  } = formData;
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
    navigate("/layout/applicant-guarantor-info");
    setStepNumber((prev) => ({
      ...prev,
      prev: prev + 1,
    }));
  };
  const handleBack = () => {
    navigate("/layout/applicant-info");
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
                placeholder="Enter Your Loan Form Id"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.loanFormId?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                User ID <span className="requiredInput">*</span>
              </p>
              <input
                name="userId"
                type="text"
                className="rounded-sm form-control "
                value={userId}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your User Id"
              />
              {<p className="text-red-600 text-xs">{errors.userId?.message}</p>}
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Bank Name <span className="requiredInput">*</span>
              </p>
              <input
                name="bankName"
                type="text"
                className="rounded-sm form-control "
                value={bankName}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Bank Name"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.bankName?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Branch Name <span className="requiredInput">*</span>
              </p>
              <input
                name="branchName"
                type="text"
                className="rounded-sm form-control "
                value={branchName}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Branch Name"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.branchName?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Account Type <span className="requiredInput">*</span>
              </p>
              <select
                name="accountType"
                value={accountType}
                onKeyUp={handleValidation}
                style={optionStyle}
                onChange={handleChange}
                className="h-10 mr-6 w-full pl-2"
              >
                <option value="saving">Saving</option>
                <option value="current">Current</option>
                <option value="">Saving</option>
              </select>
              {
                <p className="text-red-600 text-xs">
                  {errors.accountType?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                Account Number <span className="requiredInput">*</span>
              </p>
              <input
                name="accountNumber"
                type="text"
                className="rounded-sm form-control "
                value={accountNumber}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Account Number"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.accountNumber?.message}
                </p>
              }
            </label>
            <label className=" rounded-sm">
              <p className="inputlable">
                ifscCode <span className="requiredInput">*</span>
              </p>
              <input
                name="ifscCode"
                type="text"
                className="rounded-sm form-control "
                value={ifscCode}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your IFSC Code"
              />
              {
                <p className="text-red-600 text-xs">
                  {errors.ifscCode?.message}
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

export default ApplicantBankInfo;
