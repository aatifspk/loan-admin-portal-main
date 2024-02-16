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
import { useNavigate } from "react-router-dom";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { client } from "@/redux/slices/Client/Client";
import LoanForm from "./LoanForm";


import newClientService from "@/newServices/clientsList-service";
import newProductService from "@/newServices/productList-service";

import { setLoanData } from "@/redux/slices/applicantLoanSclice";
import { data } from "autoprefixer";



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
const schema = yup
  .object({
    userList: yup.string().required("User Name is required"),
    loanDetails: yup.string().required("Loan Name is required"),
  })
  .required();

const FirstForm = () => {


  const [isDark] = useDarkMode();



  const optionStyle = {
    backgroundColor: isDark
      ? "#0F172A"
      : "rgb(235,240,245 / var(--tw-bg-opacity))",
    border: isDark ? "1px solid white" : "1.5px solid #ad9f9fa8",
  };
  const [stepNumber, setStepNumber] = useState(0);

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [chosenClient, setChosenClient] = useState(null);
  const [chosenProduct, setChosenProduct] = useState(null);

  const {data : loanData  , isLoanData : isExist } = useSelector((state) => state.LoanDetail);
  const { data: loandForm, isLoanForm: isLoanExist } = useSelector((state) => state.LoanFormDetail);


  console.log("chosenClient", chosenClient);
  console.log("chosenProduct", chosenProduct);
  console.log("loanData",loanData);

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   watch,
  // } = useForm({
  //   resolver: yupResolver(schema),
  //   // keep watch on all fields
  //   mode: "all",
  // // });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { clientList } = useSelector((state) => state.Client);
  //------------- creating Form Data-----------
  const [formData, setFormData] = useState({});
  // const { userList, loanDetails } = formData;
  // ----handling the input box -----
  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("name", name);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name == "userId") {
      const clinetDetail = clients.find((item) => item._id == value);

      if (clinetDetail) {
        setChosenClient(clinetDetail)
      }
    } else if (name == "productId") {
      const productDetail = products.find((item) => item._id == value);

      if (productDetail) {
        setChosenProduct(productDetail)
      }
    }





  };

  // ----Handling Validation -------
  // const handleValidation = (e) => {
  //   const { name, value } = e.target;
  //   // schema
  //   //   .validateAt(name, { [name]: value })
  //   //   .then(() => {
  //   //     clearErrors(name);
  //   //   })
  //   //   .catch((error) => {
  //   //     setError(name, { type: "manual", message: error.message });
  //   //   });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   let errorCount;
  //   if (!userList || !loanDetails) {
  //     errorCount++;
  //     toast.warn("All Fields Are Required");
  //     return;
  //   }
    // navigate("/layout/loan-Details", {
    //   state: { userList, loanDetails },
    // });
  //   setStepNumber((prev) => ({
  //     ...prev,
  //     prev: prev + 1,
  //   }));
  // };

  useEffect(() => {
    // dispatch(client());

    async function getClients() {

      try {
        const response = await newClientService.getActiveUndeletedClinets();
        const clientList = response.data.data;
        if (clientList.length !== 0) {
          setClients(clientList)
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }

    async function getProduct() {

      try {
        const response = await newProductService.getAllActiveUndeletedProduct();

        console.log("response", response.data.data);
        const productList = response.data.data;
        if (productList.length !== 0) {
          setProducts(productList)
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }

    getClients()
    getProduct()



  }, []);

  const handleClick = (item) => {
    navigate(item.link);
  };

  function handleSubmit(e){

    e.preventDefault();

    dispatch(setLoanData({clientData :chosenClient, loanData : chosenProduct }))

    navigate(`/layout/loan-Details`);


  }


  useEffect(() => {

    if(loanData){


      setChosenClient(loanData?.clientData);
      setChosenProduct(loanData?.loanData);

      setFormData({userId : loanData?.clientData?._id , productId : loanData?.loanData?._id })

    }

  },[loanData]);


  // useEffect(() => {


  //   if(loandForm){

  //     const stepAt = loandForm?.trackingdata?.stepAt;

  //     if(stepAt){

  //       const stepOn =  sessionStorage.getItem("alreadyGotStep")

  //       if(stepAt == 1 && stepOn){
  //         navigate(`/layout/loan-Details`);
  //       }

  //     }

  //   }



  // },[])


  return (
    <div>
      <Card>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={stepNumber} alternativeLabel>
            {steps.map((item) => (
              <Step key={item.id} onClick={() => handleClick(item)}>
                <StepLabel>{item.title}</StepLabel>
              </Step>
            ))}
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
                User Name <span className="requiredInput">*</span>
              </p>
              <select
                value={formData?.userId}
                name="userId"
                onChange={handleChange}
                // onKeyUp={handleValidation}
                style={optionStyle}
                className="h-10 mr-6 w-full pl-2"
              >
                <option value="">Select User</option>
                {clients.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.firstName + " " + item.lastName}
                  </option>
                ))}
              </select>
            </label>

            <label className="inputlable rounded-sm">
              <p className="inputlable">
                Loan Details <span className="requiredInput">*</span>
              </p>
              <select
                value={formData?.productId}
                name="productId"
                onChange={handleChange}
                // onKeyUp={handleValidation}
                style={optionStyle}
                className="h-10 mr-6 w-full pl-2"
              >
                <option value="">Select User</option>
                {products.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.productName}
                  </option>
                ))}
              </select>
            </label>

            {
              chosenClient && (

                <div className="grid xl:grid-cols-2 md:grid-cols-1 rounded-3xl gap-6 bg-black-00">
                  <div className="m-6">
                    <p className="mb-2  font-bold text-1xl">Client Details</p>{" "}
                    <p className="mb-1 font-bold">
                      Full Name:
                      <span className="font-normal capitalize">{" " + chosenClient?.firstName + " " + chosenClient?.lastName}</span>
                    </p>
                    <p className="mb-1 font-bold">
                      Full Name:
                      <span className="font-normal capitalize">{" " + chosenClient?.firstName + " " + chosenClient?.lastName}</span>
                    </p>

                  </div>

                </div>

              )
            }

            {
              chosenProduct && (

                <div className="grid xl:grid-cols-2 md:grid-cols-1 rounded-3xl gap-6 bg-black-00">
                  <div className="m-6">
                    <p className="mb-2  font-bold text-1xl">Loan Details</p>{" "}
                    <p className="mb-1 font-bold">
                      Loan Name:
                      <span className="font-normal capitalize">{" " + chosenProduct?.productName}</span>
                    </p>
                  </div>

                </div>

              )
            }

          </div>
          <div className="flex justify-end w-full mt-5">
            <Button
              text="Next"
              onClick={handleSubmit}
              className={`${isDark
                ? "btn bg-primary-200 font-bold  text-black-500 "
                : "btn btn-dark"
                }  flex text-center `}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FirstForm;
