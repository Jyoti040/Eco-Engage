import React from 'react'
import { Link } from 'react-router-dom'
import { MapPinIcon, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <div className='bg-black'>
      <div className='flex flex-col lg:flex-row lg:space-x-4 lg:justify-around space-y-4 px-4 py-4'>
        <div>
          <h2 className='text-white mt-4'>About Us</h2>
          <p className='text-gray-400 mt-4'> Your all-in-one platform for connecting with environmental initiatives and making a positive impact. <br />
            Whether you're an organization aiming to expand your reach or
            <br /> an individual seeking to actively engage in environmental events, EcoEngage has got you covered.
          </p>
        </div>

        <div className='flex flex-col'>
          <h2 className='text-white'>Quick Links</h2>
          <div className='mt-4'>
            <Link className='text-gray-400' to='/'>
              Home
            </Link>
          </div>

          <div className='mt-2'>
            <a className='text-gray-400' href='/#about-us'>
              About Us
            </a></div>
        </div>

        <div>
          <h2 className='text-white'>Contact Us</h2>
          <Link className='text-gray-400 ' to='mailto:jyotiahuja833@gmail.com'>
            <div className='flex mt-4 '>
              <Mail />
              <p className='ml-2'>dummy email</p>
            </div>
          </Link>

          <div className='flex text-gray-400 mt-2'>
            <MapPinIcon />
            <p className='ml-2'>New Delhi , India</p>
          </div>
        </div>
      </div>

      <hr className=" border-gray-200 sm:mx-auto lg:my-8 " />

      <div className="sm:flex sm:items-center sm:justify-center pb-6">
        <div className="text-left text-sm space-x-2">
          <span className="text-gray-400">Copyright © 2024</span>
          <span className="text-gray-400">|</span>
          <a href="#" className='text-gray-400'>Disclaimer</a>
          <span className="text-gray-400">|</span>
          <a href="#" className='text-gray-400'>Terms of Use</a>
          <span className="text-gray-400">|</span>
          <a href="#" className='text-gray-400'>Privacy Policy</a>
        </div>
      </div>
    </div>
  )
}

export default Footer