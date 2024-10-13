import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import ProfileEventCard from '../EventCards/ProfileEventCard';


const backendURL = import.meta.env.VITE_BACKEND_URL

// /api/v1/organisation/:orgId/upcoming-events
const OrganisationUpcomingEvents = () => {
    const [iserror , setIsError] = useState(false) 
    const [error , setError] = useState('')
    const [loading,setLoading] = useState(true)
    const [events,setEvents] = useState([])

    const {isOrganisation , organisation} = useAuth()
    console.log(organisation._id)
    const orgId=organisation._id
  
    useEffect(()=>{
        axios.get(`${backendURL}api/v1/organisation/${orgId}/upcoming-events`)
        .then((res)=>{
           console.log('org upc events',res)
           setLoading(false)
           setEvents(res.data.upcomingEvents)
        }).catch((err)=>{
            setLoading(false)
            setIsError(true)
            setError(err.response.data.message)
        })
    },[])
     
    const heading =  <h1 className="lg:text-left lg:ml-4 font-bold text-4xl px-3 my-8 text-secondaryDarkGreen">
    Upcoming events
  </h1>
    if(!events || events.length<1){
      return (
        <div>
          {heading}
          <div className='text-2xl font-semibold p-2 my-10 px-3 lg:ml-4'>No upcoming events !</div>
        </div>
      )
    }
  

    events.map((event)=>{
      console.log(event)
    })
    return (
    <div>
{heading}
      {iserror && <p className='text-red-500 text-center m-4 text-md'>{error}</p>}
      {events.length=== 0 && <p className='font-semibold text-md p-4 text-2xl my-10'>No upcoming  events !</p>}
      {events.map((event,index)=>(

        <div key={index}>
           <ProfileEventCard event={event}/>
        </div>
      ))}
    </div>
  )
}



export default OrganisationUpcomingEvents