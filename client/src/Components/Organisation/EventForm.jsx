import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const backendURL = import.meta.env.VITE_BACKEND_URL

const EventForm = () => {

  const [isError , setIsError] = useState(false)
  const [error , setError] = useState('')
  const [submit , setSubmit] = useState(false)
  const [formData, setFormData] = useState({
    eventDate: '', eventCountry: '',
    eventDescription: '', eventCity: '',
    eventName: '', eventMode: '',
    eventPoster : ''
  })


  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formData)
    const updatedformData = new FormData();
    updatedformData.append('eventName',formData.eventName);
    updatedformData.append('eventDate',formData.eventDate);
    updatedformData.append('eventCountry',formData.eventCountry);
    updatedformData.append('eventCity',formData.eventCity);
    updatedformData.append('eventMode',formData.eventMode);
    updatedformData.append('eventDescription',formData.eventDescription);
    updatedformData.append('eventPoster',formData.eventPoster);
   await axios.post(`${backendURL}api/v1/events`,updatedformData,{
    withCredentials : true
   })
   .then((res)=>{
       setSubmit(true)
       console.log(res.data.newEvent)
       setTimeout(()=>{
         navigate('/organisation/upcoming-events')
       },2000)
   })
   .catch((err)=>{
      console.log(err)
   })
  }
  return (
    <div className='bg-gray-100'>
      <div className='flex justify-center mt-10'>
        <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-md flex flex-col  gap-y-4" onSubmit={handleSubmit}>
          <h1 className='font-bold text-center text-4xl'>Create an event</h1>
          {isError && <p className='text-lg text-red-500 py-4 px-2'>Error while creating an event</p>}
          {submit && <p className='text-lg text-green-500 py-4 px-2'>Form created successfully</p>}
          <div className='flex lg:flex-row flex-col space-y-3 my-2 '>
            <label htmlFor='eventName' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event Name : </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right "
              type='text' required
              id='eventName' name='eventName' value={formData.eventName} onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
            />

          </div>

          <div className='flex lg:flex-row flex-col space-y-3 my-2'>
            <label htmlFor='eventDate' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event Date : </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right " type='date'
              id='eventDate' name='eventDate' value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              required />

          </div>

          <div className='flex lg:flex-row flex-col space-y-3 my-2'>
            <label htmlFor='eventName' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event Mode : </label>
            <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right "
              id='eventMode' name='eventMode' value={formData.eventMode} onChange={(e) => setFormData({ ...formData, eventMode: e.target.value })}
              required>
              <option value='online'>Online</option>
              <option value='offline'>Offline</option>
            </select>
          </div>

          <div className='flex lg:flex-row flex-col space-y-3 my-2'>
            <label htmlFor='eventCountry' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event Country : </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right " type='text'
              id='eventCountry' name='eventCountry' value={formData.eventCountry} onChange={(e) => setFormData({ ...formData, eventCountry: e.target.value })}
              required />

          </div>

          <div className='flex lg:flex-row flex-col space-y-3 my-2'>
            <label htmlFor='eventCity' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event City : </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right " type='text'
              id='eventCity' name='eventCity' value={formData.eventCity} onChange={(e) => setFormData({ ...formData, eventCity: e.target.value })}
              required />

          </div>
          <div className='flex lg:flex-row flex-col space-y-3 my-2'>
            <label htmlFor='eventPoster' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event Poster : </label>
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right " 
              id='eventPoster' name='eventPoster' type='file' onChange={(e) => setFormData({ ...formData, eventPoster: e.target.files[0] })}
              required />

          </div>

          <div className='flex lg:flex-row flex-col space-y-3 my-4'>
            <label htmlFor='eventDescription' className="block text-gray-700 pt-4 font-bold md:text-left mb-1 sm:w-1/3 sm:pr-4">Event Description : </label>
            <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-right " type='text'
              id='eventDescription' name='eventDescription' value={formData.eventDescription} onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
            ></textarea>

          </div>

          <button type='submit' className='bg-orange-400 rounded-md text-center px-6 py-2 text-white font-medium text-lg'>
            Create event
          </button>
        </form>
      </div>
    </div>
  )
}

export default EventForm