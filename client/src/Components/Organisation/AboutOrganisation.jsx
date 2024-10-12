import React, { useState, useEffect } from 'react';
import axios from 'axios';
import register from '../../assets/register.jpg';
import { useParams , useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const backendURL = import.meta.env.VITE_BACKEND_URL;

// const AboutOrganisation = ({ orgId, isEditingAllowed, isEditing, onDataChange }) => {
  

//         setFormData({
//           Name , Email , city , country , instagram , twitter , website
//         })
//         setAbout(organisation.about || '');
//       })
//       .catch((err) => {
//         setLoading(false);
//         setIsError(true);
//         setError(err.response.data.message);
//       });
//   }, [orgId]);

//   useEffect(() => {
//     if (!isEditing) {
//       onDataChange( formData);
//     }
//   }, [formData, about, isEditing]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData =>
//       prevData.map(item =>
//         item.name.toLowerCase() === name.toLowerCase()
//           ? { ...item, content: value }
//           : item
//       )
//     );
//   };

//   return (
//   );
// };

// export default AboutOrganisation;


 const AboutOrganisation = () => {
  const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [Name , setName] = useState('')
    const [Email , setEmail] = useState('') 
    const [country,setCountry] = useState('')
    const [city , setCity] = useState('')
    const [instagram, setinstagram] = useState('')
    const [website, setWesbiteLink] = useState('')
    const [twitter, setTwitter] = useState('')
    const [logo, setLogo] = useState(null)
    const [phone, setPhone] = useState(910293845)
    // const [about, setAbout] = useState('Lorem ipsum dolor sit amet...');
    const navigate = useNavigate()

    const { orgId } = useParams();

    useEffect(() => {
      axios.get(`${backendURL}api/v1/organisation/${orgId}/get-details`)
        .then((res) => {
          const organisation = res.data.organisation;
          setLoading(false);
          setIsError(false)
          setName(organisation.organisationName) ; setCity(organisation.city); setCountry(organisation.country)
          setEmail(organisation.organisationEmail); setinstagram(organisation.instagram); setTwitter(organisation.twitter)
          setWesbiteLink(organisation.website) ; 
          if(organisation.logo){
            setLogo(organisation.logo)
          }
          setFormData({
            Name , Email , country , city , instagram , twitter , website
        })
        }).catch((err)=>{
          setIsError(true)
          setError(err)
        })
      },[orgId])

      const {isOrganisation , setIsOrganisation} = useAuth()
      if (loading) {
        return <h2 className='text-md my-10 p-2'>Loading data!</h2>;
      }
    
      if (isError) {
        return <h2 className='text-md my-10 p-2 text-red-500'>Error: {error}</h2>;
      }

      const handleDelete = async ()=>{
        await axios.delete(`${backendURL}api/v1/organisation/${orgId}/delete-account`,{withCredentials : true})
        .then((res)=>{
          console.log('deleted')
          setIsOrganisation(false)
           navigate('/')
        }).catch((err)=>{
           setError(true)
        })
  }

  return (
    <div className='mx-4 lg:mx-20 my-10 shadow-md p-4'>
      <div>
      <div className='flex space-x-6'>
        <div>
         {
          logo &&  <img
          src={logo}
          alt="organisation logo"
          className='w-20 h-20 lg:w-32 lg:h-32 rounded-full'
        />
         }
        </div>
        <div className='flex justify-center items-center text-xl lg:text-4xl font-bold'>
          {Name}
        </div>
      </div>
      {/* <div className='mt-8'>
        <label className='lg:text-left font-medium text-xl'>About the org</label>
        <p className='text-left mt-4'>{about}</p>
      </div> */}
      <div className='mt-8'>
        <h2 className='lg:text-left font-medium text-xl'>Contact</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2  mt-4'>
           <div  className='flex flex-col pt-4 mt-3 lg:mt-1'>
                <label className='text-gray-500 font-semibold mb-1'>Name</label>  
                <p>{Name}</p>
            </div>
           <div  className='flex flex-col mt-3  '>
                <label className='text-gray-500 font-semibold mb-1'>Email</label>  
                <p>{Email}</p>
            </div>
           <div  className='flex flex-col mt-3 lg:mt-4'>
                <label className='text-gray-500 font-semibold mb-1'>Country</label>  
                <p>{country}</p>
            </div>
           <div  className='flex flex-col mt-3 '>
                <label className='text-gray-500 font-semibold mb-1'>City</label>  
                <p>{city}</p>
            </div>
           <div  className='flex flex-col  mt-3 lg:mt-4'>
                <label className='text-gray-500 font-semibold mb-1'>Phone</label>  
                <p>{phone}</p>
            </div>
           {/* <div  className='flex flex-col mt-3 lg:mt-4'>
                <label className='text-gray-500 font-semibold mb-1'>About</label>  
                <p>{about}</p>
            </div> */}
           <div  className='flex flex-col mt-3 lg:mt-4'>
                <label className='text-gray-500 font-semibold mb-1'>Instagram</label>  
                <p>{instagram}</p>
            </div>
           <div  className='flex flex-col mt-3 lg:mt-4'>
                <label className='text-gray-500 font-semibold mb-1'>Twitter</label>  
                <p>{twitter}</p>
            </div>
           <div  className='flex flex-col mt-3 lg:mt-4'>
                <label className='text-gray-500 font-semibold mb-1'>Website</label>  
                <p>{website}</p>
            </div>
          
        </div>
      </div>

      {
      isOrganisation &&  <div className='mt-5 flex lg:justify-around space-x-5'>
      <button
        className='border border-red-500 bg-red-400 px-8 py-2  text-white text-lg'
        onClick={()=>handleDelete()}
      >
        Delete account
      </button>
      <button
        className='border border-blue-500 bg-blue-400 px-8 py-2  text-white text-lg'
        onClick={()=>{navigate(`/organisation/update-profile/${orgId}`)}}
      >
        Edit profile
      </button>
    </div>
    }

    </div>
    </div>
  )
}

export default AboutOrganisation