import React , {useState}from 'react'
import ProfileEventCard from '../EventCards/ProfileEventCard'
import AboutOrganisation from './AboutOrganisation'
import OrganisationPastEvents from './OrganisationPastEvents'
import OrganisationUpcomingEvents from './OrganisationUpcomingEvents'

const menu =(organisation)=>[
   {
    id: 1,
    title : 'Overview' ,
    content : <Overview organisation={organisation}/>
  },
   {
    id: 2,
    title : 'Past Events' ,
    content : <OrganisationPastEvents/>
},
   {
    id: 3,
    title : 'Upcoming Events' ,
     content : <OrganisationUpcomingEvents/>   
}
]

const GeneralProfileTab = ({organisation}) => {

 const [activeIndex , setActiveIndex] = useState(1)

 const handleClick = (index) => setActiveIndex(index)

 const checkActiveList = (index , className) => activeIndex === index ? className : ""
 const checkActiveContent = (index , className) => activeIndex === index ? className+" block" : "hidden"

  return (
    <div>
       <div className='flex items-center justify-around space-x-2 border-b border-lg border-gray-500 pb-4 text-sm lg:text-xl'>
         {menu(organisation).map((item)=>
         <button key={item.id} className={`${checkActiveList(item.id,'bg-blue-500 mb-0 px-4 py-4 lg:px-10 lg:py-4 rounded ')}`} onClick={()=>handleClick(item.id)}>{item.title}</button>
        )}
       </div> 
       <div className=''>
         {menu(organisation).map((item)=>
         <button key={item.id} className={`panel ${checkActiveContent(item.id,'')}`} >{item.content}</button>
         )}
        </div> 
    </div>
  )
}

export default GeneralProfileTab

const Overview = ({ organisation }) => {
  return (
    <div className='p-4 w-full '>
      <div className='grid grid-cols-1 space-y-8'>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation name</h2>
          <p>{organisation.organisationName}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation Email</h2>
          <p>{organisation.organisationEmail}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation country</h2>
          <p>{organisation.country}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation city</h2>
          <p>{organisation.city}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation website</h2>
          <p>{organisation.organisationWebsite}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation instagram</h2>
          <p>{organisation.instagram}</p>
        </div>
        <div className='flex flex-col space-y-2'>
          <h2 className='font-bold'>Organisation twitter</h2>
          <p>{organisation.twitter}</p>
        </div>
      </div>
    </div>
  );
};
