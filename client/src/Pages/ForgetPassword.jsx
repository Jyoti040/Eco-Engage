import React , {useState} from 'react'
import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL


const ForgetPassword = () => {
    const [email , setEmail] = useState('') 
    const [iserror , setIsError] = useState() 
    const [error , setError] = useState('')
    const [isSubmit , setIsSubmit] = useState(false) 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        console.log('in forget pass',email)
        await axios.post(`${backendURL}auth/forget-password`,{email},{ withCredentials: true })
        .then((res)=>{
            console.log('in forget pass',res)
            setIsSubmit(true)
            setIsError(false)

        })
        .catch((err)=>{
            console.log(err)
            console.log('after error')
             setIsError(true)
             setIsSubmit(false)
             if(err.response?.data?.message)   setError(err.response?.data?.message)
            else setError(err)
         })
    }

  return (
    <div className='lg:flex lg:justify-center lg:items-center lg:my-20 '>
        <div className='flex flex-col  lg:flex-row shadow-md lg:space-x-8 lg:w-2/3'> 
            <div>
               <h3 className='text-xl px-20 lg:text-2xl font-bold lg:px-96 py-5 '>Please provide account details</h3>
               <p className='text-md px-10 mb-3 lg:text-lg'>To recover the password for your account , please provide us the account details.</p>
               
               <form className='ml-10 mb-10' onSubmit={handleSubmit}>
                  <div className='flex flex-col space-y-2'>
                     <label className='text-md lg:text-lg'>Email : </label>
                     <input className='border border-black w-3/5 px-2 py-2 text-md lg:text-lg' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
                  </div>
                  {error.length>0 && <p className='text-red-500 text-lg pt-3'>{error}</p>}

                  <button type='submit' className='bg-blue-500 text-white text-center lg:text-xl py-2 w-1/3 mt-5 focus:outline-none rounded'>Proceed</button>

{isSubmit && <p className='pt-5  text-green-600 font-medium text-lg text-center'>Password reset mail sent . Kindly check your mailbox !!</p>}
               </form>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword