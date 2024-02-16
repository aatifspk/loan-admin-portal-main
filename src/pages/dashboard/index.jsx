import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { useSelector, useDispatch } from "react-redux";
import { viewUser } from "@/redux/slices/ViewAuth";
import { toast } from "react-toastify";
import { readNotification } from "@/redux/slices/Notification/SuperAdminNotification";
const Dashboard = () => {
  const viewAuth = useSelector((state) => state.viewUserSlice);
  const { readNotificationList } = useSelector(
    (state) => state.SuperAdminNotification
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewUser());
    dispatch(readNotification());
  }, []);

  // .then((res) => console.log("index js", res))
  // .catch((error) => console.log("error", error));

  const formateDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { day: "numeric" };
    return dateObject.toLocaleString("en-US", options);
  };
  const formateMonth = (dateString) => {
    const dateObject = new Date(dateString);
    const option = { month: "short" };
    return dateObject.toLocaleString("en-US", option);
  };
  return (
    <div>
      <Card title="Starter Kit">Your Dashboard</Card>
      <Card title="Notices" className="mt-7">
        {readNotificationList?.map((item) => (
          <div key={item._id} className="border-t">
            <div className="flex gap-5 my-2 ">
              {/* <div>{formateDate(item.createdAt)}</div> */}
              <div className="flex flex-col border border-black-500 p-1 rounded">
                <div className="border border-b-black-500 text-sm">
                  {formateMonth(item.createdAt)}
                </div>
                <div className="text-center text-sm">
                  {formateDate(item.createdAt)}
                </div>
              </div>
              <div className="hover:text-black-500 text-sm">{item.header}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default Dashboard;
