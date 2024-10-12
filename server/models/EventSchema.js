const Organisation = require('./OrganisationSchema')
const User = require('./UserSchema')
const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    eventName : {
        type : String ,
        required : [true , 'please provide the event name'],
    },
    eventDate : {
        type : Date,
        required : [true , 'please provide the event date'],
    },
    eventMode : {
        type : String ,
        enum : {
            values : ['offline' , 'online'],
            message : '{VALUE} not supported'
        }
    },
    eventCountry : {
        type:String , 

    },
    eventCity : {
        type:String ,

    },
    eventPoster : {
        type:String ,
    },
    eventDescription : {
        type : String , 
        required : [true , 'please provide the event description'],
    },
    createdAt: {
        type : Date , 
        default : Date.now()
    },
    organiser : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Organisation',
    },
    rsvps : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    images : [
        {
            type : String
        }
    ],
    // attendees : [
    //     {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : 'User'
    //     }
    // ],
})

const Event = mongoose.model('Event',EventSchema) 
module.exports = Event