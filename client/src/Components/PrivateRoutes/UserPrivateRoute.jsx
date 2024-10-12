import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const UserPrivateRoute = () => {

    const {isUser , isOrganisation , loading} = useAuth() 
  console.log('in user private route',isUser)

  if(loading){
    return (
      <div className='text-2xl font-semibold'>Hang on , while we are fetching your data</div>
    )
  }
  if(isUser){
    return <Outlet/>
  }
  else{
    return <Navigate to='/'/>
  }
}

export default UserPrivateRoute
