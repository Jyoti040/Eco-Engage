import React from 'react'
import register from '../../assets/register.jpg'
import { Link } from 'react-router-dom'

const HomeEventCard = (event) => {
  const updatedEvent = event.event
  console.log('in home event card',updatedEvent)
  return (
    <div>
        <div className='flex flex-col rounded space-y-4 bg-white shadow-md transition-transform duration-300 hover:transform hover:scale-105 hover:border hover:border-secondaryDarkGreen hover:shadow-xl'>
            <div>
               {
                !updatedEvent.eventPoster &&  <img
                src={register} alt='event-img'
                className='h-32 w-60 rounded-lg mx-auto '
              />
               }
               {
                updatedEvent.eventPoster &&  <img
                src={updatedEvent.eventPoster} alt='event-img'
                className='h-32 w-60 rounded-lg mx-auto mt-2'
              />
               }
            </div>
            <div className='ml-4'>
                <h2 className='text-3xl font-semibold mb-2 text-center lg:text-left'>{updatedEvent.eventName}</h2>
                <p className='mb-4'>{updatedEvent.eventDescription}</p>
                <div className='mb-6'>
                    <Link to={`/view/event-details/${updatedEvent._id}`} state={event} className='rounded-xl w-1/3 text-center bg-gray-400 font-semibold  text-lg py-1 px-4 '>View Details</Link>
                </div>
            </div>
         </div>
    </div>
  )
}

export default HomeEventCard