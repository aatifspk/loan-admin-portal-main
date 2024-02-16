import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import InputGroup from "@/components/ui/InputGroup";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useDarkMode from "@/hooks/useDarkMode";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { useSelector } from "react-redux";
import Radio from "@/components/ui/Radio";
import { toast } from "react-toastify";

import loanFormService from "@/newServices/loan-service";
import { useDispatch } from "react-redux";

import { setLoanForm, removeLoanForm } from "@/redux/ApplyLoan/loanFormSclice";




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


const LoanForm = (props) => {
  sessionStorage.setItem("alreadyGotStep", false)

  const [isDark] = useDarkMode();

  const { data: loanData, isLoanData: isExist } = useSelector((state) => state.LoanDetail);
  const { data: loandForm, isLoanForm: isLoanExist } = useSelector((state) => state.LoanFormDetail);
  const store  = useSelector((state) => state);

  console.log("tttt",loanData);
  

  const [stepNumber, setStepNumber] = useState(1);
  const [loanDetail, setLoanDetail] = useState(null)
  const [formData, setFormData] = useState({});

  // console.log("formData",formData);

  console.log("store22",store);


  const optionStyle = {
    backgroundColor: isDark
      ? "#0F172A"
      : "rgb(235,240,245 / var(--tw-bg-opacity))",
    border: isDark ? "1px solid white" : "1.5px solid #ad9f9fa8",
  };

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



  // --- handle input change---

  function handleChange(e) {

    const { name, value } = e.target;

    if (name == "amountDisburse") {

      if(value){
        const processingFeeAmount = ((loanDetail?.processFeePercent / 100) * value).toFixed(2);
        const amountSanctioned = value - processingFeeAmount;
        const onedayInterest = (loanDetail?.rateOfInterest / 100) * value;
        const fullAmount = onedayInterest * loanDetail?.NoOfEmi

        setFormData({ ...formData, [name]: value !== "" ? Number(value) : "", ["processingFeeAmount"]: Number(processingFeeAmount), ["amountSanctioned"]: Number(amountSanctioned), ["emiAmount"]: Number(fullAmount) })
      }else{
        setFormData({ ...formData, [name]: value , ["processingFeeAmount"]: "", ["amountSanctioned"]: "", ["emiAmount"]:"" })
      }

    }

  }



  // ----Handling Validation -------
  const handleValidation = (e) => {
    const { name, value } = e.target;

  };




  const navigate = useNavigate();
  const dispatch = useDispatch()


  // const onSubmit = () => {
  //   navigate("/layout/applicant-info");
  //   setStepNumber((prev) => ({
  //     ...prev,
  //     prev: prev + 1,
  //   }));
  // };


  const handleBack = () => {
    navigate("/layout/first-form");
  };

  const handleClick = (item) => {
    navigate(item.link);
  };

  async function handleSubmit() {

    let errorCount = 0;

    if (!formData?.amountDisburse || formData?.amountDisburse == "") {
      errorCount++
      toast.warning("Please fill Amount Disburse!")
    }

    if (errorCount == 0) {


      if(isLoanExist){



        const formId = loandForm?._id;

        const response = await loanFormService.editLoanForm(formId, formData );
        console.log("response two", response);

        dispatch(setLoanForm({...response?.data?.data, trackingdata : response?.data?.trackingdata }));

        navigate("/layout/applicant-info")





      }else{


        const formdataObject = {
          ...formData, userId: loanData?.clientData?._id, loanName: loanData?.loanData?.productName, rateOfInterest: loanData?.loanData?.rateOfInterest, rateTyep: loanData?.loanData?.rateTyep, recoveryType: loanData?.loanData?.recoveryType, processingFeePercent: loanData?.loanData?.processFeePercent, NoOfEmi: loanData?.loanData?.NoOfEmi, productId : loanData?.loanData?._id
  
        };

        console.log('formdataObject', formdataObject);

        const response = await loanFormService.submitLoanForm(formdataObject);
        dispatch(setLoanForm({...response?.data?.loanForm, trackingdata : response?.data?.trackingdata}  ))
        navigate("/layout/applicant-info")
        console.log("response one", response);
  

      }

     

     


    } else {
      return
    }


  }


  useEffect(() => {

    if (loanData) {
      setLoanDetail(loanData?.loanData)
    }

  }, [loanData]);

  useEffect(() => {

    if (loandForm) {
      const { createdAt, deletedAt, _id, __v,  userId, loanId, ...rest} = loandForm
      console.log("loandForm 111", rest);

      setFormData(rest)
    }

  }, [loandForm])


  function clearForm () {
    dispatch(removeLoanForm())

  }



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
        <form >
          <div
            className={`${isDark
              ? "bg-secondary-900 shadow-custom-DarkMode"
              : "form-body shadow-custom"
              } grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5  p-10 rounded-3xl `}
          >

            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Loan Name <span className="requiredInput">*</span>
              </p>
              <input
                name="loanName"
                type="text"
                className=" rounded-sm"
                value={loanDetail?.productName}
                disabled
                style={inputBoxStyle}
                placeholder="Enter Your Email"
              />
            </label>

            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Rate Of Interest<span className="requiredInput">*</span>
              </p>
              <input
                name="rateOfInterest"
                type="number"
                className=" rounded-sm"
                value={loanDetail?.rateOfInterest}
                style={inputBoxStyle}
                disabled
                placeholder="Enter Your Amount Sanctioned"
              />
            </label>


            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Amount Disburse <span className="requiredInput">*</span>
              </p>
              <input
                name="amountDisburse"
                type="number"
                className=" rounded-sm"
                value={formData?.amountDisburse}
                onChange={handleChange}
                onKeyUp={handleValidation}
                style={inputBoxStyle}
                placeholder="Enter Your Email"
              />
            </label>


            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Processing Fee Percent <span className="requiredInput">*</span>
              </p>
              <input
                name="processingFeePercent"
                type="number"
                className=" rounded-sm"
                value={loanDetail?.processFeePercent}
                style={inputBoxStyle}
                disabled
                placeholder="Enter Your Processing Fee Percent"
              />
              {
                <p className="text-red-600">
                </p>
              }
            </label>

            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Processing Fee Amount <span className="requiredInput">*</span>
              </p>
              <input
                name="processingFeeAmount"
                type="number"
                className=" rounded-sm"
                disabled
                value={JSON.stringify(formData) !== "{}" && formData?.amountDisburse && formData?.processingFeeAmount ? formData?.processingFeeAmount : ""}
                style={inputBoxStyle}
                placeholder="Your Processing Fee Amount Is ?"
              />
              {
                <p className="text-red-600">
                </p>
              }
            </label>

            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Amount Sanctioned<span className="requiredInput">*</span>
              </p>
              <input
                name="amountSanctioned"
                type="number"
                className=" rounded-sm"
                value={JSON.stringify(formData) !== "{}" && formData?.amountDisburse && formData?.amountSanctioned ? formData?.amountSanctioned : ""}
                disabled
                style={inputBoxStyle}
                placeholder="Your Sanctioned Amount Is ?"
              />
              {
                <p className="text-red-600">
                </p>
              }
            </label>
            <label className="inputlable">
              <p className="inputlable">
                No of EMI <span className="requiredInput">*</span>
              </p>
              <input
                name="NoOfEmi"
                type="number"
                className=""
                value={loanDetail?.NoOfEmi}
                style={inputBoxStyle}
                disabled
                placeholder="Enter Your No of Emi"
              />
            </label>
            <label className="inputlable">
              <p className="inputlable">
                EMI Amount <span className="requiredInput">*</span>
              </p>
              <input
                name="emiAmount"
                type="number"
                className=""
                value={JSON.stringify(formData) !== "{}" && formData?.amountDisburse && formData?.emiAmount ? formData?.emiAmount : ""}
                style={inputBoxStyle}
                disabled
                placeholder="Enter Your Emi Amount"
              />
            </label>
            <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
              <label htmlFor="rateTyep"
                // className={`${formdDataError?.rateTyep ? "radioErrStyle" : ""}`} 
                style={{ marginTop: "-10px" }}>
                Rate Of Interest Type : {" " + loanDetail?.rateTyep}
              </label>

            </div>

            <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
              <label htmlFor="recoveryType"
                //  className={`${formdDataError?.recoveryType ? "radioErrStyle" : ""}`}
                style={{ marginTop: "-10px" }}>
                Recovery Type: {`${loanDetail?.recoveryType} `}
              </label>
            </div>

          </div>
          <div className="flex justify-between m-5">
            <div>
              <Button
                type="button"
                text="prev"
                onClick={handleBack}
                className={`${isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 "
                  : "btn btn-dark"
                  }  flex text-center `}
              />
            </div>
            <div>
              <Button
                // type="submit"
                onClick={handleSubmit}
                text="Next"
                className={`${isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 "
                  : "btn btn-dark"
                  }  flex text-center `}
              />
            </div>
          </div>
        </form>
        <button onClick={clearForm}>Clear</button>

      </Card>
    </div>
  );
};

export default LoanForm;
