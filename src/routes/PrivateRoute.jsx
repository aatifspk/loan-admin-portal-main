import Loading from "@/components/Loading";
import Layout from "@/store/layout";
import React, { Suspense, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  return isLoggedIn ? (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Navigate to="/layout/dashboard" />
        <Outlet />
      </Suspense>
    </Layout>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
