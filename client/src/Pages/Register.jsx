import React , {useState} from 'react'
import IndividualRegistration from '../Components/User/IndividualRegistration'
import OrganisationRegistration from '../Components/Organisation/OrganisationRegistration'
import register from '../assets/register.jpg'
import { Link } from 'react-router-dom'



const Register = () => {

    const [isindividual , setIsIndividual] = useState(true)
    const [isorganisation , setIsOrganisation] = useState(false)
  
  return (
    <div className='lg:flex lg:justify-center lg:items-center lg:my-10 '>
    <div className='flex flex-col  lg:flex-row   shadow-md lg:space-x-8 lg:w-2/3'>
    <div className=' flex flex-col lg:justify-center lg:pl-32 lg:py-10 lg:order-2'>
      <img
       src={register} alt='login-img' className='h-72 rounded '
      />
      <div className='text-center mt-4'>
        <Link to='/login' className='text-lg text-center'>Already have an account ? Login</Link >
      </div>
    </div>

    <div className='py-10 lg:w-1/3 lg:order-1'>
        <h1 className='lg:text-4xl font-bold mt-4 mb-2 text-3xl lg:text-left text-center'>Register</h1>
        <div className='flex lg:flex-row flex-col mt-8'>
            <button className='border px-4 py-2 ' 
            onClick={()=>{
                setIsIndividual(!isindividual) ; setIsOrganisation(!isorganisation) ;
             }}
                >As an individual</button>
            <button className='border px-4 py-2' onClick={()=>{ setIsIndividual(!isindividual) ; setIsOrganisation(!isorganisation)}}>As an organisation</button>
        </div>
        {isindividual && <IndividualRegistration/>}
        {isorganisation && <OrganisationRegistration/>}
    </div>
    </div>
    </div>
  )
}

export default Register