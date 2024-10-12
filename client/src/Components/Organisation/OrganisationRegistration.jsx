import React , {useState} from 'react'
import {MailIcon, LockIcon , User2Icon , MapPinIcon,GlobeIcon , InstagramIcon , XIcon , ImageIcon} from 'lucide-react'
import axios from 'axios'
import { Link , useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const backendURL = import.meta.env.VITE_BACKEND_URL

const OrganisationRegistration = () => {
   
    const [organisationName , setOrganisationName] = useState('')
    const [organisationEmail , setorganisationEmail] = useState('') 
    const [password , setPassword] = useState('') 
    const [confirmpassword , setConfirmPassword] = useState('') 
    const [country,setCountry] = useState('')
    const [city , setCity] = useState('')
    const [iserror , setIsError] = useState(false) 
    const [error , setError] = useState('')
    const [isSubmit , setIsSubmit] = useState(false) 
    const [instagram, setinstagram] = useState('')
    const [website, setWesbiteLink] = useState('')
    const [twitter, setTwitter] = useState('')
    const [logo , setLogo]= useState(null)

    const navigate = useNavigate()

    const inputClass = 'text-md focus:outline-none'

    console.log(useAuth())
   const {setOrganisation , isOrganisation , organisation , setIsOrganisation } = useAuth()
   console.log('after use auth')
 
   const handleImageChange = (e)=>{
      setLogo(e.target.files[0])
   }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmpassword){
            setError('Password did not match')
        }   
        console.log('backedn url',backendURL)
    let response;
    console.log('inside submit')
    const formData = new FormData();
    formData.append('organisationName', organisationName);
    formData.append('organisationEmail', organisationEmail);
    formData.append('password', password);
    formData.append('country', country);
    formData.append('city', city);
    formData.append('website', website);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);
    if (logo) {
        formData.append('logo', logo); // Ensure the profile picture is appended
    }
    await  axios.post(`${backendURL}auth/register/organisation`,
      formData , 
      // {organisationName,organisationEmail,password,country,city,website,twitter,instagram},
      { withCredentials: true })
     .then(res=>{
         response=res
         console.log('succes',response)
         setIsOrganisation(true)
         setOrganisation(response.data.createdOrganisation)
         setIsSubmit(true)
         setTimeout(()=>{
            navigate('/organisation/dashboard')
         },3000)
     }).catch(err => {
       setIsSubmit(false)
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
     {iserror  && <p className='text-red-500 font-medium text-md text-center pb-4'>Error while registering organisation ! .<br/> {error}</p>} 
     {isSubmit && <p className='text-green-500 font-medium text-md text-center pb-4'>Thanks for registering</p>}

    <div className='flex flex-row space-x-2 border-b mb-6'>
       <User2Icon/>
       <input className={inputClass} value={organisationName} onChange={(e)=>setOrganisationName(e.target.value)}
       placeholder='Organisation Name'  type='text' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6'>
       <MailIcon/>  
       <input className={inputClass} value={organisationEmail} onChange={(e)=>setorganisationEmail(e.target.value)}
       placeholder='Organisation Email'  type='email' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6'>
       <MapPinIcon/>
       <input className={inputClass} value={country} onChange={(e)=>setCountry(e.target.value)}
       placeholder='Organisation Country'  type='text' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6'>
       <MapPinIcon/>
       <input className={inputClass} value={city} onChange={(e)=>setCity(e.target.value)}
       placeholder='Organisation City'  type='text' required
       />
    </div>
    
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <LockIcon/>
       <input className={inputClass} value={password} onChange={(e)=>setPassword(e.target.value)}
       placeholder='Set Password'  type='password' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <LockIcon/>
       <input className={inputClass} value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}
       placeholder='Confirm  Password'  type='password' required
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <GlobeIcon/>
       <input className={inputClass} value={website} onChange={(e)=>setWesbiteLink(e.target.value)}
       placeholder='Organsiation  website link'  type='text' 
       />
    </div>

    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <InstagramIcon/>
       <input className={inputClass} value={instagram} onChange={(e)=>setinstagram(e.target.value)}
       placeholder='Organsation instagram link'  type='text' 
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <XIcon/>
       <input className={inputClass} value={twitter} onChange={(e)=>setTwitter(e.target.value)}
       placeholder='Organsation twitter link'   type='text' 
       />
    </div>
    <div className='flex flex-row space-x-2 border-b mb-6 '>
       <ImageIcon/>
       <input className={inputClass}  onChange={handleImageChange}
       placeholder=''  type='file'     accept='image/jpg ,'   />
    </div>
    {/* {error.length>0 && <p className='text-red-500 text-md'>{error}</p>} */}
    
    <div >
       <button type='submit' className='bg-blue-500 text-white text-center text-xl py-2 w-full rounded focus:outline-none'>Register</button>
    </div>
  </form>
  )
}

export default OrganisationRegistration