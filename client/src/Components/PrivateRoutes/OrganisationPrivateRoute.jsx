import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const OrgansiationPrivateRoute = () => {

    const {isOrganisation  , loading} = useAuth() 
  console.log('in Organsiation private route',isOrganisation)

  if(loading){
    return (
      <div className='text-2xl font-semibold'>Hang on , while we are fetching your data</div>
    )
  }
  if(isOrganisation){
    return <Outlet/>
  }
  else{
    return <Navigate to='/'/>
  }
}

export default OrgansiationPrivateRoute
