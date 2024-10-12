import React, { useState } from 'react'
import {User2Icon , Grid , Calendar , CalendarCheck ,  PlusIcon , ArrowLeft , ArrowRight ,LogOutIcon , HouseIcon} from 'lucide-react'
import AllPastEvents from './AllPastEvents'

const classes = 'flex items-center space-x-2 my-2'

const navItems = [
    {
        icon : <Grid/>,
        text : 'Overview'
    },
    {
        icon : <Calendar/>,
        text : 'Upcoming events'
    },
{
        icon : <CalendarCheck/>,
        text : 'Past events'
    },
{
        icon : <User2Icon/>,
        text : 'Profile'
    },
    {
        icon: <LogOutIcon />,
        text: 'Logout',
      },
      {
        icon: <HouseIcon />,
        text: 'Home Page',
      }
]

const AuthNavbar = () => { 
   
  return (
    <div>
        <nav className="navbar sticky top-0 z-20 w-full border-b block  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <div className="max-w-screen-xl flex flex-wrap  justify-between py-6 mx-2 md:mx-auto  navbar-items">
                {
                    navItems.map((item)=>
                     <div className={`${classes}`}>
                       {item.icon}
                       <span>{item.text}</span>
                    </div>)
                } 
               
            </div>
        </nav>  

        <AllPastEvents/>  
    </div>
  )
}

export default AuthNavbar