import React , { useState, useEffect } from 'react'
import register from '../../assets/register.jpg'
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom'
import GeneralProfileTab from './GeneralProfileTab'

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState(null)
  const [Name , setName] = useState('')
  const [organisation , setOrganisation] = useState({})
  const { orgId } = useParams();

  useEffect(() => {
    axios.get(`${backendURL}api/v1/organisation/${orgId}/get-details`)
      .then((res) => {
        const organisation = res.data.organisation;
        setLoading(false);
        setIsError(false)
        setOrganisation(organisation)
        setName(organisation.organisationName) ;
        if(organisation.logo){
          setLogo(organisation.logo)
        }
      }).catch((err)=>{
        setIsError(true)
        setError(err)
      })
    },[orgId])

    if (loading) {
      return <h2 className='text-md p-2 my-10'>Loading data!</h2>;
    }
  
    if (isError) {
      return <h2 className='text-md p-2 my-10 text-red-500'>Error: {error}</h2>;
    }


  return (
    <div className='mx-4 lg:mx-20 my-10'>
        {/* org name and logo */}
        <div className='flex space-x-6'>
            <div>
                <img src={logo} alt="organisation logo" className='w-20 h-20 lg:w-32 lg:h-32 rounded-full'
                />
            </div>
            <div className='flex justify-center items-center text-xl lg:text-4xl font-bold'>{Name}</div>
        </div>

        <div className='mt-10 w-full max-w-7xl'>
          <GeneralProfileTab organisation={organisation}/>
        </div>
    </div>
  )
}

export default Profile
