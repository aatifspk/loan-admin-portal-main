import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import Card from "@/components/ui/Card";
import { useDispatch } from "react-redux";
import { viewAgent } from "@/redux/slices/Agent/ViewAgent";
const ViewAgent = () => {
  const { data } = useSelector((state) => state.ViewAgent);
  const [isDark] = useDarkMode();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    createdAt,
    deletedAt,
    state,
  } = data.data.data;

  const { branchName, branchVisibleName, locality, contactEmail } =
    data.data.data.branchId;
  const navigate = useNavigate();
  const pathName = location?.state?.pathName;

  const handleClick = () => {
    navigate("/layout/edit-agents");
  };
  useEffect(() => {
    dispatch(viewAgent(id));
  }, []);
  return (
    <>
      <Card>
        <div className="grid xl:grid-cols-2 md:grid-cols-1 rounded-3xl gap-6 bg-black-00">
          <div className="m-6">
            <p className="mb-6 text-secondary-700 font-bold text-3xl">
              Agent Details
            </p>
            <p className="font-bold">
              First Name:{" "}
              <span className="font-normal capitalize">{firstName}</span>
            </p>
            <p className="font-bold">
              Last Name:{" "}
              <span className="font-normal capitalize">{lastName}</span>
            </p>
            <p className="font-bold">
              email: <span className="font-normal capitalize">{email}</span>
            </p>
            <p className="font-bold">
              phone: <span className="font-normal capitalize">{phone}</span>
            </p>
            <p className="font-bold">
              city: <span className="font-normal capitalize">{city}</span>
            </p>
            <p className="font-bold">
              state: <span className="font-normal capitalize">{state}</span>
            </p>
            <p className="font-bold">
              country: <span className="font-normal capitalize">{country}</span>
            </p>
            {/* <p className="font-bold">
              Created At:
              <span className="font-normal">
                {createdAt
                  ? new Date(createdAt).toISOString().split("T")[0]
                  : ""}
              </span>
            </p>
            <p className="font-bold">
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
          <div className="m-6">
            <h1 className="mb-6 text-secondary-700 font-bold text-3xl">
              Branch Details
            </h1>
            <p className="font-bold">
              Branch Name:{" "}
              <span className="font-normal capitalize">{branchName}</span>
            </p>
            <p className="font-bold">
              Branch Visible Name:
              <span className="font-normal capitalize">
                {branchVisibleName}
              </span>
            </p>
            <p className="font-bold">
              locality:{" "}
              <span className="font-normal capitalize">{locality}</span>
            </p>
            <p className="font-bold">
              Contact Email: <span className="font-normal">{contactEmail}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-6">
          <div>
            <button
              className={`${
                isDark
                  ? "btn bg-primary-200 font-bold  text-black-500"
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

export default ViewAgent;
