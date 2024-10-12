const express = require('express')
const router = express.Router()

const { verifyJWT , verifyIsOrganisation , verifyIsIndividual}   =  require('../middleware/Auth')
const {organisationPastEvents , organisationUpcomingEvents ,updateOrganisationDetails, getOrganisationDetails , getAllOrganisations , deleteOrganisation} = require('../controllers/organisation')

router.route('/:orgId/upcoming-events').get(organisationUpcomingEvents )
router.route('/:orgId/past-events').get(organisationPastEvents)
router.route('/:orgId/get-details').get(getOrganisationDetails) // public route
router.route('/all-organisations').get(getAllOrganisations)
router.route('/:orgId/delete-account').delete(verifyJWT , verifyIsOrganisation , deleteOrganisation)
router.route('/:orgId/update').put(verifyJWT , verifyIsOrganisation , updateOrganisationDetails)



module.exports = router