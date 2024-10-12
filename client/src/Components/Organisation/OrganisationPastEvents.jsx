import React , {useEffect, useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext';
import ProfileEventCard from '../EventCards/ProfileEventCard';
import { useParams } from 'react-router-dom';

const backendURL = import.meta.env.VITE_BACKEND_URL

// /api/v1/organisation/:orgId/upcoming-events
const OrganisationPastEvents = () => {
    const [iserror , setIsError] = useState(false) 
    const [error , setError] = useState('')
    const [loading,setLoading] = useState(true)
    const [events,setEvents] = useState([])
    const params = useParams()
    console.log('params',params)

    const {isOrganisation , organisation} = useAuth()
    console.log(organisation._id)
    const orgId=organisation._id ||  params.orgId
    
    useEffect(()=>{
        axios.get(`${backendURL}api/v1/organisation/${orgId}/past-events`)
        .then((res)=>{
           console.log('org past events',res)
           setLoading(false)
           setEvents(res.data.pastEvents)
        }).catch((err)=>{
            setLoading(false)
            setIsError(true)
            setError(err.response.data.message)
        })
    },[])
     
        
    const heading =  <h1 className="lg:text-left lg:ml-4 font-bold text-4xl px-3 my-8 text-secondaryDarkGreen">
    Past events
  </h1>
  if(loading){
    return <p className='text-md my-10 px-2'>Loading data</p>
  }
    if(!events || events.length<1){
      return (
        <div>
          {heading}
          <div className='text-2xl font-semibold p-2 my-10'>No past events !</div>
        </div>
      )
    }
    return (
    <div>
      {heading}
        {iserror && <p className='text-red-500 text-center m-4 text-md'>{error}</p>}
      {iserror && <p className='text-red-500 text-center m-4 text-md'>{error}</p>}
      {events.length=== 0 && <p className='font-seminold text-md p-4'>No past  events !</p>}
      {events.map((event,index)=>(

        <div key={index}>
           <ProfileEventCard event={event}/>
        </div>
      ))}
    </div>
  )
}



export default OrganisationPastEvents