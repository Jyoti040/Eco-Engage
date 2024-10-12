import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from './SideBar'
import { useAuth } from "../context/AuthContext";
import { User2Icon, Grid, Calendar, CalendarCheck, LogOutIcon, HouseIcon, PenIcon } from 'lucide-react';
import logo from '../assets/logo1.jpg'

const navItems1Org = [
  // {
  //   icon: <Grid />,
  //   text: 'Overview',
  //   link: 'organisation/dashboard'
  // },
  {
    icon: <Calendar />,
    text: 'Upcoming events',
    link: 'organisation/upcoming-events'
  },
  {
    icon: <CalendarCheck />,
    text: 'Past events',
    link: 'organisation/past-events'
  },
  {
    icon: <PenIcon />,
    text: 'Create new event',
    link: 'organisation/create-event'
  },
  {
    icon: <HouseIcon />,
    text: 'Home Page',
    link: '/'
  }
]
let navItems2Org = [
  {
    icon: <User2Icon />,
    text: 'Profile',
    link: 'organisation/view-profile'
  },
  {
    icon: <LogOutIcon />,
    text: 'Logout',
    link: 'organisation/dashboard'
  },
];
const navItems1User = [
  // {
  //   icon: <Grid />,
  //   text: 'Overview',
  //   link: 'user/dashboard',
  // },
  {
    icon: <Calendar />,
    text: 'Upcoming events',
    link: 'user/upcoming-events'
  },
  {
    icon: <CalendarCheck />,
    text: 'Past events',
    link: 'user/past-events'
  },
  {
    icon: <HouseIcon />,
    text: 'Home Page',
    link: '/'
  }
]
let navItems2User = [
  {
    icon: <User2Icon />,
    text: 'Profile',
    link: 'user/view-profile'
  },
  {
    icon: <LogOutIcon />,
    text: 'Logout',
    link: 'user/dashboard',
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isUser, isOrganisation, loading, organisation, user } = useAuth()
  console.log('in navbar', isUser)

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  if (isOrganisation) {
    navItems2Org = navItems2Org.map((item, index) => {
      if (item.text === 'Profile') {
        return {
          ...item,
          link: `org-profile/${organisation._id}`
        }
      }
      return item
    })

    console.log('in navbar if org', navItems2Org)
  }
  if (isUser) {
    navItems2User = navItems2User.map((item, index) => {
      if (item.text === 'Profile') {
        return {
          ...item,
          link: `/user/view-profile/${user._id}`
        }
      }
      return item
    })

    console.log('in navbar if user', navItems2User)
  }
  return (
    <nav className="navbar sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 navbar-items">
        <img
          src={logo}
          className="h-20 w-auto navbar-img py-2"
          alt="Website Logo"
        />

        {
          !isUser && !isOrganisation && (
            <button
              onClick={toggleNavbar}
              data-collapse-toggle="navbar-default"
              type="button"
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black-500 rounded-lg md:hidden ${!isUser && !isOrganisation && 'hidden'} `}
              aria-controls="navbar-default"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )
        }

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >

          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 md:p-0 nav-link hover:text-green-800 hover:underline ${!isUser && !isOrganisation && 'hidden md:block'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="/#about-us"
                className={`block py-2 px-3 md:p-0 nav-link hover:text-green-800 hover:underline ${!isUser && !isOrganisation && 'hidden md:block'}`}
              >
                About us
              </a>
            </li>
            <li>
              <a
                href="/#events"
                className={`block py-2 px-3 md:p-0 nav-link hover:text-green-800 hover:underline ${!isUser && !isOrganisation && 'hidden md:block'}`}
              >
                Events
              </a>
            </li>
            <li>
              <Link to='/login' className={`bg-primaryGreen py-2 px-4 text-white rounded w-1/3 text-center block md:hidden ${!isUser && !isOrganisation && !loading && 'hidden'}`}>Login
              </Link>
            </li>
          </ul>
        </div>

        {
          !loading && isUser && <SideBar navItems1={navItems1User} navItems2={navItems2User} />
        }
        {
          !loading && isOrganisation && <SideBar navItems1={navItems1Org} navItems2={navItems2Org} />
        }

        {
          !loading && !isUser && !isOrganisation && <div className="hidden md:block">
            <Link to='/login' className="bg-primaryGreen py-2 px-4 text-white rounded hidden md:block">Login
            </Link>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
