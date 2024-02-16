import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import Signin from "./Common/Sigin/Signin";
import ForgotPassword from "./Common/Forget Password/ForgotPassword";
import ResetPassword from "./Common/Reset Password/ResetPassword";
import SignInByOtp from "./Common/SignByOtp/SignByOtp";
// import Profile from "./Common/profile/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import ProfileForm from "./Common/ProfileForm";
import Branches from "./components/NavMenu/Branches/Branches";
import AddBranchForm from "./components/NavMenu/Branches/AddBranchForm";
import EditBranchForm from "./components/NavMenu/Branches/EditBranchForm";
import Profile from "./Common/Profile";
import { useSelector } from "react-redux";
import EditProfile from "./Common/EditProfile";
import ViewBranch from "@/components/NavMenu/Branches/ViewBranch";
import RestoreBranch from "./components/NavMenu/Branches/RestoreBranch";
import useDarkmode from "./hooks/useDarkMode";
import Agent from "./components/NavMenu/Agent/Agent";
import AddAgentForm from "./components/NavMenu/Agent/AddAgentForm";
import ViewAgent from "./components/NavMenu/Agent/ViewAgent";
import EditAgentForm from "./components/NavMenu/Agent/EditAgentForm";
import RestoreAgent from "./components/NavMenu/Agent/RestoreAgent";
import Client from "./components/NavMenu/Client/Client";
import AddClient from "./components/NavMenu/Client/AddClient";
import ViewClient from "./components/NavMenu/Client/ViewClient";
import RestoreClient from "./components/NavMenu/Client/RestoreClient";
import EditClientForm from "./components/NavMenu/Client/EditClient";
import Employee from "./components/NavMenu/Employee/Employee";
import ViewEmployee from "./components/NavMenu/Employee/ViewEmployee";
import RestoreEmployee from "./components/NavMenu/Employee/RestoreEmployee";
import AddEmployeeForm from "./components/NavMenu/Employee/AddEmployee";
import EditEmployeeForm from "./components/NavMenu/Employee/EditEmployee";
import Products from "./components/NavMenu/Products/Products";
import ViewProduct from "./components/NavMenu/Products/ViewProduct";
import RestoreProduct from "./redux/slices/Products/RestoreProduct";
import AddProductForm from "./components/NavMenu/Products/AddProduct";
import EditProductForm from "./components/NavMenu/Products/EditProduct";
import RestoreProducts from "./components/NavMenu/Products/RestoreProduct";
import ProductInfo from "./components/NavMenu/Products/ProductInfo";
import NotificationLayout from "./components/partials/header/Tools/NotificationLayout";
import Notification from "./components/NavMenu/Notification/Notification";
import DefaultForm from "./components/NavMenu/ApplyLoan/DefaultLoanPage";

import FirstForm from "./components/NavMenu/ApplyLoan/FirstForm";
import LoanForm from "./components/NavMenu/ApplyLoan/LoanForm";
import ApplicantInfo from "./components/NavMenu/ApplyLoan/ApplicantInfo";
import ApplicantBankInfo from "./components/NavMenu/ApplyLoan/ApplicantBankInfo";
import ApplicantGuarantorInfo from "./components/NavMenu/ApplyLoan/ApplicantGuarantorInfo";
import GuarantorIdentity from "./components/NavMenu/ApplyLoan/GuarantorIdentity";
import ApplicantIdentity from "./components/NavMenu/ApplyLoan/ApplicantIdentity";
import ApplicantPhotoAndSignature from "./components/NavMenu/ApplyLoan/ApplicantPhotoAndSignature";
import LearnSteaper from "./components/NavMenu/ApplyLoan/LearnSteaper";

