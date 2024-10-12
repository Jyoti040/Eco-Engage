const CustomAPIError = require('../errors/CustomError')
const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/UserSchema')
const jwt =require("jsonwebtoken")
const Organisation = require('../models/OrganisationSchema')

 const verifyJWT = async(req,res,next) =>{
       
    try {
        console.log('all cookies',req.cookies)
        // const authHeader = req.headers?.authorization;
        // console.log("auth header",authHeader)
        // let token=""
        // if(authHeader && authHeader.startsWith('bearer ')){
        //     console.log(authHeader.split(' '))
        //     token = authHeader.split(' ')[1] 
        //     console.log(token)
        // }else{
        //     token = req.cookies?.authToken
        // } 
         token = req.cookies?.authToken
        console.log('in jwt token',token)
        if(!token ){
            throw new CustomAPIError('Unauthorised request',401)
        }
        console.log('token in jwt',token)
        console.log('above jwt')

        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    
        const user = await User.findById(decodedToken?.ID).select("-password -token")
        console.log('user if there',user)
        console.log('after user in jwt')
        const organisation = await Organisation.findById(decodedToken?.ID).select("-password -token")

        if(user){
           // throw new CustomAPIError('Invalid token',401)
           req.user = user 
        }
        if(organisation){
           // throw new CustomAPIError('Invalid token',401)
           req.organisation = organisation 
        }
        next()
    } catch (error) {
             res.status(error?.statusCode || 401).json({
                message : error?.message || 'Token not verified' 
             })
    }
}

const verifyIsOrganisation = async(req,res,next)=>{
    try {
        if(req?.organisation){
            next()
        }else{
            throw new CustomAPIError('No organization logged in',401)
        }
    } catch (error) {
        next(error)
    }
}

const verifyIsIndividual = async(req,res,next)=>{
    try {
        console.log('in jwt indi')
        if(req?.user){
            next()
        }else{
            throw new CustomAPIError('No organization logged in',401)
        }
    } catch (error) {
        next(error)
    }
}
module.exports ={ verifyJWT , verifyIsOrganisation , verifyIsIndividual}