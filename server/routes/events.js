const express = require('express')
const router = express.Router();
const upload = require('../utils/multer')
const {createEvent , updateEvent ,getRsvpEvent, deleteEvent , rsvpEvent, addImage, removeRsvpEvent , getPastEvents , getUpcomingEvents, addImages} = require('../controllers/events')
const { verifyJWT , verifyIsOrganisation , verifyIsIndividual} = require('../middleware/Auth');
// const { route } = require('./organisation');

//router.route('/').post(verifyJWT,verifyIsOrganisation,createEvent)
router.post('/',verifyJWT,verifyIsOrganisation, upload.single('eventPoster'),async (req,res,next)=>{
    try {
        console.log('in image upload ',req.file.path)
        const eventPoster = req.file.path
        req.body.eventPoster = eventPoster;
        console.log('after file uplaod', eventPoster)
        next()
    } catch (error) {
        next(error)
    }
},createEvent )
router.route('/:eventId').put(verifyJWT,verifyIsOrganisation,updateEvent)
router.route('/:eventId').delete(verifyJWT,verifyIsOrganisation,deleteEvent)
router.route('/:eventId/rsvp').patch(verifyJWT,verifyIsIndividual,rsvpEvent)
router.route('/:eventId/remove-rsvp').patch(verifyJWT,verifyIsIndividual,removeRsvpEvent)
router.route('/past-events').get(getPastEvents)
router.route('/:eventId/get-rsvp').get(getRsvpEvent)
router.route('/upcoming-events').get(getUpcomingEvents)

router.patch('/:eventId/add-image',verifyJWT,verifyIsOrganisation,upload.array('image'),async (req,res,next)=>{
    try {
        console.log('in file upload',req.files)
        const images = req.files.map(file=>file.path)
        req.body.images = images
        console.log('after files upload',images)
        next()
    } catch (error) {
        next(error)
    }
},addImages)

module.exports = router