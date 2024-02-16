import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import { useDispatch } from "react-redux";
import { viewEmployee } from "@/redux/slices/Employee/ViewEmployee";
import Card from "@/components/ui/Card";
import { viewProduct } from "@/redux/slices/Products/ViewProduct";
const ViewProduct = () => {
  const { data } = useSelector((state) => state.ViewProduct);
  console.log(data, "data");
  const [isDark] = useDarkMode();
  const dispatch = useDispatch();
  console.log(data.data.data[0], "data");
  const {
    AmountRangeEnd,
    AmountRangeStart,
    NoOfEmi,
    rateOfInterest,
    recoveryType,
    productName,
    processFeePercent,
    createdAt,
    deletedAt,
  } = data.data.data[0];
  //   console.log(data.data.data.branchId.GSTIN);

  const { branchName, branchVisibleName, locality, contactEmail } = data.data;
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location?.state?.pathName;
  const id = location?.state?.id;
  
  const handleClick = () => {
    navigate("/layout/edit-product", { state: { id } });
  };
  
  useEffect(() => {
    dispatch(viewProduct(id));
  }, []);
  return (
    <>
      <Card>
        <div className="grid xl:grid-cols-2 md:grid-cols-1 rounded-3xl gap-6 bg-black-00">
          <div className="m-6">
            <p className="mb-6  font-bold text-3xl">Product Details</p>{" "}
            {/*text-secondary-700*/}
            <p className="font-bold">
              Amount Range Start:
              <span className="font-normal capitalize">{AmountRangeStart}</span>
            </p>
            <p className="font-bold">
              Amount Range End:
              <span className="font-normal capitalize">{AmountRangeEnd}</span>
            </p>
            <p className="font-bold">
              No of Emi:{" "}
              <span className="font-normal capitalize">{NoOfEmi}</span>
            </p>
            <p className="font-bold">
              Rate of Interest:
              <span className="font-normal capitalize">{rateOfInterest}</span>
            </p>
            <p className="font-bold">
              Recovery Type:{" "}
              <span className="font-normal capitalize">{recoveryType}</span>
            </p>
            <p className="font-bold">
              Product Name:{" "}
              <span className="font-normal capitalize">{productName}</span>
            </p>
            <p className="font-bold">
              Process Fee Percent:
              <span className="font-normal capitalize">
                {processFeePercent}
              </span>
            </p>
            {/* <p className="font-bold">
              Created At:
              <span className="font-normal">
                {createdAt
                  ? new Date(createdAt).toISOString().split("T")[0]
                  : ""}
              </span>
            </p> */}
            {/* <p className="font-bold">
              Deleted At:
              <span className="font-normal">
                {deletedAt === null
                  ? "Null"
                  : deletedAt
                  ? new Date(deletedAt).toISOString().split("T")[0]
                  : ""}
              </span>
            </p> */}
          </div>
          {/* <div className="m-6">
            <h1 className="mb-6 text-secondary-700 font-bold text-3xl">
              Branch Details
            </h1>
            <p className="font-bold">
              Branch Name:<span className="font-normal">{branchName}</span>
            </p>
            <p className="font-bold">
              Branch Visible Name:
              <span className="font-normal">{branchVisibleName}</span>
            </p>
            <p className="font-bold">
              locality:<span className="font-normal">{locality}</span>
            </p>
            <p className="font-bold">
              Contact Email:<span className="font-normal">{contactEmail}</span>
            </p>
          </div> */}
        </div>
        <div className="flex gap-6">
          <div>
            <button
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500"
                  : "btn btn-dark"
              }   block  text-center py-2 rounded-lg`}
              onClick={() => navigate("/layout/products")}
            >
              Back
            </button>
          </div>
          <div>
            <button
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500"
                  : "btn btn-dark"
              }   block text-center py-2 rounded-lg`}
              onClick={handleClick}
            >
              Edit
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ViewProduct;
