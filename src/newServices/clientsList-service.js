import axios from "axios";
// import { authHeader } from "./auth-headers";


const authToken = localStorage.getItem("token");


const getActiveUndeletedClinets = async ( ) => {

    return await axios.get(
        `http://localhost:8080/api/admin/getAllActiveUndeletedClinets`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

};



// const logout = () => {
//   localStorage.removeItem("_stl");
//   <Navigate to="/login" />;
// };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getActiveUndeletedClinets};
