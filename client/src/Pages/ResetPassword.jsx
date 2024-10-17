import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const backendURL = import.meta.env.VITE_BACKEND_URL

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [iserror, setIsError] = useState(false)
    const [error, setError] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    const params = useParams();
    console.log('in reset password', params)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setIsError(true)
            setError('Password didn"t match')
            return;
        }

        console.log('in forget pass', confirmPassword)
        await axios.post(`${backendURL}auth/reset-password/${params.id}/${params.token}`, { password: confirmPassword }, { withCredentials: true })
            .then((res) => {
                console.log('in forget pass', res)
                setIsSubmit(true)
                setIsError(false)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
                console.log('after error')
                setIsError(true)
                setIsSubmit(false)
                if (err.response?.data?.message) setError(err.response?.data?.message)
                else setError(err)
            })
    }

    return (
        <div className='lg:flex lg:justify-center lg:items-center lg:my-20 '>
            <div className='flex flex-col  lg:flex-row shadow-md lg:space-x-8 lg:w-2/3'>
                <div>
                    <h3 className='text-xl px-20 lg:text-3xl font-bold lg:px-96 py-5 '>Reset Password</h3>

                    <form className='ml-10 mb-10' onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-2'>
                            <label className='text-md lg:text-lg'>Password : </label>
                            <input className='border border-black w-3/5 px-2 py-2 text-md lg:text-lg' type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='flex flex-col space-y-2 mt-5'>
                            <label className='text-md lg:text-lg'>Confirm Password : </label>
                            <input className='border border-black w-3/5 px-2 py-2 text-md lg:text-lg' type='password' placeholder='Re enter your password' onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        {error.length > 0 && <p className='text-red-500 text-lg pt-3'>{error}</p>}

                        <button type='submit' className='bg-blue-500 text-white text-center text-xl py-2 w-1/3 mt-5 focus:outline-none rounded'>Save</button>

                        {isSubmit && <p className='pt-5  text-green-600 font-medium  text-md lg:text-lg text-center'>Password reset done . Kindly login with updated password.</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword