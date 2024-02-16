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
import { addClient } from "@/redux/slices/Client/AddClient";
import { addEmployee } from "@/redux/slices/Employee/AddEmployee";
import Card from "@/components/ui/Card";
import { addProduct } from "@/redux/slices/Products/AddProduct";

const schema = yup
  .object({
    productName: yup.string().required("Product Name is required"),
    intoducedDate: yup.string().required("Intoduced Date is required"),
    AmountRangeStart: yup.string().required("Amount Range Start is required"),
    AmountRangeEnd: yup.string().required("Amount Range End is required"),
    rateOfInterest: yup.string().required("Rate Of Interest is required"),
    rateTyep: yup.string().required("Rate Type is required"),
    processChargeInclude: yup
      .string()
      .required("Process Charge Include is required"),
    processFeePercent: yup.string().required("Process Fee Percent is required"),
    recoveryType: yup.string().required("Recovery Type is required"),
    productStatus: yup.string().required("Product Status is required"),
    holidayExclude: yup.string().required("Holiday Exclude is required"),
    emiAmount: yup.string().required("Emi Amount is required"),
    NoOfEmi: yup.string().required("No of Emi is required"),
    gstchargeInclude: yup.string().required("GST Charge Include is required"),
    gstChargePercent: yup.string().required("GST Charge Percent is required"),
  })
  .required();
