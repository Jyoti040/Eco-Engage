const Event = require('../models/EventSchema');
const CustomAPIError = require('../errors/CustomError');
const User = require('../models/UserSchema');
const { mongoose, Mongoose } = require('mongoose');
const Organisation = require('../models/OrganisationSchema');

const createEvent = async (req, res, next) => {
    try {
        let {  eventName, eventMode, eventDescription, eventDate, eventCountry, eventCity , eventPoster} = req.body;
        let organiserID = req.organisation._id
       organiserID = new mongoose.Types.ObjectId(organiserID);
        const organisation = await Organisation.findById(organiserID);
        if (!organisation) {
            throw new CustomAPIError('Invalid Event id', 400);
        }

        const newEvent = await Event.create({
            eventName,
            eventMode,
            eventDescription,
            eventDate: new Date(eventDate),
            eventCountry,
            eventCity,
            eventPoster,
            organiser: organiserID
        });

        if (!newEvent) {
            throw new CustomAPIError('Error while creating new event', 500);
        }
        return res.status(201).json({
            message: "Event created successfully",
            newEvent
        });
    } catch (error) {
        next(error);
    }
};

const updateEvent = async (req, res, next) => {
    // try {
    //     let { eventId } = req.params;
    //     const { eventName, eventMode, eventDescription, eventDate, eventCountry, eventCity } = req.body;

    //     eventId = new mongoose.Types.ObjectId(eventId);
    //     const event = await Event.findById(eventId);
    //     if (!event) {
    //         throw new CustomAPIError('No event exists with the given event id', 404);
    //     }

    //     event.eventName = eventName || event.eventName;
    //     event.eventMode = eventMode || event.eventMode;
    //     event.eventDescription = eventDescription || event.eventDescription;
    //     event.eventDate = eventDate || event.eventDate;
    //     event.eventCity = eventCity || event.eventCity;
    //     event.eventCountry = eventCountry || event.eventCountry;

    //     await event.save();

    //     res.status(200).json({
    //         message: "Event details updated successfully",
    //         event
    //     });
    // } catch (error) {
    //     next(error);
    // }
    console.log('in update event',req.body.dataToSend)
    let eventId =  new mongoose.Types.ObjectId(req.body.dataToSend._id)
    try {
        const updateEvent = await Event.findOneAndUpdate({
            _id : eventId
        },
        req.body,
        {new : true}
    )
    if(!updateEvent){
        throw new CustomAPIError('Error while updating details' , 500)
    }

    res.status(200).json({
        message : 'Event details updated',
        success : true,
        updateEvent
    })
    } catch (error) {
        next(error)
    }
};


const deleteEvent = async (req, res, next) => {
    try {
        let { eventId } = req.params;

        eventId = new mongoose.Types.ObjectId(eventId)
        const event = await Event.findById(eventId);
        if (!event) {
            throw new CustomAPIError('No event exists with the given event id', 404);
        }

        const result = await Event.deleteOne({ _id: eventId });
        if (!result.acknowledged) {
            throw new CustomAPIError('Error while deleting event', 500);
        }

        res.status(200).json({
            message: 'Event deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

const rsvpEvent = async (req, res, next) => {
    try {
        let { userId, eventId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(eventId)) {
            throw new CustomAPIError('Invalid user or event ID', 400);
        }

        userId = new mongoose.Types.ObjectId(userId);
        eventId = new mongoose.Types.ObjectId(eventId);

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomAPIError('No such user exists', 404);
        }

        const event = await Event.findById(eventId);
        if (!event) {
            throw new CustomAPIError('No such event exists', 404);
        }

        if (!event.rsvps.includes(userId)) {
            event.rsvps.push(userId);
            console.log('before save', event.rsvps);
            await event.save();
            // Fetch the event again to get the updated document
            const updatedEvent = await Event.findById(eventId);
            console.log('after save', updatedEvent.rsvps);
            return res.status(200).json({
                message: 'Event RSVPed successfully',
                status: true
            });
        } else {
            return res.status(400).json({
                message: 'Event already RSVPed',
                status: false
            });
        }
    } catch (error) {
        next(error);
    }
};

const getRsvpEvent = async (req, res, next) => {
    try {
        let { userId, eventId } = req.query;

        userId = new mongoose.Types.ObjectId(userId);
        eventId = new mongoose.Types.ObjectId(eventId);

        console.log(userId)
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomAPIError('No such user exists', 404);
        }

        const event = await Event.findById(eventId);
        if (!event) {
            throw new CustomAPIError('No such event exists', 404);
        }

        if (event.rsvps.includes(userId)) {
          return  res.status(200).json({
                message: 'Event RSVPed already',
                status: true
            });
        } else {
          return  res.status(200).json({
                message: 'Event RSVPed not done',
                status: false
            });
        }
    } catch (error) {
        next(error);
    }
};

const removeRsvpEvent = async (req, res, next) => {
    try {
        let { userId, eventId } = req.body;

        userId = new mongoose.Types.ObjectId(userId);
        eventId = new mongoose.Types.ObjectId(eventId);

        const user = await User.findById(userId);
        if (!user) {
            throw new CustomAPIError('No such user exists', 404);
        }

        const event = await Event.findById(eventId);
        if (!event) {
            throw new CustomAPIError('No such event exists', 404);
        }

        if (event.rsvps.includes(userId)) {
            event.rsvps = event.rsvps.filter(id => !id.equals(userId));
            console.log('before save',event.rsvps)
            await event.save();
            console.log('after save',event.rsvps)
            res.status(200).json({
                message: 'RSVP removed'
            });
        } else {
            res.status(400).json({
                message: 'Event RSVP not found'
            });
        }
    } catch (error) {
        next(error);
    }
};

const getUpcomingEvents = async (req, res, next) => {
    const currentDate = new Date();
    try {
        const upcomingEvents = await Event.find({
            eventDate: { $gte: currentDate }
        }).populate('organiser').sort({ eventDate: 1 });

        res.status(200).json({
            message: 'Upcoming events fetched successfully',
            upcomingEvents
        });

    } catch (error) {
        next(error);
    }
};

const getPastEvents = async (req, res, next) => {
    const currentDate = new Date();
    try {
        const pastEvents = await Event.find({
            eventDate: { $lt: currentDate }
        }).populate('organiser').sort({ eventDate: -1 }).select(" -password");

        console.log(pastEvents)
        res.status(200).json({
            message: 'Past events fetched successfully',
            pastEvents
        });
    } catch (error) {
        next(error);
    }
};

const addImages = async(req,res,next)=>{
    try {
        let eventId = req.params.eventId;
        eventId = new mongoose.Types.ObjectId(eventId)

        const event = await Event.findById(eventId);

        if(!event){
            throw new CustomAPIError('Invalid  event ID', 400);
        }

       const updatedEvent = await Event.findByIdAndUpdate(
        eventId , 
        {
            $push : { images : {$each : req.body.images}}
        },{
            new : true
        }
       )

       if(!updatedEvent){
        throw new CustomAPIError('Error while adding images', 500);
       }

       res.status(200).json({
        message : 'images uploaded',
        success : true ,
        updatedEvent
       })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    rsvpEvent,
    removeRsvpEvent,
    getPastEvents,
    getUpcomingEvents,
    getRsvpEvent,
    addImages
};
