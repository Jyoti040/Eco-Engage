import React, { useEffect, useState } from 'react';
import AboutOrganisation from './AboutOrganisation';
import register from '../../assets/register.jpg';
import { useParams , useLocation ,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AuthOrganisationProfile = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [Name , setName] = useState('')
  const [Email , setEmail] = useState('') 
  const [country,setCountry] = useState('')
  const [city , setCity] = useState('')
  const [instagram, setinstagram] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [phone, setPhone] = useState(910293845)
  const [about, setAbout] = useState('Lorem ipsum dolor sit amet...');
  
  const { orgId } = useParams();
  const navigate = useNavigate()
  const { isOrganisation, organisation } = useAuth();

  useEffect(()=>{
    setLoading(false);
    setIsError(false)
    setName(organisation.organisationName) ; setCity(organisation.city); setCountry(organisation.country)
    setEmail(organisation.organisationEmail); setinstagram(organisation.instagram); setTwitter(organisation.twitter)
    setWebsite(organisation.website)
  },[])

  const handleSaveClick = async () => {
    try {
      await axios.put(`${backendURL}api/v1/organisation/${organisation._id}/update`, {
        city , country , organisationEmail : Email , organisationName : Name , twitter , instagram , website
      },{
      withCredentials : true})
      .then((res)=>{
           console.log('in update org',res)
           navigate(`/org-profile/${orgId}`)
      }
      )
      // Handle successful response, e.g., show a success message
    } catch (error) {
      // Handle error response, e.g., show an error message
      console.error('Error updating organisation:', error);
    }
  };

  return (
    <div className='mx-4 lg:mx-20 my-10 shadow-md p-4'>
      <div className='flex space-x-6 lg:mx-20'>
        <div>
          <img
            src={register}
            alt="organisation logo"
            className='w-20 h-20 lg:w-32 lg:h-32 rounded-full'
          />
        </div>
        <div className='flex justify-center items-center text-xl lg:text-4xl font-bold'>
          Organisation Name Here
        </div>
      </div>
     <div className='grid grid-cols-1 lg:grid-cols-2 gap-1 gap-x-10 lg:mx-20'>
     <div  className='flex flex-col  mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Name</label>  
            <input className='w-full p-2'
             type='text' name='name' value={Name} onChange={(e)=>setName(e.target.value)} required
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Email</label>  
            <input className='w-full p-2' 
             type='email' name='email' value={Email} onChange={(e)=>setEmail(e.target.value)} required
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Phone number</label>  
            <input className='w-full p-2'
             type='number' name='phone' value={phone} onChange={(e)=>setPhone(e.target.value)}
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Country</label>  
            <input className='w-full p-2'
             type='text' name='country' value={country} onChange={(e)=>setCountry(e.target.value)}
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>City</label>  
            <input className='w-full p-2'
             type='text' name='city' value={city} onChange={(e)=>setCity(e.target.value)}
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Instagram</label>  
            <input className='w-full p-2'
             type='text' name='instagram' value={instagram} onChange={(e)=>setinstagram(e.target.value)}
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Twitter</label>  
            <input className='w-full p-2'
             type='text' name='twitter' value={twitter} onChange={(e)=>setTwitter(e.target.value)}
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>Website</label>  
            <input className='w-full p-2'
             type='text' name='website' value={website} onChange={(e)=>setWebsite(e.target.value)}
            />
      </div>
      <div  className='flex flex-col mt-4 '>
            <label className='text-gray-500 font-semibold mb-1'>About</label>  
            <input className='w-full p-2'
             type='text' name='text' value={about} onChange={(e)=>setAbout(e.target.value)}
            />
      </div>
     </div>
      {/* <div>
        <AboutOrganisation
          isEditing={isEditing}
          isEditingAllowed={isEditingAllowed}
          orgId={orgId}
          onDataChange={handleDataChange}
        />
      </div> */}
      {/* <div className='mx-4 mt-10'>
        {isEditingAllowed && (
          <div className='flex justify-between'>
            {!isEditing ? (
              <>
                <button
                  className='border border-red-500 bg-red-400 px-8 lg:py-2 text-white text-lg'
                  // Add functionality for deleting account
                >
                  Delete account
                </button>
                <button
                  className='border border-blue-500 bg-blue-400 px-8 lg:py-2 text-white text-lg'
                  onClick={handleEditClick}
                >
                  Edit profile
                </button>
              </>
            ) : (
              <>
                <button
                  className='border border-green-500 bg-green-400 px-8 lg:py-2 text-white text-lg'
                  onClick={handleSaveClick}
                >
                  Save Changes
                </button>
                <button
                  className='border border-blue-500 bg-blue-400 px-8 lg:py-2 text-white text-lg'
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div> */}
       <div className=' flex flex-row lg:justify-around mt-8 space-x-8'>
                <div>
                   <button
                  className='border border-green-500 bg-green-400 px-8  py-2 text-white text-lg'
                  onClick={()=>handleSaveClick()}
                   >
                  Save Changes
                   </button>
                </div>
                <div>
                  <button
                  className='border border-blue-500 bg-blue-400 px-8 py-2 text-white text-lg'
                  onClick={() => navigate(`/org-profile/${orgId}`)}
                   >
                  Cancel
                   </button>
                </div>
              </div>
    </div>
  );
};

export default AuthOrganisationProfile;
