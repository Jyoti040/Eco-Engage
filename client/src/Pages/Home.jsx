import React, { useEffect, useState } from 'react'
import AllUpcomingEvents from '../Components/AllUpcomingEvents'
import AllPastEvents from '../Components/AllPastEvents'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import bg2 from '../assets/bg2.jpg'
import aboutus from '../assets/about-us.jpg'

const Typewriter = ({text,speed})=>{
    const [displayText , setDisplayText ] = useState('')
    const [index , setIndex ] = useState(0)

    useEffect(()=>{

      const handler = ()=>{
        if(index<text.length){
          setDisplayText((prev)=>prev+text[index])
          setIndex((prev)=>prev+1)
        }else{
          setTimeout(()=>{
            setDisplayText('')
            setIndex(0)
          },2000)
        }
      }
      const timer = setTimeout(handler , speed);
      return ()=>clearTimeout(timer)
    },[index,speed,text])

    return <span>{displayText}</span>
}
const Home = () => {
  const navigate = useNavigate()
  console.log('in home page,',useAuth().isUser)
  return (
    <div>
       <div className='relative w-full mx-auto mt-0'>
         <img
          src={bg2} alt='intro-img'
          className='w-full h-96 '
         />

         <div className='absolute inset-0 py-32 text-center bg-black bg-opacity-50 '>
            <h2 className='text-white text-4xl font-extrabold '>
              <Typewriter text={'Welcome to EcoEngage'} speed={200}/>
            </h2>
            {/* <span className="border-r-4 border-white animate-blink"></span> */}
            <p className='text-xl text-white pt-4 '> Your all-in-one platform for connecting with environmental initiatives and making a positive impact. </p>
              <br/>
             <button type='button' onClick={()=>navigate('/login')} className='mt-1 lg:mt-0 animate-slideIn9 py-2 lg:ml-20 w-full mx-auto lg:w-1/3  bg-blue-700 rounded text-md text-white text-center'>Get Started</button>

         </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 lg:px-24 flex flex-col mt-10 lg:flex-row items-center lg:space-x-20 mb-20" id='about-us'>
          <div className='flex justify-center items-center pt-10 transition-transform duration-300 hover:transform hover:scale-105  hover:shadow-xl'>
            <img
             src={aboutus} alt='about-us-img' 
             className='w-full h-96 rounded-lg shadow-lg '
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left" id='about-us'>
            <div className="flex items-center mb-10 justify-center lg:justify-start mt-10">
              <div className="flex-grow  border-t border-secondaryDarkGreen"></div>
              <h2 className="text-3xl text-secondaryDarkGreen font-bold mx-4 animate-fadeIn">
  About Us
</h2>
              <div className="flex-grow  border-t border-secondaryDarkGreen"></div>
            </div>
            <p className="text-lg text-gray-700 mb-4">
            Whether you're an organization aiming to expand your reach or an individual seeking to actively engage in environmental events, EcoEngage has got you covered.
             Our platform aims to  bridge the gap between organizations and individuals by promoting eco-friendly initiatives. 
             <br/> <br/>
             As an organization can easily post and share their events, amplifying their visibility and impact. 
             Meanwhile, as users you  can discover and participate in these activities, contributing to a stronger, more involved community dedicated to sustainability and environmental progress.
          
            </p>
          </div>

          <div>
          </div>
       </div>

       <div id='events'>
        <AllUpcomingEvents homePage={true}/>
       </div>

       <div className='mt-16'>
        <AllPastEvents homePage={true}/>
       </div>
    </div>
  )
}

export default Home