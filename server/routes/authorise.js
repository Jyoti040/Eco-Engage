const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const {registerOrganisation , registerUser , login , logout , getCurrentUser , forgetPassword, resetPassword} = require('../controllers/auth')
const {verifyJWT} = require('../middleware/Auth')
const imageUplaod = require('../middleware/imageUpload')

//router.route('/register/user').post(imageUplaod,registerUser)
router.post('/register/user' , upload.single('profilePicture'),async (req,res,next)=>{
    try {
        console.log('in image upload ',req.file.path)
        const profilePicture = req.file.path
        req.body.profilePicture = profilePicture;
        console.log('after file uplaod', profilePicture)
        next()
    } catch (error) {
        next(error)
    }
} , registerUser)

router.post('/register/organisation' , upload.single('logo'),async (req,res,next)=>{
    try {
        console.log('in image upload ',req.file.path)
        const logo = req.file.path
        req.body.logo = logo;
        console.log('after file uplaod', logo)
        next()
    } catch (error) {
        next(error)
    }
} , registerOrganisation)
// router.route('/register/organisation').post(registerOrganisation)
router.route('/login').post(login)
router.route('/current-user').get(verifyJWT,getCurrentUser)
router.route('/logout').get(verifyJWT,logout)
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:id/:token').post(resetPassword)

module.exports = router

