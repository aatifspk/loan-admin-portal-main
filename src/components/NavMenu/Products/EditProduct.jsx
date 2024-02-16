import React, { useEffect, useState, useTransition } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "@/components/ui/Select";
import { Label } from "recharts";
import "@/assets/scss/common.scss";
import { stateData } from "@/redux/slices/StateSlice";
import { addBranch } from "@/redux/slices/AddBranchSlice";
import useDarkMode from "@/hooks/useDarkMode";
import { branch } from "@/redux/slices/BranchSlice";
import { editAgent } from "@/redux/slices/Agent/EditAgent";
import { addAgent } from "@/redux/slices/Agent/AddAgent";
import { viewAgent } from "@/redux/slices/Agent/ViewAgent";
import { viewClient } from "@/redux/slices/Client/ViewClient";
import { addClient } from "@/redux/slices/Client/AddClient";
import { viewEmployee } from "@/redux/slices/Employee/ViewEmployee";
import { addEmployee } from "@/redux/slices/Employee/AddEmployee";
import Card from "@/components/ui/Card";
import { product } from "@/redux/slices/Products/Products";
import { addProduct } from "@/redux/slices/Products/AddProduct";
import { viewProduct } from "@/redux/slices/Products/ViewProduct";

import newProductService from "@/newServices/new-Product-service";
import Flatpickr from "react-flatpickr";
import Radio from "@/components/ui/Radio";
import Icon from "@/components/ui/Icon";

import "../../../assets/scss/common.css"





// const rateTyepList= [
//   { value: "day", label: "DAY" },
//   { value: "week", label: "WEEK" },
//   { value: "month", label: "MONTH" },
//   { value: "year", label: "YEAR" }
// ];


const rateTyepList = [

  {
    value: "day",
    label: "Day",
    activeClass: "ring-primary-500 border-primary-500",
  },
  {
    value: "week",
    label: "Week",
    activeClass: "ring-primary-500 border-primary-500",
  },
  {
    value: "month",
    label: "Month",
    activeClass: "ring-primary-500 border-primary-500",
  },
  {
    value: "year",
    label: "Year",
    activeClass: "ring-primary-500 border-primary-500",
  },

];



const processChargeIncludeArray = [
  {
    value: "yes",
    label: "YEs",
    activeClass: "ring-danger-500 border-danger-500",
  },
  {
    value: "no",
    label: "NO",
    activeClass: "ring-primary-500 border-primary-500",
  },

];


const productStatusArray = [
  {
    value: "active",
    label: "Active",
    activeClass: "ring-primary-500 border-primary-500",
  },
  {
    value: "inactive",
    label: "Inactive",
    activeClass: "ring-danger-500 border-danger-500",
  },

];



const schema = yup
  .object({
    branchVisibleName: yup.string().required("Branch Visible Name is required"),
    branchName: yup.string().required("Branch Name is required"),
    branchCode: yup.string().required("Branch Code is required"),
    pinCode: yup.string().required("pin Code is required"),
    openingDate: yup.string().required("opening Date is required"),
    contactEmail: yup.string().required("Email is required"),
    landlineNumber: yup.string().required("Landline Number is required"),
    phone: yup.string().required("Phone Number is required"),
    city: yup.string().required("City Name is required"),
    state: yup.string().required("State Name is required"),
    country: yup.string().required("Country Name is required"),
    address: yup.string().required("Address is required"),
    locality: yup.string().required("Locality is required"),
    GSTIN: yup.string().required("GSTIN is required"),
  })
  .required();
