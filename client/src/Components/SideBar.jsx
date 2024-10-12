import React, { useState } from 'react';
import login from '../assets/login.jpg';
import menu from '../assets/menu.jpg';
import cross from '../assets/cross.jpg';
import { User2Icon, Grid, Calendar, CalendarCheck, PlusIcon, ArrowLeft, ArrowRight, LogOutIcon ,HouseIcon } from 'lucide-react';
import { Link ,useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const classes = 'flex items-center space-x-2 pb-4';
const backendURL = import.meta.env.VITE_BACKEND_URL

const SideBar = ({navItems1,navItems2}) => {
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate()
  const [error , setError] = useState(false)
  const {isUser , isOrganisation ,setIsOrganisation , setIsUser , user , organisation} = useAuth()

   const handleLogout = async ()=>{
         await axios.get(`${backendURL}auth/logout`,{withCredentials : true})
         .then((res)=>{
           console.log('logged out')
           if(isOrganisation){
            setIsOrganisation(false)
           }
           if(isUser){
            setIsUser(false)
           }
            navigate('/')
         }).catch((err)=>{
            setError(true)
         })
   }

   const handleNavigate = (link) => {
         navigate(link)
   }
  return (
    <div className="relative z-100">
      
      <button
        className={` block py-2 px-3 mt-3 fixed top-4 right-10 z-100 ${open ? 'hidden' : 'block'}`}
        type="button"
        onClick={() => setOpen(!open)}
      >
         <img
                src={menu}
                className={`absolute rounded-full cursor-pointer  w-7 h-7  border-2 border-black transition-transform duration-300 ${open ? 'hidden' : 'block'}`}
                onClick={() => setOpen(!open)}
                alt="Toggle"
              />
      </button>
      
      {
                !open && <img
                src={menu}
                className={`absolute rounded-full cursor-pointer right-3 top-9 w-7 border-2 border-black transition-transform duration-300 ${open ? 'hidden' : 'block'}`}
                onClick={() => setOpen(!open)}
                alt="Toggle"
              />
              }
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen bg-neutralGray duration-300 ${open ? 'sm:32 lg:w-72' : 'w-0'} overflow-hidden`}
      >
        {open && (
          <div className="flex flex-col h-full">
            <div className='flex flex-row justify-between items-start'>
              {/* User Info */}
              <div className="flex flex-col lg:flex-row mx-auto items-center gap-x-4 p-2  pt-8 space-y-2 lg:space-y-0">
                {
                  !isUser && !isOrganisation && <img
                  src={login}
                  className="h-12 w-12 lg:h-20 lg:w-20 rounded-full"
                  alt="User"
                />
                }
                 {
                       isUser &&  <img
                        src={user.profilePicture}
                        className="h-12 w-12 lg:h-20 lg:w-20 rounded-full"
                        alt="User"/>
                }
                 {
                       isOrganisation &&  <img
                        src={organisation.logo}
                        className="h-12 w-12 lg:h-20 lg:w-20 rounded-full"
                        alt="User"/>
                }
                <h1 className="font-medium text-xl text-white">{isUser && user.userName} {isOrganisation && organisation.organisationName}</h1>
              </div>

              {/* Toggle Icon */}
              {/* <img
                src={login}
                className={`absolute rounded-full cursor-pointer right-3 top-9 w-7 border-2 border-black transition-transform duration-300 ${!open && 'rotate-180'}`}
                onClick={() => setOpen(!open)}
                alt="Toggle"
              /> */}
              {
                open && <img
                src={cross}
                className={`absolute rounded-full cursor-pointer right-3 top-9 w-7 border-2 border-black transition-transform duration-300 ${!open && 'rotate-180'}`}
                onClick={() => setOpen(!open)}
                alt="Toggle"
              />
              }
            
            </div>

            <hr className="my-4 border-white" />

            {/* Navigation Links */}
            <nav className="flex flex-col p-4 space-y-2 text-white ">
              {navItems1.map((item, index) => (
                <Link to={`${item.link}`} key={index}>
                <div className={`${classes}`} >
                    
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                </div>
                </Link>
              ))}
              <hr className='pb-4'/>
                {navItems2.map((item, index) =>
              //    (
              //     <Link to={`${item.link}`} key={index}>
              //     <div className={`${classes}`} >
                      
              //         <span>{item.icon}</span>
              //         <span>{item.text}</span>
              //     </div>
              //     </Link>
              // )
              {
                if(item.text==='Logout'){
                  return <button className={`${classes}`} onClick={()=>handleLogout()} key={index}>
                        <span>{item.icon}</span>
                       <span>{item.text}</span> </button>
                }else{
                  return <button className={`${classes}`} onClick={()=>handleNavigate(item.link)} key={index}>
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                  </button>
                }
              }
              )
              }
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
