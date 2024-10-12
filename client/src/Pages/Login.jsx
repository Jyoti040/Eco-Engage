import React , {useState} from 'react'
import {MailIcon, LockIcon} from 'lucide-react'
import login from '../assets/login.jpg'
import { Link ,useNavigate} from 'react-router-dom'
import  axios  from 'axios'
import { useAuth } from '../context/AuthContext'

const backendURL = import.meta.env.VITE_BACKEND_URL

const Login = () => {
    const [email , setEmail] = useState('') 
    const [password , setPassword] = useState('') 
    const [iserror , setIsError] = useState(false) 
    const [error , setError] = useState('')
    const [isSubmit , setIsSubmit] = useState(false) 
    const naviagte = useNavigate()

    const  {
      setUser , setOrganisation , setIsOrganisation ,setIsUser , loading
 }=useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('in handle submit , before axios')
        let response
        await axios.post(`${backendURL}auth/login`,{email,password},{ withCredentials: true })
        .then((res)=>{
          setIsError(false)
           console.log('login res',res)
            console.log('login , in axios' , res)
            setIsSubmit(true)
            setTimeout(()=>{
              if(res.data?.isUser){
                setIsUser(true)
                setUser(res.data.user)
                naviagte('/user/view-profile')
              }else{
                setIsOrganisation(true)
                setOrganisation(res.data.organisation)
                naviagte('/organisation/view-profile')
              }
            },3000)
        }).catch((err)=>{
           console.log(err)
           console.log('after error')
            setIsError(true)
            if(err.response?.data?.message)   setError(err.response?.data?.message)
           else setError(err)
        })
    }

  return (
    <div className='lg:flex lg:justify-center lg:items-center lg:my-20 '>
    <div className='flex flex-col  lg:flex-row   shadow-md lg:space-x-8 lg:w-2/3'>
    <div className=' flex flex-col lg:justify-center lg:pl-32 lg:py-10 '>
      <img
       src={login} alt='login-img' className='h-96 w-96 rounded '
      />
      <div className='text-center mt-4'>
        <Link to='/register' className='text-lg text-center'>No account ? Create an account</Link >
      </div>
    </div>

    <div className='py-10 lg:w-1/3'>
        <h1 className='lg:text-4xl font-bold mt-10 mb-2 text-3xl text-center'>Welcome Back</h1>
        <h3 className='lg:text-2xl font-semibold mb-4 text-xl text-center'>Log in to your account</h3>

     {isSubmit && <p className='text-green-500 font-medium text-md text-center p-4'>Logged in successfully</p>}
       <form onSubmit={handleSubmit} className='mt-16 mx-6 lg:mx-0'>
         <div className='flex flex-row space-x-2 border-b mb-6'>
            <MailIcon/>
            <input className='text-lg focus:outline-none' 
            placeholder='Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} type='email' required
            />
         </div>
         <div className='flex flex-row space-x-2 border-b mb-6 '>
            <LockIcon/>
            <input className='text-lg focus:outline-none'
            placeholder='Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} type='password' required
            />
         </div>
         {error.length>0 && <p className='text-red-500 text-md pb-4'>{error}</p>}
         <div >
            <button type='submit' className='bg-blue-500 text-white text-center text-xl py-2 w-full focus:outline-none rounded'>Login</button>
         </div>
       </form>
    </div>
    </div>
    </div>
  )
}

export default Login