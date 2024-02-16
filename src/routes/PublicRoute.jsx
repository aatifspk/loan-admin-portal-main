import Loading from '@/components/Loading'
import React, { Suspense, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {

    const [isLoggedIn,setIsLoggedIn]=useState()

    return isLoggedIn?
    (<Navigate to='/dashboard' replace/>)
    :
    (
        <Suspense fallback={<Loading/>}>
            <Outlet/>
        </Suspense>
    )
  
}

export default PublicRoute
// npm i redux ,react-redux
