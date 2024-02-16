import React, { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { notifications } from "@/constant/data";
import { useDispatch } from "react-redux";
import {
  deleteNotification,
  notificationCount,
  unreadNotification,
} from "@/redux/slices/Notification/SuperAdminNotification";
import { useSelector } from "react-redux";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";

// const notifyLabel = () => {
//   return (
//     <span className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
//       <Icon icon="heroicons-outline:bell" className="animate-tada" />
//       <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
//         2
//       </span>
//     </span>
//   );
// };

const Notification = () => {
  const [hoverd, setHovered] = useState(false);
  const { unreadNotificationList, unreadNotificationCount } = useSelector(
    (state) => state.SuperAdminNotification || {}
  );
  // let unreadNotificationCount = 0;
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const notifyLabel = () => {
    return (
      <span className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
        <Icon icon="heroicons-outline:bell" className="animate-tada" />
        <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
          {unreadNotificationCount}
        </span>
      </span>
    );
  };
  const [isDark] = useDarkMode();
  const navigate = useNavigate();
  const handleView = (item) => {
    const id = item._id;
    navigate("/layout/notification-layout", { state: { id } });
    setRefresh(true);
    dispatch(unreadNotification());
    dispatch(notificationCount());
  };
  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteNotification(id))
      .then((res) => {
        console.log(res);
        dispatch(unreadNotification());
        dispatch(notificationCount());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const date = new Date();
  const formateDate = (dateString) => {
    console.log(dateString);
    const dateObject = new Date(dateString);
    const option = { day: "numeric", month: "short", year: "numeric" };
    const diffInMilliseconds = Date.now() - dateObject.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    } else {
      return "just now";
    }
  };
  useEffect(() => {
    dispatch(unreadNotification());
    dispatch(notificationCount());
    // dispatch(readNotification());
  }, []);

  return (
    <Dropdown classMenuItems="md:w-[300px] top-[58px]" label={notifyLabel()}>
      <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600 flex-wrap">
        <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
          Notifications
        </div>
        <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
          <Link to="/notifications" className="underline">
            View all
          </Link>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {unreadNotificationList?.map((item, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <div
                className={`${
                  active
                    ? "bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800"
                    : "text-slate-600 dark:text-slate-300"
                } block w-full px-4 py-2 text-sm  cursor-pointer`}
                onMouseOver={(e) => setHovered(true)}
                onMouseOut={(e) => setHovered(false)}
              >
                <div className="flex ltr:text-left rtl:text-right">
                  <div className="flex-none ltr:mr-3 rtl:ml-3">
                    {/* <div className="h-8 w-8 bg-white rounded-full"> */}
                    {/* <img
                        src={item.image}
                        alt=""
                        className={`${
                          active ? " border-white" : " border-transparent"
                        } block w-full h-full object-cover rounded-full border`}
                      /> */}
                    {/* </div> */}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`${
                        active
                          ? "text-slate-600 dark:text-slate-300"
                          : " text-slate-600 dark:text-slate-300"
                      } text-sm`}
                    >
                      {item.header}
                    </div>
                    <div
                      className={`${
                        active
                          ? "text-slate-500 dark:text-slate-200"
                          : " text-slate-600 dark:text-slate-300"
                      } text-xs leading-4`}
                    >
                      {item.subHeader}
                    </div>
                    <div className="flex gap-5">
                      <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                        {formateDate(item.createdAt)}
                      </div>
                      <div className="flex gap-4">
                        <div>
                          <Button
                            type="submit"
                            text="View"
                            className={`${
                              isDark
                                ? "btn bg-primary-200 font-bold  text-black-500 "
                                : "btn btn-dark"
                            } btn btn-sm text-center  my-3 `}
                            onClick={(e) => handleView(item)}
                          />
                        </div>
                      </div>

                      {/* <div>
                        <Button
                          type="submit"
                          text="Delete"
                          className={`${
                            isDark ? "btn  font-bold  text-black-500 " : ""
                          }  text-center btn btn-sm my-3 bg-danger-500`}
                          onClick={(e) => handleDelete(item)}
                        />
                      </div> */}
                    </div>
                  </div>
                  {/* {item.unread && (
                    <div className="flex-0">
                      <span className="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                    </div>
                  )} */}
                </div>
              </div>
            )}
          </Menu.Item>
        ))}
      </div>
    </Dropdown>
  );
};

export default Notification;
