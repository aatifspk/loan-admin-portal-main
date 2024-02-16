import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import Card from "@/components/ui/Card";
import { useDispatch } from "react-redux";
import { viewBranch } from "@/redux/slices/ViewBranch";

const ViewBranch = () => {
  const { data } = useSelector((state) => state.ViewBranch);
  const [isDark] = useDarkMode();
console.log(data,"view Data");
  const {
    GSTIN,
    address,
    branchCode,
    branchName,
    branchVisibleName,
    city,
    contactEmail,
    country,
    createdAt,
    deletedAt,
    landlineNumber,
    locality,
    openingDate,
    phone,
    pinCode,
    state,
    status,
  } = data.data.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location?.state?.id;
  const pathName = location?.state?.pathName;
  useEffect(() => {
    dispatch(viewBranch(id));
  }, []);

  const handleClick = () => {
    navigate("/layout/edit-branch");
  };
  return (
    <>
      <Card>
        <div className="grid xl:grid-cols-2 md:grid-cols-1 rounded-3xl gap-6 bg-black-00">
          <div className="m-6">
            <p className="font-bold">
              GSTIN: <span className="font-normal capitalize">{GSTIN}</span>
            </p>
            <p className="font-bold">
              Branch Code:{" "}
              <span className="font-normal capitalize">{branchCode}</span>
            </p>
            <p className="font-bold ">
              Branch Name:{" "}
              <span className="font-normal capitalize">{branchName}</span>
            </p>
            <p className="font-bold ">
              Branch Visible Name:
              <span className="font-normal capitalize">
                {branchVisibleName}
              </span>
            </p>
            <p className="font-bold ">
              Address: <span className="font-normal capitalize">{address}</span>
            </p>
            <p className="font-bold ">
              City: <span className="font-normal capitalize">{city}</span>
            </p>
            <p className="font-bold ">
              State: <span className="font-normal capitalize">{state}</span>
            </p>
            <p className="font-bold ">
              Country: <span className="font-normal capitalize">{country}</span>
            </p>
            <p className="font-bold ">
              Locality:{" "}
              <span className="font-normal capitalize">{locality}</span>
            </p>
            <p className="font-bold ">
              PinCode: <span className="font-normal capitalize">{pinCode}</span>
            </p>
          </div>
          <div className="m-6">
            <p className="font-bold">
              Contact Email: <span className="font-normal">{contactEmail}</span>
            </p>
            <p className="font-bold">
              Landline Number:
              <span className="font-normal capitalize">{landlineNumber}</span>
            </p>
            <p className="font-bold">
              Opening Date:{" "}
              <span className="font-normal capitalize">
                {openingDate
                  ? new Date(openingDate).toISOString().split("T")[0]
                  : ""}
              </span>
            </p>
            <p className="font-bold">
              Created At:{" "}
              <span className="font-normal capitalize">
                {createdAt
                  ? new Date(createdAt).toISOString().split("T")[0]
                  : ""}
              </span>
            </p>
            <p className="font-bold">
              Deleted At:{" "}
              <span className="font-normal capitalize">
                {deletedAt === null
                  ? "Null"
                  : deletedAt
                  ? new Date(deletedAt).toISOString().split("T")[0]
                  : ""}
              </span>
            </p>
            <p className="font-bold">
              Phone: <span className="font-normal capitalize">{phone}</span>
            </p>
            <p className="font-bold">
              Status:{" "}
              <span className="font-normal capitalize">
                {status ? "True" : "False"}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <button
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 mb-11"
                  : "btn btn-dark"
              }   block  text-center py-2 rounded-lg`}
              onClick={() => navigate(pathName)}
            >
              Back
            </button>
          </div>
          <div>
            <button
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500 mb-11"
                  : "btn btn-dark"
              }   block   text-center py-2 rounded-lg`}
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

export default ViewBranch;
