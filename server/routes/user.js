const express = require('express')
const router = express.Router()

const {userPastEvents , userRSVPEvents , deleteUser , getUserDetails , updateUserDetails , userUpcomingEvents} = require('../controllers/user')
const { verifyJWT , verifyIsOrganisation , verifyIsIndividual}   =  require('../middleware/Auth')

router.route('/past-events').get(verifyJWT , verifyIsIndividual , userPastEvents)
router.route('/upcoming-events').get(verifyJWT , verifyIsIndividual , userUpcomingEvents)
router.route('/rsvp-events').get(verifyJWT , verifyIsIndividual , userRSVPEvents)
router.route('/delete-account').delete(verifyJWT , verifyIsIndividual , deleteUser)
router.route('/update').put(verifyJWT , verifyIsIndividual , updateUserDetails)
router.route('/get-details').get(verifyJWT , verifyIsIndividual, getUserDetails)

module.exports = router