const AddProductForm = () => {
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
  // const { branchList } = useSelector((state) => state.branchSlice);

  //--------- creating form data ---------
  const [formData, setFormData] = useState({
    productName: "",
    intoducedDate: "",
    AmountRangeStart: "",
    AmountRangeEnd: "",
    rateOfInterest: "",
    rateTyep: "",
    processChargeInclude: false,
    processFeePercent: "",
    recoveryType: "",
    productStatus: true,
    holidayExclude: false,
    emiAmount: "",
    NoOfEmi: "",
    gstchargeInclude: false,
    gstChargePercent: "",
    // adharRequired: "",
    // panRequired: "",
    // voterRequired: "",
    // drivingLicenseRequired: "",
    // propertyPaperRequired: "",
  });
  // ------destructing the form data -------
  const {
    productName,
    intoducedDate,
    AmountRangeStart,
    AmountRangeEnd,
    rateOfInterest,
    rateTyep,
    processChargeInclude,
    processFeePercent,
    recoveryType,
    productStatus,
    holidayExclude,
    emiAmount,
    NoOfEmi,
    gstchargeInclude,
    gstChargePercent,
    // adharRequired,
    // panRequired,
    // voterRequired,
    // drivingLicenseRequired,
    // propertyPaperRequired,
  } = formData;
  // ----handling the input box -----
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "radio" ? (value === "true" ? true : false) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
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
  const id = null;
  const productData = {
    id,
    productName,
    // intod ucedDate,
    AmountRangeStart: Number(formData.AmountRangeStart),
    AmountRangeEnd: Number(formData.AmountRangeEnd),
    rateOfInterest: Number(formData.rateOfInterest),
    rateTyep,
    processChargeInclude,
    processFeePercent: Number(formData.processFeePercent),
    recoveryType,
    // productStatus,
    holidayExclude,
    emiAmount: Number(formData.emiAmount),
    NoOfEmi: Number(formData.NoOfEmi),
    gstchargeInclude,
    gstChargePercent: Number(formData.gstChargePercent),
    // adharRequired,
    // panRequired,
    // voterRequired,
    // drivingLicenseRequired,
    // propertyPaperRequired,
  };
  // -----submiting the form ----
  const onSubmit = (e) => {
    e.preventDefault();
    let errorCount = 0;
    console.log(formData, "form Data");
    console.log("productData", productData);

    // --------applying validation ------
    // if (
    //   !productName ||
    //   !intoducedDate ||
    //   !AmountRangeStart ||
    //   !AmountRangeEnd ||
    //   !rateOfInterest ||
    //   !rateTyep ||
    //   !processChargeInclude ||
    //   !processFeePercent ||
    //   !recoveryType ||
    //   // !productStatus ||
    //   !holidayExclude ||
    //   !emiAmount ||
    //   !NoOfEmi ||
    //   !gstchargeInclude ||
    //   !gstChargePercent
    //   // !adharRequired ||
    //   // !panRequired ||
    //   // !voterRequired ||
    //   // !drivingLicenseRequired ||
    //   // !propertyPaperRequired
    // ) {
    //   errorCount++;
    //   toast.warn("All Fields are Required");
    //   return;
    // }
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
  //Handling State
  // useEffect(() => {
  //   dispatch(stateData());
  // }, [state]);
  // //Handling Cities after state change
  // useEffect(() => {
  //   if (state.length)
  //     axios
  //       .get(`http://localhost:8080/api/getCities/${state}`)
  //       .then((res) => setCityList(res.data.data))
  //       .catch((error) => console.log(error));
  // }, [state]);

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
              Product Name <span className="requiredInput">*</span>
            </p>

            <input
              name="productName"
              type="text"
              className=" rounded-sm"
              value={productName}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Product Name"
            />
            {<p className="text-red-600">{errors.productName?.message}</p>}
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Intoduced Date <span className="requiredInput">*</span>
            </p>
            <input
              name="intoducedDate"
              type="date"
              className=" rounded-sm"
              value={intoducedDate}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              // placeholder="Enter Your Last Name"
            />
            {<p className="text-red-600">{errors.intoducedDate?.message}</p>}
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              AmountRangeStart <span className="requiredInput">*</span>
            </p>
            <input
              name="AmountRangeStart"
              type="number"
              className=" rounded-sm"
              value={AmountRangeStart}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Amount Range Start"
            />
            {<p className="text-red-600">{errors.AmountRangeStart?.message}</p>}
          </label>

          <label className="inputlable rounded-sm">
            <p className="inputlable">
              Amount Range End<span className="requiredInput">*</span>
            </p>

            <input
              name="AmountRangeEnd"
              type="number"
              className=" rounded-sm"
              value={AmountRangeEnd}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Amount Range End"
            />
            {<p className="text-red-600">{errors.AmountRangeEnd?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Rate Of Interest<span className="requiredInput">*</span>
            </p>
            <input
              name="rateOfInterest"
              type="number"
              className=""
              value={rateOfInterest}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Rate Of Interest"
            />
            {<p className="text-red-600">{errors.rateOfInterest?.message}</p>}
          </label>
          <label className="inputlable rounded-sm">
            <p className="inputlable">
              rateTyep <span className="requiredInput">*</span>
            </p>
            <select
              value={rateTyep}
              name="rateTyep"
              label="State"
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={optionStyle}
              className="h-10 mr-6 w-full"
            >
              <option value="">Rate Type</option>
              <option value="day">Daily</option>
              <option value="weak">Weakly </option>
              <option value="month">Monthly</option>
            </select>
            {<p className="text-red-600">{errors.rateTyep?.message}</p>}
          </label>

          <label className=" rounded-sm">
            <p className="inputlable">
              Process Charge Include <span className="requiredInput">*</span>
            </p>
            <div className="flex gap-2">
              <label className="flex gap-2">
                <p className="py-2 ">True</p>
                <input
                  name="processChargeInclude"
                  type="radio"
                  className=" rounded-sm"
                  value={true}
                  // value={processChargeInclude}
                  // onKeyUp={handleValidation}
                  checked={processChargeInclude === true}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="py-2">False</p>
                <input
                  name="processChargeInclude"
                  type="radio"
                  className=""
                  // value={processChargeInclude}
                  value={false}
                  // onKeyUp={handleValidation}
                  onChange={handleChange}
                  checked={processChargeInclude === false}
                />
              </label>
              {
                <p className="text-red-600 text-xs">
                  {errors.processChargeInclude?.message}
                </p>
              }
            </div>
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Process Fee Percent <span className="requiredInput">*</span>
            </p>
            <input
              name="processFeePercent"
              type="number"
              className=""
              value={processFeePercent}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Process Fee Percent"
            />
            {
              <p className="text-red-600">
                {errors.processFeePercent?.message}
              </p>
            }
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Recovery Type <span className="requiredInput">*</span>
            </p>
            <input
              name="recoveryType"
              type="text"
              className=""
              value={recoveryType}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Recovery Type"
            />
            {<p className="text-red-600">{errors.recoveryType?.message}</p>}
          </label>

          <label className=" rounded-sm">
            <p className="inputlable">
              Product Status <span className="requiredInput">*</span>
            </p>
            <div className="flex gap-2">
              <label className="flex gap-2">
                <p className="py-2 ">True</p>
                <input
                  name="productStatus"
                  type="radio"
                  className=" rounded-sm"
                  value={true}
                  // onKeyUp={handleValidation}
                  checked={productStatus === true}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="py-2">False</p>
                <input
                  name="productStatus"
                  type="radio"
                  className=""
                  value={false}
                  // onKeyUp={handleValidation}
                  onChange={handleChange}
                  checked={productStatus === false}
                />
              </label>
              {
                <p className="text-red-600 text-xs">
                  {errors.productStatus?.message}
                </p>
              }
            </div>
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              Holiday Exclude <span className="requiredInput">*</span>
            </p>
            <div className="flex gap-2">
              <label className="flex gap-2">
                <p className="py-2 ">True</p>
                <input
                  name="holidayExclude"
                  type="radio"
                  className=" rounded-sm"
                  value={true}
                  // onKeyUp={handleValidation}
                  checked={holidayExclude === true}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="py-2">False</p>
                <input
                  name="holidayExclude"
                  type="radio"
                  className=""
                  value={false}
                  // onKeyUp={handleValidation}
                  onChange={handleChange}
                  checked={holidayExclude === false}
                />
              </label>
              {
                <p className="text-red-600 text-xs">
                  {errors.holidayExclude?.message}
                </p>
              }
            </div>
          </label>
          <label className="inputlable">
            <p className="inputlable">
              Emi Amount <span className="requiredInput">*</span>
            </p>
            <input
              name="emiAmount"
              type="number"
              className=""
              value={emiAmount}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your Emi Amount"
            />
            {<p className="text-red-600">{errors.emiAmount?.message}</p>}
          </label>
          <label className="inputlable">
            <p className="inputlable">
              No of Emi <span className="requiredInput">*</span>
            </p>
            <input
              name="NoOfEmi"
              type="number"
              className=""
              value={NoOfEmi}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your No of Emi"
            />
            {<p className="text-red-600">{errors.NoOfEmi?.message}</p>}
          </label>
          <label className=" rounded-sm">
            <p className="inputlable">
              GST charge Include <span className="requiredInput">*</span>
            </p>
            <div className="flex gap-2">
              <label className="flex gap-2">
                <p className="py-2 ">True</p>
                <input
                  name="gstchargeInclude"
                  type="radio"
                  className=" rounded-sm"
                  value={true}
                  // onKeyUp={handleValidation}
                  checked={gstchargeInclude === true}
                  onChange={handleChange}
                />
              </label>
              <label className="flex gap-2">
                <p className="py-2">False</p>
                <input
                  name="gstchargeInclude"
                  type="radio"
                  className=""
                  value={false}
                  // onKeyUp={handleValidation}
                  onChange={handleChange}
                  checked={gstchargeInclude === false}
                />
              </label>
              {
                <p className="text-red-600 text-xs">
                  {errors.gstchargeInclude?.message}
                </p>
              }
            </div>
          </label>
          <label className="inputlable">
            <p className="inputlable">
              GST Charge Percent <span className="requiredInput">*</span>
            </p>
            <input
              name="gstChargePercent"
              type="number"
              className=""
              value={gstChargePercent}
              onChange={handleChange}
              onKeyUp={handleValidation}
              style={inputBoxStyle}
              placeholder="Enter Your GST Charge Percent"
            />
            {<p className="text-red-600">{errors.gstChargePercent?.message}</p>}
          </label>
        </div>
        <div className="flex justify-between">
          <div className=" mt-5">
            <Button
              type="button"
              text="Back"
              // onClick={handleBack}
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 "
                  : "btn btn-dark"
              }`}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className=" mt-5">
          <Button
            type="submit"
            text="Add Product"
            className={`${
              isDark
                ? "btn bg-primary-200 font-bold  text-black-500 "
                : "btn btn-dark"
            }   `}
            // isLoading={isLoading}
          />
        </div>
      </form>
    </Card>
  );
};

export default AddProductForm;