const EditProductForm = () => {

  const [Login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const location = useLocation();

  const productId = location?.state?.id;

  const [producFormtData, setProducFormtData] = useState(null);
  const [formdDataError, setFormDataError] = useState({})
  const [loading, setLoading] = useState(false);
  const [introducedDate, setIntroducedDate] = useState(null);



  console.log("formdDataError", formdDataError);
  console.log("producFormtData", producFormtData);








  const [recoveryTyepList, setRecoveryTyepList] = useState([
    { value: "day", label: "DAY" },
    { value: "week", label: "WEEK" },
    { value: "month", label: "MONTH" },
    { value: "year", label: "YEAR" }
  ]);

  // console.log("productId",productId);


  useEffect(() => {
    if (productId) {
      async function getParticularProduct() {
        try {
          const response = await newProductService.getParticularProduct(productId);
          let dataObject = response.data.data[0];

          if (dataObject) {
            const propertiesToTransform = [
              'processChargeInclude',
              'holidayExclude',
              'gstchargeInclude',
              'aharRequired',
              'panRequired',
              'voterRequired',
              'drivingLicenseRequired',
              'aharMandatory',
              'panMandatory',
              'voterMandatory',
              'drivingLicenseMandatory'
            ];

            propertiesToTransform.forEach(property => {
              dataObject[property] = dataObject[property] ? 'yes' : 'no';
            });
          }


          if (dataObject?.intoducedDate) {

            setIntroducedDate(dataObject?.intoducedDate)

          }

          if (dataObject?.productStatus) {
            dataObject["productStatus"] = "active"
          } else {
            dataObject["productStatus"] = "inactive"
          }

          const { _id, __v, createdAt, deletedAt, ...rest } = dataObject

          setProducFormtData(rest);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      getParticularProduct();
    }
  }, [productId]);

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
  const [isDark] = useDarkMode();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    dispatch(product());
  }, [dispatch]);
  const { branchList } = useSelector((state) => state.branchSlice);

  // ----Adding style in input ----
  const inputBoxStyle = {
    backgroundColor: isDark
      ? "#0F172A"
      : "rgb(221 214 254 / var(--tw-bg-opacity))",
    //
    width: "100%",
    padding: "12px 14px",
    border: isDark ? "1px solid white" : "1px solid black",
  };
  const optionStyle = {
    backgroundColor: isDark
      ? "#0F172A"
      : "rgb(221 214 254 / var(--tw-bg-opacity))",
    border: isDark ? "1px solid white" : "1px solid black",
  };
  // ----creating form data -----
  const [formData, setFormData] = useState({
    branchId: "",
    firstName: "",
    lastName: "",
    password: "",
    roleId: 3,
    email: "",
    create: false,
    phone: "",
    city: "",
    state: "",
  });
  // ----destructuing form data --------
  const {
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
  } = formData;
  // ------setting default value ----
  //   useEffect(() => {
  //     if (data.data.data[0] && data?.data?.data[0]) {
  //       setFormData((prev) => ({
  //         // ...prev,
  //         branchId: data?.data?.data[0]?.branchId,
  //         firstName: data?.data?.data[0]?.firstName,
  //         lastName: data?.data?.data[0]?.lastName,
  //         password: data?.data?.data[0]?.password,
  //         roleId: data?.data?.data[0]?.roleId,
  //         email: data?.data?.data[0]?.email,
  //         phone: data?.data?.data[0]?.phone,
  //         city: data?.data?.data[0]?.city,
  //         state: data?.data?.data[0]?.state,
  //       }));
  //     }
  //   }, []);
  // ----handling the change in input box -----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ---------------- Handling Validation -----------
  // const handleValidation = (e) => {
  //   const { name, value } = e.target;
  //   schema
  //     .validateAt(name, { [name]: value })
  //     .then(() => {
  //       clearErrors(name);
  //     })
  //     .catch((error) => {
  //       setError(name, { type: "manual", message: error.message });
  //     });
  // };
  //   const AddBranchData = useSelector((state) => state.addBranchSlice);
  // -----creating brach data object --------
  //   const id = data.data.data._id;
  const productData = {
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
  // -------submiting the form ---------
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let errorCount = 0;
    // ----applying the validation --------
    if (
      !branchId ||
      !firstName ||
      !lastName ||
      !password ||
      !roleId ||
      !email ||
      // !create ||
      !phone ||
      !city ||
      !state
    ) {
      // console.log(object);
      errorCount++;
      toast.warn("All Fields are Required");
      return;
    }

    if (errorCount === 0) {
      dispatch(addProduct(productData))
        .then((res) => {
          console.log(res);
          toast.success(res.payload.data.message);
          navigate("/layout/employees");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  useEffect(() => {
    dispatch(viewProduct(productId));
  }, []);

  //Handling State
  useEffect(() => {
    dispatch(stateData());
  }, [state]);
  //Handling Cities after state change
  useEffect(() => {
    if (state.length)
      axios
        .get(`http://localhost:8080/api/getCities/${state}`)
        .then((res) => setCityList(res.data.data))
        .catch((error) => console.log(error));
  }, [state]);


  // common function

  function formatDateToISO(date) {
    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format components into the desired string format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // input change handler
  function handleInputChange(event) {
    const { name, value } = event.target;
    setProducFormtData({ ...producFormtData, [name]: value });
  }

  // handle submit
  async function handleSubmitData(e) {

    e.preventDefault();
    setLoading(true);

    let errorCount = 0;

    const newFormDataError = {};

    if (!producFormtData?.intoducedDate) {
      errorCount++
      newFormDataError.intoducedDate = "This field is required!";
    }

    if (!producFormtData?.productName) {
      errorCount++
      newFormDataError.productName = "This field is required!";
    }

    if (!producFormtData?.AmountRangeStart) {
      errorCount++
      newFormDataError.AmountRangeStart = "This field is required!";
    }


    if (!producFormtData?.AmountRangeEnd) {
      errorCount++
      newFormDataError.AmountRangeEnd = "This field is required!";
    }


    if (!producFormtData?.rateOfInterest) {
      errorCount++
      newFormDataError.rateOfInterest = "This field is required!";
    }


    if (!producFormtData?.processFeePercent) {
      errorCount++
      newFormDataError.processFeePercent = "This field is required!";
    }


    if (!producFormtData?.gstChargePercent) {
      errorCount++
      newFormDataError.gstChargePercent = "This field is required!";
    }


    if (!producFormtData?.emiAmount) {
      errorCount++
      newFormDataError.emiAmount = "This field is required!";
    }




    if (!producFormtData?.NoOfEmi) {
      errorCount++
      newFormDataError.NoOfEmi = "This field is required!";
    }

    // 

    if (!producFormtData?.productStatus) {
      errorCount++
      newFormDataError.productStatus = "This field is required!";
    }


    if (!producFormtData?.rateTyep) {
      errorCount++
      newFormDataError.rateTyep = "This field is required!";
    }

    if (!producFormtData?.recoveryType) {
      errorCount++
      newFormDataError.recoveryType = "This field is required!";
    }

    if (!producFormtData?.processChargeInclude) {
      errorCount++
      newFormDataError.processChargeInclude = "This field is required!";
    }

    if (!producFormtData?.holidayExclude) {
      errorCount++
      newFormDataError.holidayExclude = "This field is required!";
    }

    if (!producFormtData?.gstchargeInclude) {
      errorCount++
      newFormDataError.gstchargeInclude = "This field is required!";
    }

    if (!producFormtData?.aharRequired) {
      errorCount++
      newFormDataError.aharRequired = "This field is required!";
    }

    if (!producFormtData?.panRequired) {
      errorCount++
      newFormDataError.panRequired = "This field is required!";
    }

    if (!producFormtData?.voterRequired) {
      errorCount++
      newFormDataError.voterRequired = "This field is required!";
    }

    if (!producFormtData?.drivingLicenseRequired) {
      errorCount++
      newFormDataError.drivingLicenseRequired = "This field is required!";
    }

    if (!producFormtData?.aharMandatory) {
      errorCount++
      newFormDataError.aharMandatory = "This field is required!";
    }

    if (!producFormtData?.panMandatory) {
      errorCount++
      newFormDataError.panMandatory = "This field is required!";
    }

    if (!producFormtData?.voterMandatory) {
      errorCount++
      newFormDataError.voterMandatory = "This field is required!";
    }

    if (!producFormtData?.drivingLicenseMandatory) {
      errorCount++
      newFormDataError.drivingLicenseMandatory = "This field is required!";
    }

    setFormDataError({ ...formdDataError, ...newFormDataError }); // 

    console.log("errorcount", errorCount);


    if (errorCount == 0) {

      try {

        const dataObject = producFormtData;
        const propertiesToTransform = [
          'processChargeInclude',
          'holidayExclude',
          'gstchargeInclude',
          'aharRequired',
          'panRequired',
          'voterRequired',
          'drivingLicenseRequired',
          'aharMandatory',
          'panMandatory',
          'voterMandatory',
          'drivingLicenseMandatory'
        ];

        propertiesToTransform.forEach(property => {
          dataObject[property] = dataObject[property] == "yes" ? true : false;
        });

        if (dataObject?.productStatus == "active") {
          dataObject["productStatus"] = true
        } else {
          dataObject["productStatus"] = false
        }

        const response = await newProductService.editProductProduct({ ...dataObject, id: productId });

        console.log("response 444",response);

        setLoading(false)
        toast.success(response.data.message)
        navigate('/layout/products')


      } catch (error) {
        setLoading(false)
        toast.error(error.message)
        console.error("Error fetching data:", error);
      }


    } else {

      setLoading(false);
      return

    }




  }

  const handleValidation = (event) => {

    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for firstName
    if (inputFieldName == "productName") {
      if (inputValue.length < 3) {
        setFormDataError({ ...formdDataError, [inputFieldName]: "Please enter atleast 3 characters!" });
      } else {
        let errorObject = formdDataError;
        delete errorObject[inputFieldName]
        setFormDataError({ ...errorObject });
      }
    }

    // if (inputFieldName == "AmountRangeStart") {
    //   if (inputValue.length < 3) {
    //     setFormDataError({...formdDataError, [inputFieldName] : "Please enter atleast 3 characters!"});
    //   } else {
    //     let errorObject = formdDataError;
    //     delete errorObject[inputFieldName]
    //     setFormDataError({...errorObject});
    //   }
    // }


  }

  const handleKeyPress = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    if (cleanedValue.trim() !== "") {
      if ((cleanedValue.match(/\./g) || []).length <= 1) {
        const formattedValue = cleanedValue.toLocaleString('en-US');
        e.target.value = formattedValue;
      } else {
        e.target.value = cleanedValue.replace(/\.(?=.*\.)/g, '');
      }
    } else {
      e.target.value = '';
    }
  }

  const handleKeyPress2 = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^0-9]/g, ''); // Only allow numbers, remove anything else
    e.target.value = cleanedValue; // Update the input field value
  }



  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <div className={`fromGroup  ${formdDataError?.productName ? "has-error" : ""}   `}>
          <label htmlFor="productName" className="mb-1">
            Product Name
          </label>
          <div className=" flex-1">
            <input
              id="productName"
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              className={`form-control py-2`}
              value={
                producFormtData?.productName ? producFormtData?.productName : ""
              }
              disabled={productId ? true : false}
              // //  className="form-control py-2" 
              onChange={handleInputChange}
              onKeyUp={handleValidation}
            />
            <div style={{ top: "47%" }} className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
              {formdDataError?.productName && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.productName && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.productName}
            </div>
          )}
        </div>

        {/* starting data */}

        <div className={`fromGroup   ${formdDataError?.intoducedDate ? "has-error" : ""}    `}>
          <label className="" htmlFor="hf-picker">
            Starting Data
          </label>
          <Flatpickr
            // value="1998-01-12"
            className="form-control py-2 "
            id="hf-picker"
            value={introducedDate ? introducedDate : ""}
            onChange={(date) => {
              setProducFormtData({ ...producFormtData, ["intoducedDate"]: formatDateToISO(date[0]) });

              let errorObject = formdDataError;

              delete errorObject["intoducedDate"]

              setFormDataError({ ...errorObject })

            }}
            options={{
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "Y-m-d",
            }}
          />
          <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2   -translate-y-1/2   space-x-1 rtl:space-x-reverse">
            {formdDataError?.intoducedDate && (
              <span className="text-danger-500">
                <Icon icon="heroicons-outline:information-circle" />
              </span>
            )}
          </div>
          {formdDataError?.intoducedDate && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.intoducedDate}
            </div>
          )}
        </div>

        <div className={`fromGroup  ${formdDataError?.AmountRangeStart ? "has-error" : ""}   `}>
          <label htmlFor="AmountRangeStart" className="mb-1">
            Starting Amount
          </label>
          <div className=" flex-1">
            <input
              id="AmountRangeStart"
              type="text"
              name="AmountRangeStart"
              placeholder="Enter Starting Amount"
              className={`form-control py-2`}
              value={
                producFormtData?.AmountRangeStart ? producFormtData?.AmountRangeStart : ""
              }
              // //  className="form-control py-2" 
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                console.log("dataError 22", dataError);
                delete dataError["AmountRangeStart"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress}
            />
            <div style={{ top: "47%" }} className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
              {formdDataError?.AmountRangeStart && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.AmountRangeStart && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.AmountRangeStart}
            </div>
          )}
        </div>


        <div className={`fromGroup ${formdDataError?.AmountRangeEnd ? "has-error" : ""}  `}>
          <label htmlFor="AmountRangeEnd" className="mb-1">
            Ending Amount
          </label>
          <div className=" flex-1">
            <input
              id="AmountRangeEnd"
              type="text"
              name="AmountRangeEnd"
              placeholder="Enter Ending Amount"
              className={`form-control py-2`}
              value={
                producFormtData?.AmountRangeEnd ? producFormtData?.AmountRangeEnd : ""
              }
              // //  className="form-control py-2" 
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["AmountRangeEnd"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress}
            // onKeyUp={handleValidation}
            />
            <div style={{ top: "47%" }} className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
              {formdDataError?.AmountRangeEnd && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.AmountRangeEnd && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.AmountRangeEnd}
            </div>
          )}
        </div>

        <div className={`fromGroup  ${formdDataError?.rateOfInterest ? "has-error" : ""}   `}>
          <label htmlFor="rateOfInterest" className="">
            Rate Of Interest
          </label>
          <div className=" flex-1">
            <input
              type="text"
              id="rateOfInterest"
              name="rateOfInterest"
              placeholder="Enter Rate Of Interest.."
              className="form-control py-2"
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["rateOfInterest"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress}
              // onKeyUp={handleValidation}
              value={
                producFormtData?.rateOfInterest ? producFormtData?.rateOfInterest : ""
              }
            />
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2   space-x-1 rtl:space-x-reverse">
              {formdDataError?.rateOfInterest && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.rateOfInterest && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.rateOfInterest}
            </div>
          )}
        </div>

        <div className={`fromGroup ${formdDataError?.processFeePercent ? "has-error" : ""}   `}>
          <label htmlFor="processFeePercent" className="">
            Process Fee Percent
          </label>
          <div className=" flex-1">
            <input
              type="text"
              id="processFeePercent"
              name="processFeePercent"
              placeholder="Enter Process Fee Percent.."
              className="form-control py-2"
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["processFeePercent"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress}
              // onKeyUp={handleValidation}
              value={
                producFormtData?.processFeePercent ? producFormtData?.processFeePercent : ""
              }
            />
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2   space-x-1 rtl:space-x-reverse">
              {formdDataError?.processFeePercent && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.processFeePercent && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.processFeePercent}
            </div>
          )}
        </div>


        <div className={`fromGroup ${formdDataError?.gstChargePercent ? "has-error" : ""}   `}>
          <label htmlFor="gstChargePercent" className="">
            GST Charge Percent
          </label>
          <div className=" flex-1">
            <input
              type="text"
              id="gstChargePercent"
              name="gstChargePercent"
              placeholder="Enter GST Charge Percent.."
              className="form-control py-2"
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["gstChargePercent"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress}
              // onKeyUp={handleValidation}
              value={
                producFormtData?.gstChargePercent ? producFormtData?.gstChargePercent : ""
              }
            />
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2   space-x-1 rtl:space-x-reverse">
              {formdDataError?.gstChargePercent && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.gstChargePercent && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.gstChargePercent}
            </div>
          )}
        </div>



        <div className={`fromGroup ${formdDataError?.emiAmount ? "has-error" : ""}   `}>
          <label htmlFor="emiAmount" className="">
            EMI Amount
          </label>
          <div className=" flex-1">
            <input
              type="text"
              id="emiAmount"
              name="emiAmount"
              placeholder="Enter EMI Amount"
              className="form-control py-2"
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["emiAmount"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress}
              // onKeyUp={handleValidation}
              value={
                producFormtData?.emiAmount ? producFormtData?.emiAmount : ""
              }
            />
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2   space-x-1 rtl:space-x-reverse">
              {formdDataError?.emiAmount && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.emiAmount && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.emiAmount}
            </div>
          )}
        </div>

        {/* Number of EMI */}
        <div className={`fromGroup ${formdDataError?.NoOfEmi ? "has-error" : ""}   `}>
          <label htmlFor="NoOfEmi" className="">
            Number Of EMI
          </label>
          <div className=" flex-1">
            <input
              type="text"
              id="NoOfEmi"
              name="NoOfEmi"
              placeholder="Enter NUmber Of EMI"
              className="form-control py-2"
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["NoOfEmi"]
                setFormDataError({ ...dataError })
              }}
              onInput={handleKeyPress2}
              // onKeyUp={handleValidation}
              value={
                producFormtData?.NoOfEmi ? producFormtData?.NoOfEmi : ""
              }
            />
            <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2  -translate-y-1/2   space-x-1 rtl:space-x-reverse">
              {formdDataError?.NoOfEmi && (
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              )}
            </div>
          </div>
          {formdDataError?.NoOfEmi && (
            <div
              className={` mt-2 text-danger-500 block text-sm `}
            >
              {formdDataError?.NoOfEmi}
            </div>
          )}
        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="productStatus" className={`${formdDataError?.productStatus ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Prodct Status :
          </label>
          {productStatusArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="productStatus"
              value={charge.value}
              checked={producFormtData?.productStatus === charge.value}

              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["productStatus"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>



        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="rateTyep" className={`${formdDataError?.rateTyep ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Rate Of Interest Type :
          </label>
          {rateTyepList.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="rateTyep"
              value={charge.value}
              checked={producFormtData?.rateTyep === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["rateTyep"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>


        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="recoveryType" className={`${formdDataError?.recoveryType ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Recovery Type :
          </label>
          {rateTyepList.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="recoveryType"
              value={charge.value}
              checked={producFormtData?.recoveryType === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["recoveryType"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="processChargeInclude" className={`${formdDataError?.processChargeInclude ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Process Charge Include :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="processChargeInclude"
              value={charge.value}
              checked={producFormtData?.processChargeInclude === charge.value}

              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["processChargeInclude"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="holidayExclude" className={`${formdDataError?.holidayExclude ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Holiday Exclude :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="holidayExclude"
              value={charge.value}
              checked={producFormtData?.holidayExclude === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["holidayExclude"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="gstchargeInclude" className={`${formdDataError?.gstchargeInclude ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            GST Charge Include :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="gstchargeInclude"
              value={charge.value}
              checked={producFormtData?.gstchargeInclude === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["gstchargeInclude"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>


        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="aharRequired" className={`${formdDataError?.aharRequired ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Ahar Required :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="aharRequired"
              value={charge.value}
              checked={producFormtData?.aharRequired === charge.value}
              onChange={(e) => {
                // handleGender(e);
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["aharRequired"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="panRequired" className={`${formdDataError?.panRequired ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Pan Required :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="panRequired"
              value={charge.value}
              checked={producFormtData?.panRequired === charge.value}

              onChange={(e) => {
                // handleGender(e);
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["panRequired"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="voterRequired" className={`${formdDataError?.voterRequired ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Voter Required :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="voterRequired"
              value={charge.value}
              checked={producFormtData?.voterRequired === charge.value}
              onChange={(e) => {
                // handleGender(e);
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["voterRequired"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="drivingLicenseRequired" className={`${formdDataError?.drivingLicenseRequired ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Driving License Required :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="drivingLicenseRequired"
              value={charge.value}
              checked={producFormtData?.drivingLicenseRequired === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["drivingLicenseRequired"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="aharMandatory" className={`${formdDataError?.aharMandatory ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Ahar Mandatory :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="aharMandatory"
              value={charge.value}
              checked={producFormtData?.aharMandatory === charge.value}
              onChange={(e) => {
                // handleGender(e);
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["aharMandatory"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="panMandatory" className={`${formdDataError?.panMandatory ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Pan Mandatory :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="panMandatory"
              value={charge.value}
              checked={producFormtData?.panMandatory === charge.value}

              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["panMandatory"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="voterMandatory" className={`${formdDataError?.voterMandatory ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Voter Mandatory :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="voterMandatory"
              value={charge.value}
              checked={producFormtData?.voterMandatory === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["voterMandatory"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="flex flex-wrap space-xy-5" style={{ display: "flex", alignItems: "center", marginTop: "1.4em" }}>
          <label htmlFor="drivingLicenseMandatory" className={`${formdDataError?.drivingLicenseMandatory ? "radioErrStyle" : ""}`} style={{ marginTop: "-10px" }}>
            Driving License Mandatory :
          </label>
          {processChargeIncludeArray.map((charge, index) => (
            <Radio key={index}
              label={charge.label}
              name="drivingLicenseMandatory"
              value={charge.value}
              checked={producFormtData?.drivingLicenseMandatory === charge.value}
              onChange={(e) => {
                handleInputChange(e);
                let dataError = formdDataError;
                delete dataError["drivingLicenseMandatory"]
                setFormDataError({ ...dataError })
              }}
              activeClass={charge.activeClass}
            />
          ))}

        </div>

        <div className="lg:col-span-2 col-span-1">
          <div className="ltr:text-right rtl:text-left" style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="btn btn-dark text-center"
              onClick={() => navigate("/layout/products")}
            >Back
            </button>
            <button className="btn btn-dark text-center"
              onClick={handleSubmitData}
              disabled={loading}
            >Submit
            </button>
          </div>
        </div>
      </form>


    </Card>

  );
};

export default EditProductForm;
