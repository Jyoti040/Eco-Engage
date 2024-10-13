import React, { useEffect, useState } from 'react';
import register from '../../assets/register.jpg';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DetailedEventCard = () => {
    const [showRSVP, setShowRSVP] = useState(false);
    const [isPastEvent, setIsPastEvent] = useState(false)
    const [addImage, setAddImage] = useState([])
    const [canAddImage, setCanAddImage] = useState(false);
    const [event, setEvent] = useState({})
    const location = useLocation();
    const navigate = useNavigate();
    const { isUser, user, loading, isOrganisation, organisation } = useAuth();

    const tempEvent = location.state?.event || location.state || {}


    console.log('in detailed event card', location.state)
    let currentDate = new Date()

    useEffect(() => {
        if (!loading && isUser && event._id) {
            axios.get(`${BACKEND_URL}api/v1/events/${event._id}/get-rsvp`, {
                params: {
                    eventId: event._id,
                    userId: user._id
                },
                withCredentials: true
            })
                .then((res) => {
                    setShowRSVP(!res.data.status);
                    console.log(res.data.status)
                    console.log('above if')

                })
                .catch((err) => {
                    console.log('in get rsvp erro', err);
                });
        }
        setEvent(tempEvent);
        const eventDate = new Date(event.eventDate);

        if (eventDate < currentDate) {
            console.log('date', eventDate < currentDate);
            setIsPastEvent(true);
        }
        setCanAddImage(isPastEvent && isOrganisation && (event.organiser._id === organisation._id));

        console.log('can add images', canAddImage)

    }, [isUser, tempEvent, event, user, isPastEvent, isOrganisation, organisation, loading]);
    // console.log('event org details ',event.organiser?._id || event.organiser)

    const handleRSVP = async () => {
        try {
            const response = await axios.patch(`${BACKEND_URL}api/v1/events/${event._id}/rsvp`, {
                eventId: event._id,
                userId: user._id
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setShowRSVP(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveRSVP = async () => {
        try {
            const response = await axios.patch(`${BACKEND_URL}api/v1/events/${event._id}/remove-rsvp`, {
                eventId: event._id,
                userId: user._id
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setShowRSVP(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (Object.keys(event).length === 0) {
        return <h2 className='text-2xl text-lg p-4'>No event to show</h2>;
    }
    let navLink;
    if (organisation._id !== event.organiser._id) {
        navLink = `/org-profile/general/${event.organiser?._id}`
    } else {
        navLink = `/org-profile/${event.organiser?._id}`
    }

    const handleNavigate = () => {
        navigate(navLink)
    }


    const handleAddImage = async () => {
        const formData = new FormData()
        Array.from(addImage).forEach((img) => formData.append('image', img))

        await axios.patch(`${BACKEND_URL}api/v1/events/${event._id}/add-image`,
            formData,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log('in upload img', res)
                setEvent(res.data.updatedEvent)
                console.log(event.images)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteEvent = async () => {
        await axios.delete(`${BACKEND_URL}api/v1/events/${event._id}`)
            .then((res) => {
                console.log('in de event', res)
                navigate('organisation/dashboard')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <div className='lg:mx-32'>
                <div>
                    {
                        !event.eventPoster && <img src={register} alt='event-main-img' className='w-full h-40 mt-10' />
                    }
                    {
                        event.eventPoster && <img src={event.eventPoster} alt='event-main-img' className='w-full h-40 mt-10' />
                    }
                </div>
                <div className='flex flex-col lg:flex-row lg:justify-between px-4'>
                    <h1 className='font-bold text-3xl mt-6 mb-8 lg:text-center'>{event.eventName}</h1>
                    <div>
                        {isPastEvent && isUser && !showRSVP && <p className='py-2 px-2 lg:mt-6 mb-8 text-green-500 text-center text-lg'>Already attended the event</p>}
                        {!isPastEvent && isUser && showRSVP && <button className='bg-blue-400 lg:mt-6 mb-8 text-white text-center px-2 lg:w-60 py-2' onClick={() => handleRSVP()}>RSVP Now</button>}
                        {!isPastEvent && isUser && !showRSVP && <button className='bg-red-400 lg:mt-6 mb-8 text-white text-center px-2 lg:w-60 py-2' onClick={() => handleRemoveRSVP()}>Remove RSVP</button>}
                        {canAddImage && <button className='text-md text-white bg-red-600 text-center py-2 px-2 lg:mt-6 mb-8 rounded' onClick={() => handleDeleteEvent()}>Delete event</button>}
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0'>
                    <div className='flex space-x-4 border border-gray-500 p-4 lg:p-6 lg:w-1/3'>
                        <Calendar />
                        <h4>{format(new Date(event.eventDate), 'PPpp')}</h4>
                    </div>
                    <div className='flex space-x-4 border border-gray-500 p-4 lg:p-6 lg:w-1/3'>
                        <MapPin />
                        <h4>{event.eventMode}</h4>
                    </div>
                    <div className='flex space-x-4 border border-gray-500 p-4 lg:p-6 lg:w-1/3'>
                        <Clock />
                        <h4>{format(new Date(event.eventDate), 'pp')}</h4>
                    </div>
                </div>
                <div className='mt-8'>
                    <h2 className='font-bold text-3xl mb-2 text-center '>Event description</h2>
                    <p className='p-2 lg:p-0 text-center text-xl mt-3'>{event.eventDescription}</p>
                </div>
                {/* <div className='mt-8'>
                    <h2 className='font-bold text-xl mb-2 text-center lg:text-left'>Event Guests</h2>
                    <div className='flex space-x-4 lg:space-x-20 flex-wrap'>
                        
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className='flex flex-col lg:flex-row lg:space-x-6'>
                                <div>
                                    <img src={register} alt='guest-img' className='w-20 h-20 rounded-full' />
                                </div>
                                <div className='pt-2'>
                                    <h4 className='font-semibold text-lg'>Guest {i + 1}</h4>
                                    <p className='text-md'>Description {i + 1}</p>
                                </div>
                            </div>
                        ))}
                       
                    </div>
                </div> */}
                <div className='mt-14 mb-8'>
                    <h2 className='font-bold text-3xl mb-2 text-center '>Event Organiser</h2>
                    <div className='mt-3'>
                        <h4 className='text-center text-xl'>Organisation Name: <b>{event.organiser?.organisationName}</b></h4>
                        <h4 className='text-center text-xl'>Organisation Email: <b>{event.organiser?.organisationEmail}</b></h4>
                        {/* <div> */}
                        {/* <Link  className='bg-gray-300 w-full lg:w-60 pl-4 my-1 text-center lg:mx-0'
                             to={`org-profile/${event.organiser?._id}`}
                            >Know More</Link> */}
                        {/* </div> */}
                        <div className="flex items-center justify-center ">
                            <button
                                type='button'
                                className='bg-gray-300 w-full lg:w-80 pl-4 py-1 my-3 text-center mx-auto text-xl'
                                onClick={() => handleNavigate()}
                            >
                                Know more
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-14'>
                    <h2 className='font-bold text-3xl mb-2 text-center'>Event Images</h2>
                    <div>
                        {canAddImage && <div className='flex flex-col lg:flex-row lg:space-x-8 mb-5 mx-2 space-y-3 lg:space-y-0'>
                            <input className=''
                                type='file' onChange={(e) => setAddImage(e.target.files)}
                            />
                            <button type='button' onClick={() => handleAddImage()} className='bg-blue-400 p-2 rounded text-white'>Add images</button>
                        </div>}
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-6 md:grid-cols-4'>
                        {
                            event.images.map((img, i) => (
                                <div key={i} className='mx-2'>
                                    <img className='h-full w-full lg:w-54' src={img} alt={`event-img-${i}`} />
                                </div>
                            ))
                        }
                        {
                            // console.log(event.images)
                            event.images.length === 0 && <p className='text-md py-4 text-center text-xl'>No images to display !</p>
                        }
                    </div>

                </div>
                {/* <div className='mt-8'>
                    <h2 className='font-bold text-xl mb-2 text-center lg:text-left'>Event Reviews</h2>
                </div>
                <div className='mt-8'>
                    <h2 className='font-bold text-xl mb-2 text-center lg:text-left'>Write your review</h2>
                </div> */}
            </div>
        </div>
    );
};

export default DetailedEventCard;
