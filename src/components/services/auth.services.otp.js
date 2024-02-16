import axios from 'axios'

const loginBYOtp=({email,otp})=>{
axios.get('http://localhost:8080/api/admin/signInByOtp')

.then(res=>console.log(res))
.catch(err=>console.log(err))
}

export default loginBYOtp