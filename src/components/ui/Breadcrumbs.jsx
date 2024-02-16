import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { menuItems, adminMenuItems } from "@/constant/data";
import Icon from "@/components/ui/Icon";

const Breadcrumbs = () => {
  const location = useLocation();
  const locationName = location.pathname.replace("/", "");

  const [isHide, setIsHide] = useState(null);
  const [groupTitle, setGroupTitle] = useState("");
  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    const currentMenuItem = (roleId === 1 ? menuItems : adminMenuItems).find(
      (item) => item.link === locationName
    );
    // const currentAdminMenuItem = adminMenuItems.find(
    //   (item) => item.link === locationName
    // );
    // const currentAdminChild = adminMenuItems.find((item) =>
    //   item.child?.find((child) => child.childlink === locationName)
    // );

    const currentChild = (roleId === 1 ? menuItems : adminMenuItems).find(
      (item) => item.child?.find((child) => child.childlink === locationName)
    );

    if (currentMenuItem) {
      setIsHide(currentMenuItem.isHide);
    } else if (currentChild) {
      setIsHide(currentChild?.isHide || false);
      setGroupTitle(currentChild?.title);
    }
    // if (currentAdminMenuItem) {
    //   setIsHide(currentAdminMenuItem.isHide);
    // } else if (currentAdminChild) {
    //   setIsHide(currentAdminChild?.isHide || false);
    //   setGroupTitle(currentAdminChild?.title);
    // }
  }, [location, locationName]);

  return (
    <>
      {!isHide ? (
        <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
          <ul className="breadcrumbs">
            <li className="text-primary-500">
              <NavLink to="/dashboard" className="text-lg">
                <Icon icon="heroicons-outline:home" />
              </NavLink>
              <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                <Icon icon="heroicons:chevron-right" />
              </span>
            </li>
            {groupTitle && (
              <li className="text-primary-500">
                <button type="button" className="capitalize">
                  {groupTitle}
                </button>
                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                  <Icon icon="heroicons:chevron-right" />
                </span>
              </li>
            )}
            <li className="capitalize text-slate-500 dark:text-slate-400">
              {locationName}
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Breadcrumbs;
