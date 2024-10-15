import React from 'react'
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProfileEventCard from './Components/EventCards/ProfileEventCard';
import HomeEventCard from './Components/EventCards/HomeEventCard';
import AllUpcomingEvents from './Components/AllUpcomingEvents';
import AllPastEvents from './Components/AllPastEvents';
import DetailedEventCard from './Components/EventCards/DetailedEventCard';
import UserProfile from './Components/User/ViewUserProfile';
import AuthNavbar from './Components/AuthNavbar';
import EventForm from './Components/Organisation/EventForm';
import GeneralOrganisationProfile from './Components/Organisation/GeneralProfile'
import AuthOrganisationProfile from './Components/Organisation/AuthProfile'
import UserPrivateRoute from './Components/PrivateRoutes/UserPrivateRoute';
import UserDashboard from './Components/User/UserDashboard';
import OrganisationPrivateRoute from './Components/PrivateRoutes/OrganisationPrivateRoute';
import OrganisationDashboard from './Components/Organisation/OrganisationDashboard';
import UserPastEvents from './Components/User/UserPastEvents';
import UserUpcomingEvents from './Components/User/UserUpcomingEvents';
import OrganisationUpcomingEvents from './Components/Organisation/OrganisationUpcomingEvents';
import OrganisationPastEvents from './Components/Organisation/OrganisationPastEvents';
import AboutOrganisation from './Components/Organisation/AboutOrganisation';
import UpdateUserProfile from './Components/User/UpdateUserProfile';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  return (
    <>
    
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile-event-card' element={<ProfileEventCard/>}/>
        <Route path='/home-event-card' element={<HomeEventCard/>}/>
        <Route path='/all-upcoming-events' element={<AllUpcomingEvents/>}/>
        <Route path='/all-past-events' element={<AllPastEvents/>}/>
        <Route path='/org-profile/general/:orgId' element={<GeneralOrganisationProfile/>}/>  
        <Route path='/org-profile/:orgId' element={<AboutOrganisation/>}/>  
        <Route path='/view/event-details/:eventId' element={<DetailedEventCard/>}/>  

       {/* private user routes */}
       <Route path='/user' element={<UserPrivateRoute />}>
         <Route path='dashboard' element={<UserDashboard />} />
         <Route path='past-events' element={<UserPastEvents />} />
         <Route path='upcoming-events' element={<UserUpcomingEvents />} />
         <Route path='view-profile/:userId' element={<UserProfile/>}/>
         <Route path='update-profile/:userId' element={<UpdateUserProfile/>}/>
</Route>

       {/* private org routes */}
       <Route path='/organisation' element={<OrganisationPrivateRoute/>}>
            <Route path='dashboard' element={<OrganisationDashboard/>}/>
            <Route path='upcoming-events' element={<OrganisationUpcomingEvents/>}/>
            <Route path='past-events' element={<OrganisationPastEvents/>}/>
            <Route path='update-profile/:orgId' element={<AuthOrganisationProfile/>}/>
            <Route path='create-event' element={<EventForm/>}/>
       </Route>

        {/* here specific event details , url will change */}
         
        <Route path='/auth-navbar' element={<AuthNavbar/>}/>  
        <Route path='/user-profile' element={<UserProfile/>}/>  
        <Route path='/event-form' element={<EventForm/>}/>  
        
        <Route path='*' element={<Navigate to='page-not-found'/>}/>

      </Routes>
    <Footer/>  
    </Router>
    </>
  )
}

export default App