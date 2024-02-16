import layout from "./layout";
import AuthSlice from "@/redux/slices/AuthSlice";
import ProfileSlice from "@/redux/slices/ProfileSlice";
import stateSlice from "@/redux/slices/StateSlice";
import viewUserSlice from "@/redux/slices/ViewAuth";
// ----------Branch --------------
import branchSlice from "@/redux/slices/BranchSlice";
import addBranchSlice from "@/redux/slices/AddBranchSlice";
import FilterBranch from "@/redux/slices/FilterBranch";
import EditBranchSlice from "@/redux/slices/EditBranchSlice";
import SoftDeleteBranchSlice from "@/redux/slices/SoftDeleteBranchSlice";
import RestoreBranchSlice from "@/redux/slices/RestoreBranchSlice";
import PermanentDeleteSlice from "@/redux/slices/PermanentDeleteSlice";
import Pagination from "@/redux/slices/Pagination";
import InActiveBranch from "@/redux/slices/InActiveBranch";
import getBranchsSoftDeleteListSlice from "@/redux/slices/getBranchsSoftDeleteList";
import ViewBranch from "@/redux/slices/ViewBranch";
// -------------Agent -----------------
import AgentSlice from "@/redux/slices/Agent/AgentSlice";
import FilterAgent from "@/redux/slices/Agent/FilterAgent";
import AddAgent from "@/redux/slices/Agent/AddAgent";
import EditAgent from "@/redux/slices/Agent/EditAgent";
import SoftDeleteAgent from "@/redux/slices/Agent/SoftDeleteAgent";
import ViewAgent from "@/redux/slices/Agent/ViewAgent";
import GetSoftDeleteAgentList from "@/redux/slices/Agent/GetSoftDeleteAgentList";
import RestoreAgent from "@/redux/slices/Agent/RestoreAgent";
import permanentDeleteAgent from "@/redux/slices/Agent/permanentDeleteAgent";
import AgentInactive from "@/redux/slices/Agent/AgentInactive";
import AgentPagination from "@/redux/slices/Agent/AgentPagination";
// -------------Client -----------------
import AddClient from "@/redux/slices/Client/AddClient";
import ViewClient from "@/redux/slices/Client/ViewClient";
import Client from "@/redux/slices/Client/Client";
import ClientInactive from "@/redux/slices/Client/ClientInActive";
import GetSoftDeleteClientList from "@/redux/slices/Client/GetSoftDeleteClientList";
import SoftDeleteClient from "@/redux/slices/Client/SoftDeleteClient";
import RestoreClient from "@/redux/slices/Client/RestoreClient";
import PermanentDeleteClient from "@/redux/slices/Client/PermanentDeleteClient";
import FilterClient from "@/redux/slices/Client/FilterClient";
import EditClient from "@/redux/slices/Client/EditClient";
import ClientPagination from "@/redux/slices/Client/ClientPagination";
// -------------Employee -----------------
import AddEmployee from "@/redux/slices/Employee/AddEmployee";
import EditEmployee from "@/redux/slices/Employee/EditEmployee";
import ViewEmployee from "@/redux/slices/Employee/ViewEmployee";
import Employee from "@/redux/slices/Employee/Employee";
import FilterEmployee from "@/redux/slices/Employee/FilterEmployee";
import EmployeeInActive from "@/redux/slices/Employee/EmployeeInActive";
import SoftDeleteEmployee from "@/redux/slices/Employee/SoftDeleteEmployee";
import RestoreEmployee from "@/redux/slices/Employee/RestoreEmployee";
import GetSoftDeleteEmployee from "@/redux/slices/Employee/GetSoftDeleteEmployee";
import EmployeePagination from "@/redux/slices/Employee/EmployeePagination";

// -------Products(Loan) --------------
import AddProduct from "@/redux/slices/Products/AddProduct";
import Products from "@/redux/slices/Products/Products";
import ViewProduct from "@/redux/slices/Products/ViewProduct";
import SoftDeleteProduct from "@/redux/slices/Products/SoftDeleteProduct";
import RestoreProduct from "@/redux/slices/Products/RestoreProduct";
import PermanentDeleteProduct from "@/redux/slices/Products/PermanentDeleteProduct";
import GetSoftDeleteProductList from "@/redux/slices/Products/GetSoftDeleteProductList";
import FilterProduct from "@/redux/slices/Products/FilterProduct";
import ProductPagination from "@/redux/slices/Products/ProductPagination";
import ProductInActive from "@/redux/slices/Products/ProductInActive";
import CreateProductInfo from "@/redux/slices/Products/CreateProductInfo";
import GetParticularProductInfo from "@/redux/slices/Products/GetParticularProductInfo";
import GetProductInfoList from "@/redux/slices/Products/GetProductInfoList";
import LoanDetail from "@/redux/slices/applicantLoanSclice"
import LoanFormDetail from "@/redux/ApplyLoan/loanFormSclice"

// ------------------ Notification -------------------
import SuperAdminNotification from "@/redux/slices/Notification/SuperAdminNotification";
const rootReducer = {
  layout,
  AuthSlice,
  ProfileSlice,
  stateSlice,
  viewUserSlice,
  // -------------Branch -----------------

  branchSlice,
  addBranchSlice,
  FilterBranch,
  EditBranchSlice,
  SoftDeleteBranchSlice,
  RestoreBranchSlice,
  PermanentDeleteSlice,
  Pagination,
  InActiveBranch,
  getBranchsSoftDeleteListSlice,
  ViewBranch,
  // -------------Agent -----------------

  AgentSlice,
  FilterAgent,
  AddAgent,
  EditAgent,
  SoftDeleteAgent,
  ViewAgent,
  GetSoftDeleteAgentList,
  RestoreAgent,
  permanentDeleteAgent,
  AgentInactive,
  AgentPagination,
  // -------------Client -----------------
  AddClient,
  ViewClient,
  Client,
  ClientInactive,
  GetSoftDeleteClientList,
  SoftDeleteClient,
  RestoreClient,
  PermanentDeleteClient,
  FilterClient,
  EditClient,
  ClientPagination,
  // -------------Employee -----------------
  AddEmployee,
  EditEmployee,
  ViewEmployee,
  Employee,
  FilterEmployee,
  EmployeeInActive,
  SoftDeleteEmployee,
  RestoreEmployee,
  GetSoftDeleteEmployee,
  EmployeePagination,
  // ------------Products ------------------
  AddProduct,
  Products,
  ViewProduct,
  SoftDeleteProduct,
  RestoreProduct,
  PermanentDeleteProduct,
  GetSoftDeleteProductList,
  FilterProduct,
  ProductPagination,
  ProductInActive,
  CreateProductInfo,
  GetParticularProductInfo,
  GetProductInfoList,

  // --------------- Notification -------------
  SuperAdminNotification,

  // ---------------- Loan Deatil ------------
  LoanDetail,
  LoanFormDetail
};

// export default persistedReducer;
export default rootReducer;
