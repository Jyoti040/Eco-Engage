import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ProfileEventCard from '../EventCards/ProfileEventCard'

const backendURL = import.meta.env.VITE_BACKEND_URL
const UserPastEvents = () => {

  const [event ,setEvents] = useState([])
  const [loading , setLoading] = useState(true)
  const {user }= useAuth()
  const userId = user._id
  console.log(userId)
  
  useEffect(()=>{
     axios.get(`${backendURL}api/v1/user/${userId}/past-events`,{withCredentials : true})
     .then((res)=>{
      console.log('past user events -',res.data.pastEvents)
          setEvents(res.data.pastEvents)
          setLoading(false)
       //   console.log('past user events -',event)
     }).catch((err)=>{
        return(
          <div>Error while fetching data , {err.message}</div>
        )
     })
  },[])
  const heading =  <h1 className="lg:text-left lg:ml-4 font-bold text-4xl px-3 my-8 text-secondaryDarkGreen">
  Past events
</h1>
  if(!event || event.length<1){
    return (
      <div>
        {heading}
        <div className='text-2xl font-semibold p-2 my-10'>No past events !</div>
      </div>
    )
  }

  // if(loading){
  //   return (
  //     <div>Hang on , while we are fetching your data</div>
  //   )
  // }
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

export default UserPastEvents