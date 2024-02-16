import Card from "@/components/ui/Card";
import { viewParticularNotification } from "@/redux/slices/Notification/SuperAdminNotification";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const NotificationLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location?.state?.id;
  const { viewNotification } = useSelector(
    (state) => state.SuperAdminNotification
  );
  console.log(viewNotification, "view");
  console.log(id, "id");
  useEffect(() => {
    dispatch(viewParticularNotification(id))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Card>
      <div>
        <div className="text-center font-bold text-3xl">
          {viewNotification?.header}
        </div>
        <div className="font-bold">{viewNotification?.subHeader}</div>
        <div>{viewNotification?.body}</div>
        {/* <div>{viewNotification?.createdAt}</div> */}
      </div>
    </Card>
  );
};

export default NotificationLayout;
