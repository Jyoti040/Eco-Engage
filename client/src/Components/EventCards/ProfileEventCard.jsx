import React from 'react';
import register from '../../assets/register.jpg'
import { MapPin , Calendar} from 'lucide-react';
import { Link } from 'react-router-dom';
import {format} from 'date-fns'

const ProfileEventCard = (event) => {
   console.log(event)
   const updatedEvent = event.event
   console.log('profile event card 1',event.event.eventName)
  return (
    <div>
        <div className='flex flex-col lg:flex-row mt-8 border-b border-black pb-6'>
           <div className='lg:w-2/3'>
             {
               !updatedEvent.eventPoster &&  <img
               src={register} alt='event-img' 
               className='w-full lg:w-2/3 h-60'
               />
             }
             {
               updatedEvent.eventPoster &&  <img
               src={updatedEvent.eventPoster} alt='event-img' 
               className='w-full lg:w-2/3 h-60'
               />
             }
           </div>
           <div >
             <h2 className='text-3xl font-semibold mb-2 text-center '>{updatedEvent.eventName}</h2>
             <p className='mx-2 pl-4 text-center'>{updatedEvent.eventDescription}</p>
             {/* <p className='mx-2'> Consectetur recusandae debitis laudantium adipisci fugit, consequatur voluptatibus explicabo molestiae tempora.</p> */}
             <div className='flex flex-col lg:flex-row mt-4 lg:space-x-10 items-center lg:justify-between '>
                <div className='flex flex-col lg:pl-4'>
                    <h5 className='font-semibold'>When</h5>
                    <div className='flex space-x-2 mt-2'>
                       <Calendar/>
                       <p>{format(updatedEvent.eventDate,'PPpp')}</p>
                    </div>
                </div>
                <div className='flex flex-col mt-4 lg:mt-0 lg:pl-4'>
                    <h5 className='font-semibold'>Where</h5>
                    <div className='flex space-x-2 mt-2'>
                       <MapPin/>
                       <p>{updatedEvent.eventCity} , {updatedEvent.eventCountry}</p>
                    </div>
                </div>
             </div>
             
             <div className=' w-full rounded-xl  text-center bg-gray-400 font-semibold  mt-6 mb-4 text-lg py-1 mx-auto '>
             <Link to={`/view/event-details/${updatedEvent._id}`} state={updatedEvent}>
                  View More
             </Link>
             </div>
           </div>
        </div>
    </div>
  )
}

export default ProfileEventCard