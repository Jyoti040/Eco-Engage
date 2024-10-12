import React, { useEffect, useState } from 'react';
import register from '../../assets/register.jpg';
import { useParams , useLocation ,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const UpdateUserProfile = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [Name , setName] = useState('')
  const [Email , setEmail] = useState('') 
  const [country,setCountry] = useState('')
  const [city , setCity] = useState('')


  const { userId } = useParams();
  const navigate = useNavigate()
  const { isuser, user } = useAuth();

  useEffect(()=>{
    setLoading(false);
    setIsError(false)
    setName(user.userName) ; setCity(user.city); setCountry(user.country)
    setEmail(user.userEmail); 
  },[])

  const handleSaveClick = async () => {
    try {
      await axios.put(`${backendURL}api/v1/user/${user._id}/update`, {
        city , country , userEmail : Email , userName : Name 
      },{
      withCredentials : true})
      .then((res)=>{
           console.log('in update user',res)
           navigate(`/user/view-profile/${userId}`)
      }
      )
      // Handle successful response, e.g., show a success message
    } catch (error) {
      // Handle error response, e.g., show an error message
      console.error('Error updating user:', error);
    }
  };

   return (
    <div >
        <div className='bg-white shadow-md mx-4 lg:mx-80 mt-10 '>
             <div className='flex flex-col lg:flex-row lg:space-x-40 '>
                <div>
                    <img
                    src={register} alt='user-img' className='h-60 w-60 rounded-full'
                    />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
               
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>Name</label>
             <input className='w-full p-2'
             type='text' name='name' value={Name} onChange={(e)=>setName(e.target.value)} required
            />
          </div>
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>Email</label>
             <input className='w-full p-2' 
             type='email' name='email' value={Email} onChange={(e)=>setEmail(e.target.value)} required
            />
          </div>
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>Country</label>
             <input className='w-full p-2'
             type='text' name='country' value={country} onChange={(e)=>setCountry(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>City</label>
             <input className='w-full p-2'
             type='text' name='city' value={city} onChange={(e)=>setCity(e.target.value)}
            />
          </div>
            
                </div>
             </div>
        </div>
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
                  onClick={() => navigate(`/user-profile/${userId}`)}
                   >
                  Cancel
                   </button>
                </div>
              </div>
    
    </div>
  )
}

export default UpdateUserProfile