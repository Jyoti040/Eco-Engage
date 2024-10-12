import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeEventCard from './EventCards/HomeEventCard';
import { Link } from 'react-router-dom';
import { ArrowUpRightFromSquareIcon, SearchIcon } from 'lucide-react';

// /api/v1/events
const backendURL = import.meta.env.VITE_BACKEND_URL;

const AllUpcomingEvents = ({ homePage = false }) => {
  const [filteredEvents, setfilteredEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [isFilteredEvents, setIsFilteredEvents] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${backendURL}api/v1/events/upcoming-events`)
      .then((res) => {
        setLoading(false);
        setEvents(res.data.upcomingEvents);
        setfilteredEvents(res.data.upcomingEvents);
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
        setError(err.response.data.message);
      });
  }, []);

  if (loading) {
    return <h2 className="pl-4 lg:text-lg font-md my-10">Loading...</h2>;
  }

  const handleFilteredEvents = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setTitle(searchTerm); 

    if (searchTerm === '') {
      setfilteredEvents(events); 
      setIsFilteredEvents(true);
    } else {
      const filtered = events.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm)
      );
      setfilteredEvents(filtered);
      setIsFilteredEvents(filtered.length > 0);
    }
  };

  return (
    <div className="bg-white my-10 mx-8">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <h1 className="lg:text-left lg:ml-4 font-bold text-4xl mb-8 text-secondaryDarkGreen animate-slideIn">
          {!homePage && 'All'} Upcoming events
        </h1>
        {homePage && (
          <Link to="/all-upcoming-events">
            <div className="flex space-x-2 mb-6">
              <p className="text-lg">View All</p>
              <ArrowUpRightFromSquareIcon />
            </div>
          </Link>
        )}

        {!homePage && (
          <div className="flex flex-row border rounded-lg mb-4 w-1/3 space-x-2">
            <SearchIcon className="mt-4" />
            <input
              className="focus:outline-none text-lg"
              type="text"
              name="search-event"
              value={title}
              onChange={handleFilteredEvents}
              placeholder="Enter event title"
            />
          </div>
        )}
      </div>

      {events.length === 0 && (
        <h2 className="pl-4 lg:text-lg font-md">No events to display!</h2>
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16">
        {filteredEvents.map((event, index) => (
          <div key={index}>
            <HomeEventCard event={event} />
          </div>
        ))}
      </div>

      {!isFilteredEvents && (
        <h2 className="pl-4 lg:text-lg font-md">No matching events found!</h2>
      )}
    </div>
  );
};

export default AllUpcomingEvents;
