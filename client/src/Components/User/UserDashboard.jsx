import React, { useState } from 'react'
import SideBar from '../SideBar'
import { User2Icon, Grid, Calendar, CalendarCheck, PlusIcon, ArrowLeft, ArrowRight, LogOutIcon ,HouseIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const navItems1 = [
    {
      icon: <Grid />,
      text: 'Overview',
    },
    {
      icon: <Calendar />,
      text: 'Upcoming events',
    },
    {
      icon: <CalendarCheck />,
      text: 'Past events',
    },
    {
      icon: <HouseIcon />,
      text: 'Home Page',
    }
  ] 
  const navItems2=[
    {
      icon: <User2Icon />,
      text: 'Profile',
    },
    {
      icon: <LogOutIcon />,
      text: 'Logout',
    },
  ];
const backendURL = import.meta.env.VITE_BACKEND_URL

const UserDashboard = () => {
   const navigate = useNavigate()
   const [error , setError] = useState(false)
    const {user , isUser,setIsUser}=useAuth()
    console.log('in user dahboard')
    console.log(user)

    const handleLogout = async ()=>{
          await axios.get(`${backendURL}auth/logout`,{withCredentials : true})
          .then((res)=>{
            console.log('logged out')
            setIsUser(false)
             navigate('/')
          }).catch((err)=>{
             setError(true)
          })
    }
    const handleDelete = async ()=>{
          await axios.delete(`${backendURL}api/v1/user/${user._id}/delete-account`,{withCredentials : true})
          .then((res)=>{
            console.log('deleted')
            setIsUser(false)
             navigate('/')
          }).catch((err)=>{
             setError(true)
          })
    }

  return (
    <div>
        <h1 className='text-xl lg:text-3xl mt-8 text-center'>Welcome to overview section</h1>
        {error && <p className='text-md text-center text-red-500 p-3'>Error while logging u out</p>}
        <div className='flex space-x-8 my-8 justify-center'>
        <button className='bg-blue-500 p-4 text-white' onClick={()=>handleLogout()}>Logout </button>
        <button className='bg-red-500 p-4 text-white' onClick={()=>handleDelete()}>Delete acc </button>
        </div>
    </div>
  )
}

export default UserDashboard