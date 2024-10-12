import React , {useState,useEffect} from 'react'
import register from '../../assets/register.jpg'
import { useParams , useLocation ,useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;
const data = [
  {name:'Name',content:'jyoti'},
  {name:'Email',content:'abc@gmail.com',type:'email'},
  {name:'Country',content:'India'},
  {name:'City',content:'New Delhi'},
]

const UserProfile = () => {

  const [formData, setFormData] = useState({});
  const [Name , setName] = useState('')
  const [Email , setEmail] = useState('') 
  const [country,setCountry] = useState('')
  const [city , setCity] = useState('')
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);

  const { userId } = useParams();
  console.log(userId)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${backendURL}api/v1/user/${userId}/get-details`,{
      withCredentials : true
    })
      .then((res) => {
        console.log(res)
        const user = res.data.user;
        setLoading(false);
        setIsError(false)
        setName(user.userName) ; setCity(user.city); setCountry(user.country)
        setEmail(user.userEmail); 
        if(user.profilePicture){
          setProfilePicture(user.profilePicture)
        }
        setFormData({
          Name , Email , country , city 
      })
      }).catch((err)=>{
        console.log(err)
        setIsError(true)
        setError(err)
      })
    },[userId])

      if (loading) {
        return <h2 className="pl-4 lg:text-lg font-md my-10">Loading data!</h2>;
      }
    
      if (isError) {
        return <h2>Error: {error}</h2>;
      }

      const handleDelete = async ()=>{
        await axios.delete(`${backendURL}api/v1/user/${userId}/delete-account`,{withCredentials : true})
        .then((res)=>{
          console.log('deleted')
          setIsuser(false)
           navigate('/')
        }).catch((err)=>{
           setError(true)
        })
  }

  return (
    <div >
        <div className='bg-white shadow-md mx-4 lg:mx-80 mt-10 '>
             <div className='flex flex-col lg:flex-row lg:space-x-40 '>
                <div>
                   {
                    profilePicture &&  <img
                    src={profilePicture} alt='user-img' className='h-60 w-60 rounded-full pb-4'
                    />
                   }
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>Name</label>
             <p className="mb-4 text-lg">{Name}</p>
          </div>
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>Email</label>
             <p className="mb-4 text-lg">{Email}</p>
          </div>
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>Country</label>
             <p className="mb-4 text-lg">{country}</p>
          </div>
          <div className='flex flex-col'>
             <label className='text-gray-500 font-semibold mb-1 text-lg'>City</label>
             <p className="mb-4 text-lg">{city}</p>
          </div>
                    {/* <div className='flex space-x-6'>
                      <h3 className='text-2xl'>Name :</h3>  
                      <h3 className='text-2xl font-semibold'></h3>
                    </div>
                    <div className='flex space-x-6'>
                      <h3 className='text-2xl'>Name :</h3>  
                      <h3 className='text-2xl font-semibold'>Name :</h3>
                    </div>
                    <div className='flex space-x-6'>
                      <h3 className='text-2xl'>Name :</h3>  
                      <h3 className='text-2xl font-semibold'>Name :</h3>
                    </div>
                    <div className='flex space-x-6'>
                      <h3 className='text-2xl'>Name :</h3>  
                      <h3 className='text-2xl font-semibold'>Name :</h3>
                    </div>
                    <div className='flex space-x-6'>
                      <h3 className='text-2xl'>Name :</h3>  
                      <h3 className='text-2xl font-semibold'>Name :</h3>
                    </div> */}
                </div>
             </div>
        </div>

        {/* <div className='bg-white shadow-md mx-4 lg:mx-80  mb-10 pb-5 px-6 pt-8'>
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
      </div> */}
    <div className='mt-5 flex lg:justify-around space-x-5 mx-4 mb-10'>
      <button
        className='border border-red-500 bg-red-400 px-8 py-2  text-white text-lg'
        onClick={()=>handleDelete()}
      >
        Delete account
      </button>
      <button
        className='border border-blue-500 bg-blue-400 px-8 py-2  text-white text-lg'
        onClick={()=>{navigate(`/user/update-profile/${userId}`)}}
      >
        Edit profile
      </button>
    </div>
    
    </div>
  )
}

export default UserProfile