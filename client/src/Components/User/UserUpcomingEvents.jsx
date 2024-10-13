import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ProfileEventCard from '../EventCards/ProfileEventCard'

const backendURL = import.meta.env.VITE_BACKEND_URL
const UserUpcomingEvents = () => {

  const [event ,setEvents] = useState([])
  const [loading , setLoading] = useState(true)
  const {user }= useAuth()
  const userId = user._id
  console.log(userId)
  
  useEffect(()=>{
     axios.get(`${backendURL}api/v1/user/${userId}/upcoming-events`,{withCredentials : true})
     .then((res)=>{
      console.log('Upcoming user events -',res.data.UpcomingEvents)
          setEvents(res.data.UpcomingEvents)
          setLoading(false)
       //   console.log('Upcoming user events -',event)
     }).catch((err)=>{
        return(
          <div>Error while fetching data , {err.message}</div>
        )
     })
  },[])

  const heading =  <h1 className="lg:text-left lg:ml-4 font-bold text-4xl px-3 my-8 text-secondaryDarkGreen">
  Upcoming events
</h1>
  if(loading){
    return (
      <div>
        {heading}
        <div className='text-2xl font-semibold p-2 my-10'>Hang on , while we are fetching your data</div>
      </div>
    )
  }

  if(!event || event.length<1){
    return (
      <div>
        {heading}
        <div className='text-2xl font-semibold p-2 my-10 px-3 lg:ml-4'>No upcoming events !</div>
      </div>
    )
  }
  return (
    <div className='mx-2 my-10'>
      {
        event.map((e,index)=>(
             <div key={index}>
               <ProfileEventCard event={e}/>
             </div>
        ))
      }
    </div>
  )
}

export default UserUpcomingEvents