function App() {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.AuthSlice);
  const { profileCreated } = useSelector((state) => state.viewUserSlice);
  const userToken = localStorage.getItem("token");

  // const id=localStorage.getItem("id")
  // const profileCreated = data?.data?.adminInfo?.profileCreated;
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={userToken ? <Navigate to="/layout/dashboard" /> : <Signin />}
        />
        <Route
          path="forgetpassword"
          element={
            userToken ? <Navigate to="/layout/dashboard" /> : <ForgotPassword />
          }
        />
        <Route
          path="signinbyotp"
          element={
            userToken ? <Navigate to="/layout/dashboard" /> : <SignInByOtp />
          }
        />
        <Route
          path="resetpassword"
          element={
            userToken ? <Navigate to="/layout/dashboard" /> : <ResetPassword />
          }
        />
        {/* <Route path="resetpassword" element={<ResetPassword />} /> */}
        {/* <Route path="logout" element={<ResetPassword />} /> */}
        {/* <Route path="/" element={<PrivateRoute userToken={userToken} />}> */}
        <Route
          path="layout"
          element={
            userToken ? <Layout userToken={userToken} /> : <Navigate to="/" />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="branches" element={<Dashboard />} /> */}
          {/* -----Profile Route--------- */}
          <Route
            path="profile"
            element={profileCreated ? <Profile /> : <ProfileForm />}
          />
          <Route path="viewprofile" element={<Profile />} />
          <Route path="profileForm" element={<ProfileForm />} />
          <Route path="editProfile" element={<EditProfile />} />
          {/*------------ Branches Route------ */}
          <Route path="branches" element={<Branches />} />
          <Route path="addBranch" element={<AddBranchForm />} />
          <Route path="edit-branch" element={<EditBranchForm />} />
          <Route path="view-branch" element={<ViewBranch />} />
          <Route path="soft-delete-branch" element={<RestoreBranch />} />
          {/* ----------Agentes Routes ----------- */}
          <Route path="agents" element={<Agent />} />
          <Route path="add-agents" element={<AddAgentForm />} />
          <Route path="edit-agents" element={<EditAgentForm />} />
          <Route path="view-agents" element={<ViewAgent />} />
          <Route path="soft-delete-agent" element={<RestoreAgent />} />
          {/* ----------Clients Routes ----------- */}
          <Route path="clients" element={<Client />} />
          <Route path="add-clients" element={<AddClient />} />
          <Route path="edit-client" element={<EditClientForm />} />
          <Route path="view-clients" element={<ViewClient />} />
          <Route path="soft-delete-client" element={<RestoreClient />} />
          {/* ----------Employee Routes ----------- */}
          <Route path="employees" element={<Employee />} />
          <Route path="view-employee" element={<ViewEmployee />} />
          <Route path="soft-delete-employee" element={<RestoreEmployee />} />
          <Route path="add-employee" element={<AddEmployeeForm />} />
          <Route path="edit-employee" element={<EditEmployeeForm />} />
          {/* ----------Products ------------ */}
          <Route path="products" element={<Products />} />
          <Route path="view-product" element={<ViewProduct />} />
          <Route path="soft-delete-product" element={<RestoreProducts />} />
          <Route path="add-product" element={<AddProductForm />} />
          <Route path="edit-product" element={<EditProductForm />} />
          <Route path="product-info" element={<ProductInfo />} />
          {/* ----------Notification ------------- */}
          <Route path="notification-layout" element={<NotificationLayout />} />
          <Route path="notification" element={<Notification />} />
          {/*-------------------- Loan--------------- */}
          <Route path="default-form" element={<DefaultForm />} />
          <Route path="first-form" element={<FirstForm />} />
          <Route path="loan-Details" element={<LoanForm />} />
          <Route path="applicant-info" element={<ApplicantInfo />} />
          <Route path="applicant-bank-info" element={<ApplicantBankInfo />} />
          <Route
            path="applicant-guarantor-info"
            element={<ApplicantGuarantorInfo />}
          />
          <Route
            path="guarantor-identity-upload"
            element={<GuarantorIdentity />}
          />
          <Route
            path="applicant-identity-upload"
            element={<ApplicantIdentity />}
          />
          <Route
            path="applicant-photo-signature"
            element={<ApplicantPhotoAndSignature />}
          />
          {/* <Route path="applicant-info" element={<ApplicantInfo />} /> */}
          <Route path="steaper" element={<LearnSteaper />} />
        </Route>

        {/* </Route> */}
      </Routes>
    </main>
  );
}

export default App;
