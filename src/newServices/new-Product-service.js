import axios from "axios";
// import { authHeader } from "./auth-headers";


const authToken = localStorage.getItem("token");


const getParticularProduct = async (id ) => {


  return await axios.get(`http://localhost:8080/api/admin/getParticularProduct/${id}`, {
    headers:  {
      Authorization: `Bearer ${authToken}`,
    }
    
  });

 
};



const editProductProduct = async (data ) => {


  return await axios.post(`http://localhost:8080/api/admin/createproduct`, data, {
    headers:  {
      Authorization: `Bearer ${authToken}`,
    }
    
  });

 
};



// const logout = () => {
//   localStorage.removeItem("_stl");
//   <Navigate to="/login" />;
// };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getParticularProduct,editProductProduct};
