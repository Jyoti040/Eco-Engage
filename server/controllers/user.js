const User = require('../models/UserSchema')
const CustomAPIError = require('../errors/CustomError')
const Event = require('../models/EventSchema')
const {  mongoose } = require('mongoose')

const userPastEvents = async(req,res,next)=>{
    try {
        const userId = req.user._id
        
        console.log('user past events  server above user find ')
        const user = await User.findById(userId)
        if(!user){
            throw new CustomAPIError('No such user exists' , 401)
        }
        console.log('user past events  server user find ')
        const currentDate = new Date()
        const pastEvents = await Event.find({
            rsvps: { $in: [userId] },
            eventDate : {$lt : currentDate}
        }).populate('organiser')
        
        console.log('user past events  server ',pastEvents)
        res.status(200).json({
            message : 'success',
            pastEvents
        })
        
    } catch (error) {
        console.log('user past events  server  error')
        next(error)
    }
}
const userUpcomingEvents = async(req,res,next)=>{
    try {
        const userId = req.user._id
        
        console.log('user upcoming events  server above user find ')
        const user = await User.findById(userId)
        if(!user){
            throw new CustomAPIError('No such user exists' , 401)
        }
        console.log('user upcoming events  server user find ')
        const currentDate = new Date()
        const upcomingEvents = await Event.find({
            rsvps: { $in: [userId] },
            eventDate : {$gte : currentDate}
        }).populate('organiser')
        
        console.log('user past events  server ',upcomingEvents)
        res.status(200).json({
            message : 'success',
            upcomingEvents
        })
        
    } catch (error) {
        console.log('user past events  server  error')
        next(error)
    }
}

const userRSVPEvents = async(req,res,next)=>{
    try {
        const userId = req.user._id
        
        console.log('user past events  server above user find ')
        const user = await User.findById(userId)
        if(!user){
            throw new CustomAPIError('No such user exists' , 401)
        }
        console.log('user rsvp events  server user find ')
        const currentDate = new Date()
        const pastEvents = await Event.find({
            rsvps : userId ,
            eventDate : {$lt : currentDate}
        }).populate('organiser')
        
        console.log('user past events  server ',pastEvents)
        res.status(200).json({
            message : 'success',
            pastEvents
        })
        
    } catch (error) {
        console.log('user past events  server  error')
        next(error)
    }
}

const deleteUser = async(req,res,next) => {
    try {

        const {userId} = req.params
        
        

        // if(userId !== req.user._id){
        //     throw new CustomAPIError('Invalid user id',401)
        // }

        const deletedUser = await User.findByIdAndDelete(req.user._id)

        if(!deletedUser){
            throw new CustomAPIError('No such user exists' , 404)
        }
        
        await Event.updateMany({
            $or : [{rsvps : req.user._id} , {attendees : req.user._id}],
    },{
          $pull : [{rsvps : req.user._id} , {attendees : req.user._id}], // deletes userid from rsvp and attendees array 
    })

    const options = {
        httpOnly : true ,
        secure : true ,
      }


        res.status(200)
        .clearCookie("authToken",options)
        .json({
            message :  'User account deleted '
        })
    } catch (error) {
        next(error)
    }
}
const getUserDetails = async(req ,res , next) => {
    try {
        // console.log(req.params)
        // let {userId} = req.params
        // console.log(userId)
        
        // userId = new mongoose.Types.ObjectId(userId); 
       console.log(req.user._id)
        const user = await User.findById(req.user._id).select(" -password -token")
        if(!user){
            throw new CustomAPIError('No such user exists' , 401)
        }

        res.status(200).json({
            message : 'User details fetched successfully',
            user
        })
        
    } catch (error) {
        next(error)
    }
}
const updateUserDetails = async(req,res,next) =>{
    console.log('in update user',req.body.dataToSend)
    try {
        const updateUser = await User.findOneAndUpdate({
            _id : req.user._id
        },
        req.body,
        {new : true}
    )
    if(!updateUser){
        throw new CustomAPIError('Error while updating details' , 500)
    }

    res.status(200).json({
        message : 'User details updated',
        success : true,
        updateUser
    })
    } catch (error) {
        next(error)
    }
}

module.exports = {userPastEvents ,userUpcomingEvents
    , userRSVPEvents ,deleteUser,updateUserDetails,getUserDetails}