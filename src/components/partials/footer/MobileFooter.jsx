import React, { useState, useEffect } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/Icon";

import FooterAvatar from "@/assets/images/users/user-1.jpg";
import { toast } from "react-toastify";
import Profile from "@/Common/Profile";
import { viewUser } from "@/redux/slices/ViewAuth";
import { verifyAuth } from "@/redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const MobileFooter = () => {
  const navigate = useNavigate();
  const { data, profileCreated } = useSelector((state) => state.viewUserSlice);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    if (data) {
      const { firstName, lastName, profileImage } = data?.data?.data || {};
      setUserDetails({
        // id: _id,
        name: `${firstName} ${lastName}`,
        profileImage: `http://localhost:8080/profile/${profileImage}`,
      });
    }
  }, [data]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewUser());
    dispatch(verifyAuth());
  }, [dispatch]);
  return (
    <div className="bg-white bg-no-repeat custom-dropshadow footer-bg dark:bg-slate-700 flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-[9999] bottom-0 py-[12px] px-4">
      {/* <NavLink to="#">
        {({ isActive }) => (
          <div>
            <span
              className={` relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1
         ${isActive ? "text-primary-500" : "dark:text-white text-slate-900"}
          `}
            >
              <Icon icon="heroicons-outline:mail" />
              <span className="absolute right-[5px] lg:top-0 -top-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
                10
              </span>
            </span>
            <span
              className={` block text-[11px]
          ${
            isActive ? "text-primary-500" : "text-slate-600 dark:text-slate-300"
          }
          `}
            >
              Messages
            </span>
          </div>
        )}
      </NavLink> */}
      <NavLink
        to="/layout/profile"
        className="relative bg-white bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-slate-700 h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center"
      >
        {({ isActive }) => (
          <div
            className="h-[50px] w-[50px] rounded-full relative left-[0px] top-[0px] custom-dropshadow"
            // onClick={handleClick}
          >
            <img
              // onClick={handleClick}
              src={
                data && profileCreated ? userDetails.profileImage : FooterAvatar
              }
              alt=""
              className={` w-full h-full rounded-full
              
          ${
            isActive
              ? "border-2 border-primary-500"
              : "border-2 border-slate-100"
          }
              `}
            />
          </div>
        )}
      </NavLink>
      {/* <NavLink to="#">
        {({ isActive }) => (
          <div>
            <span
              className={` relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1
      ${isActive ? "text-primary-500" : "dark:text-white text-slate-900"}
          `}
            >
              <Icon icon="heroicons-outline:bell" />
              <span className="absolute right-[17px] lg:top-0 -top-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
                2
              </span>
            </span>
            <span
              className={` block text-[11px]
         ${isActive ? "text-primary-500" : "text-slate-600 dark:text-slate-300"}
        `}
            >
              Notifications
            </span>
          </div>
        )}
      </NavLink> */}
    </div>
  );
};

export default MobileFooter;
