import React , {useState} from 'react'
import {MailIcon, LockIcon , User2Icon, MapPinIcon , ImageIcon} from 'lucide-react'
import axios from 'axios'
import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// {userName , email , password , country , city }
const backendURL = import.meta.env.VITE_BACKEND_URL

const IndividualRegistration = () => {
   
    const [userName , setUserName] = useState('')
    const [email , setEmail] = useState('') 
    const [password , setPassword] = useState('') 
    const [confirmpassword , setConfirmPassword] = useState('') 
    const [country,setCountry] = useState('')
    const [city , setCity] = useState('')
    const [iserror , setIsError] = useState(false) 
    const [error , setError] = useState('')
    const [isSubmit , setIsSubmit] = useState(false) 
    const [profilePicture , setprofilePicture]= useState(null)

    const navigate = useNavigate()

   const inputClass = 'text-md focus:outline-none'

   console.log(useAuth())
   const {setUser  ,setIsUser , isUser , user , } = useAuth()
   console.log('after use auth')
 
   const handleImageChange = (e)=>{
      setprofilePicture(e.target.files[0])
   }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            setIsError(true)
            setError('Password did not match')
        }

    console.log('backedn url',backendURL)
    let response;
    console.log('inside submit')
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('country', country);
    formData.append('city', city);
    if (profilePicture) {
        formData.append('profilePicture', profilePicture); 
    }
    await  axios.post(`${backendURL}auth/register/user`,formData,
   //    {
   //    headers : {
   //       'Content-Type':'multipart/form-data'
   //    }
   //  },
    { withCredentials: true })
     .then(res=>{
         response=res
         console.log('succes',response)
         setIsSubmit(true)
         setIsUser(true)
         setUser(response.data.createdUser)
         navigate(`/user/view-profile/${response.data.createdUser._id}`)
     }).catch(err => {
         setIsError(true)   
      if(err.code === 11000){
         setError({message : "Email already registered"})
      }else{
         setError(err.message)
      }
     })
      
    }
  
  return (
    <form onSubmit={handleSubmit} className='mt-10 mx-6 lg:mx-0'>

     {iserror  && <p className='text-red-500 font-medium text-md text-center pb-4'>Error while registering user ! . Error message - {error}</p>} 
     {isSubmit && <p className='text-green-500 font-medium text-md text-center pb-4'>Thanks for registering</p>}

    <div className='flex flex-row space-x-2 border-b mb-6'>
       <User2Icon/>
       <input className={inputClass} value={userName} onChange={(e)=>setUserName(e.target.value)} 
       placeholder='Your Name'  type='text' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6'>
       <MailIcon/>
       <input className={inputClass}  value={email} onChange={(e)=>setEmail(e.target.value)}
       placeholder='Your Email'  type='email' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6'>
       <MapPinIcon/>
       <input className={inputClass} value={country} onChange={(e)=>setCountry(e.target.value)}
       placeholder='Your Country'  type='text' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6'>
       <MapPinIcon/> 
       <input className={inputClass} value={city} onChange={(e)=>setCity(e.target.value)}
       placeholder='Your City'  type='text' required
       />
    </div>
    
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <LockIcon/>
       <input className={inputClass} value={password} onChange={(e)=>setPassword(e.target.value)}
       placeholder='Your Password'  type='password' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <LockIcon/>
       <input className={inputClass} value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}
       placeholder='Confirm Your Password'  type='password' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <ImageIcon/>
       <input className={inputClass}  onChange={handleImageChange}
       placeholder=''  type='file'     accept='image/jpg ,'   />
    </div>
    {/* {iserror && <p className='text-red-500 text-md p-3'>{error.message}</p>} */}
    <div >
       <button type='submit' className='bg-blue-500 text-white text-center text-xl py-2 w-full rounded'>Register</button>
    </div>
  </form>
  )
}

export default IndividualRegistration