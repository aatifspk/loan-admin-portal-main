import axios from "axios";
// import { authHeader } from "./auth-headers";


const authToken = localStorage.getItem("token");


// const getParticularProduct = async (id ) => {


//   return await axios.get(`http://localhost:8080/api/admin/getParticularProduct/${id}`, {
//     headers:  {
//       Authorization: `Bearer ${authToken}`,
//     }
    
//   });

 
// };



const submitLoanForm = async (data ) => {


  return await axios.post(`http://localhost:8080/api/admin/adminSubmitLoanDetailsForm`, data, {
    headers:  {
      Authorization: `Bearer ${authToken}`,
    }
    
  });

 
};



const editLoanForm = async (id,data ) => {


    return await axios.post(`http://localhost:8080/api/admin/adminEditLoanDetailsForm/${id}`, data, {
      headers:  {
        Authorization: `Bearer ${authToken}`,
      }
      
    });
  
   
  };



export default {editLoanForm, submitLoanForm};
