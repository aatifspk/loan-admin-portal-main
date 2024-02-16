import axios from "axios";
import { Navigate } from "react-router-dom";

const login=async(email,password,rememberMe)=>{
 axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/signIn`,{
        email,
        password
    })
    .then((response) => {
        // console.log("🚀 ~ file: auth.services.js:10 ~ .then ~ response:", response)
        	return response
    	
    })
    .catch((error)=>console.log(error))


}

export default login