import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const PrivateRoute = ({isAuthenticated}) => {
    console.log(isAuthenticated)
    toast.warn("You Are Not Authorized  ")
  return isAuthenticated?<Outlet/>:<Navigate to='/'/>
}

export default PrivateRoute
