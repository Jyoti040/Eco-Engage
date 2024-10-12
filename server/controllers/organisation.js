const Organisation = require('../models/OrganisationSchema')
const CustomAPIError = require('../errors/CustomError')
const Event = require('../models/EventSchema')
const {  mongoose } = require('mongoose')
// const {ObjectId} = mongoose.Types

const organisationPastEvents = async(req,res,next)=>{
    try {
        const {orgId} = req.params
        console.log(req.params)
        console.log(orgId)

        const updatedOrgId = new mongoose.Types.ObjectId(orgId); 
        const organisation = await Organisation.findById(updatedOrgId).select(" -password -token")
        if(!organisation){
            throw new CustomAPIError('No such organisation exists' , 401)
        }

        const currentDate = new Date()
        const pastEvents = await Event.find({
            organiser : updatedOrgId ,
            eventDate : {$lt : currentDate}
        }).populate('organiser').populate('rsvps').sort({eventDate : -1})

        res.status(200).json({
            message : 'success',
            pastEvents
        })
        
    } catch (error) {
        next(error)
    }
}

const organisationUpcomingEvents = async(req,res,next)=>{
    try {
        const {orgId} = req.params
        console.log(req.params)
        console.log(orgId)

        const updatedOrgId = new mongoose.Types.ObjectId(orgId); 
        const organisation = await Organisation.findById(updatedOrgId).select(" -password -token")
        if(!organisation){
            throw new CustomAPIError('No such organisation exists' , 401)
        }


        const currentDate = new Date()
        console.log(currentDate)
        const upcomingEvents =await Event.find({
            organiser : updatedOrgId ,
            eventDate : {$gt : currentDate}
        }).populate('organiser').populate('rsvps').sort({eventDate : 1})

        res.status(200).json({
            message : 'success',
            upcomingEvents
        })
        
    } catch (error) {
        next(error)
    }
}

const getOrganisationDetails = async(req ,res , next) => {
    try {
        console.log(req.params)
        let {orgId} = req.params
        console.log(orgId)
        
        orgId = new mongoose.Types.ObjectId(orgId); 
        const organisation = await Organisation.findById(orgId).select(" -password -token")
        if(!organisation){
            throw new CustomAPIError('No such organisation exists' , 401)
        }

        res.status(200).json({
            message : 'Organisation details fetched successfully',
            organisation
        })
        
    } catch (error) {
        next(error)
    }
}

const getAllOrganisations = async(req ,res , next) => {
     try {
        
        const organisations = await Organisation.find().select(" -token -password")
        res.status(200).json({
            message : 'Organisations fetched successfully',
            organisations
        })

     } catch (error) {
        next(error)
     }
}

const deleteOrganisation = async(req,res,next) => {
    try {

        const {orgId} = req.params

        // if(orgId !== req.organisation._id){
        //     throw new CustomAPIError('Invalid organisation id',401)
        // }

        const deletedOrganisation = await Organisation.findByIdAndDelete(req.organisation._id)

        if(!deletedOrganisation){
            throw new CustomAPIError('No such organisation exists' , 404)
        }
        
        await Event.deleteMany({
            organiser : req.organisation._id
        })

        const options = {
            httpOnly : true ,
            secure : true ,
          }
    
          
        res.status(200)
        .clearCookie("authToken",options)
        .json({
            message :  'Organisation account deleted '
        })
    } catch (error) {
        next(error)
    }
}

const updateOrganisationDetails = async(req,res,next) =>{
    console.log('in update org',req.body.dataToSend)
    try {
        const updateOrganisation = await Organisation.findOneAndUpdate({
            _id : req.organisation._id
        },
        req.body,
        {new : true}
    )
    if(!updateOrganisation){
        throw new CustomAPIError('Error while updating details' , 500)
    }

    res.status(200).json({
        message : 'Organisation details updated',
        success : true,
        updateOrganisation
    })
    } catch (error) {
        next(error)
    }
}

module.exports = {organisationPastEvents , organisationUpcomingEvents ,updateOrganisationDetails,getOrganisationDetails , getAllOrganisations , deleteOrganisation}