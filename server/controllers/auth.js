const User = require('../models/UserSchema')
const Organisation = require('../models/OrganisationSchema')
const CustomAPIError = require('../errors/CustomError')
const asyncHandler = require('../utils/asyncHandler')

const generateUserToken = async(Id,next) => {
    try {
        const user = await User.findById(Id);
        console.log(user)

        if(!user){
              throw new CustomAPIError('No user exists with the iven id',401);
        }
        const token = user.generateJWTToken()
        if(!token){
            throw new CustomAPIError('Something went wrong while generating tokens',500);
      }
        console.log(token)
        user.token = token
        await user.save({validateBeforeSave:false})
        
        return token 
        
    } catch (error) {
        // throw new CustomAPIError('Something went wrong while generating tokens',500);
        next(error)
    }
}

const generateOrganisationToken = async(Id,next) => {
    try {
        const organisation = await Organisation.findById(Id);

        if(!organisation){
              throw new CustomAPIError('No organisation exists with given id',401);
        }
        const token = organisation.generateJWTToken()

        if(!token){
              throw new CustomAPIError('Something went wrong while generating tokens',500);
        }
        organisation.token = token
        await organisation.save({validateBeforeSave:false})
        
        return token 

    } catch (error) {
        console.log('In generate token')
        // throw new CustomAPIError('Something went wrong while generating tokens',500);
        next(error)
    }
}

const registerUser =async(req,res,next) => {

   try {
     const {userName , email , password , country , city , profilePicture } = req.body
 
     console.log('in register user',req.body)
  
     if([userName , email , password , country , city ].some((field)=>field?.trim()==="")){
         throw new CustomAPIError('Please provide all the details',400)
     }
 
     const userEmail = email
     const user = await User.findOne({
         $or :[ {userName , userEmail} ]
     })
 
     if(user){
          throw new CustomAPIError('User already exists , please register with unique credentials' , 409)//bad req status code
         
     } 


     console.log('after user error')
 
     const newUser = await User.create({
         userName:userName , userEmail : email , country , city , password , profilePicture
     })
 
     const createdUser = await User.findById(newUser._id).select(" -password")

     if(!createdUser){
        throw new CustomAPIError("Somehthing went wrong while registering user")
    }

     const token = await generateUserToken(createdUser._id)
      console.log('user token',token)
      console.log('created user',createdUser)
     const options = {
        httpOnly : true ,
        secure : true ,
      }

     return res.status(201)
     .cookie("authToken",token,options)
     .json({
         message : 'User registerd successfully' ,
         createdUser
     })
   } catch (error) {
    next(error)
   }
}
// const registerOrganisation =async(req,res,next) => {

//    try {
//      const {organisationName ,  organisationEmail , password , country , city } = req.body
 
//      console.log(req.body)
 
//      if([organisationName ,  organisationEmail , password , country , city ].some((field)=>field?.trim()==="")){
//          throw new CustomAPIError('Please provide all the details',400)
//      }
 
//     //  const userEmail = email
//      const organisation = await Organisation.findOne({
//          $or :[ {organisationName ,  organisationEmail} ]
//      })
 
//      if(organisation){
//           throw new CustomAPIError('Organisation already exists , please register with unique credentials' , 409)//bad req status code
         
//      }
 
//      const newOrganisation = await Organisation.create({
//         organisationName ,  organisationEmail ,  country , city , password
//      })
 
//      const createdOrganisation = await Organisation.findById(newOrganisation._id).select(" -password")

//      if(!createdOrganisation){
//         throw new CustomAPIError("Somehthing went wrong while registering user")
//     }

//      const token = await generateOrganisationToken(createdOrganisation._id)
      
//      const options = {
//         httpOnly : true ,
//         secure : true ,
//       }

//      return res.status(201)
//      .cookie("authToken",token,options)
//      .json({
//          message : 'organisation registerd successfully' ,
//          createdOrganisation
//      })
//    } catch (error) {
//     console.log('In register org')
//     next(error)
//    }
// }

// const registerOrganisation = async(req,res,next) => {
//    try {
//      const {organisationName , organisationEmail , password , country , city  } = req.body
 
//      const organisation = await Organisation.findOne({
//         $or :[ {organisationName , organisationEmail} ]
//      })
 
//      if(organisation){
//           throw new CustomAPIError('Organisation already exists , please register with unique credentials' , //bad req status code
//          )
//      }
 
//      const newOrganisation = await  Organisation.create({...req.body})

//      const createdOrgansiation = await Organisation.findById(newOrganisation._id).select("-password")

//      if(!createdOrgansiation){
//         throw new CustomAPIError("Somehthing went wrong while registering organisation")
//     }

//      const token = await generateOrganisationToken(createdOrgansiation._id)

//      const options = {
//         httpOnly : true ,
//         secure : true ,
//       }

//      return res.status(201)
//      .cookie("authToken",token,options)
//      .json({
//          message : 'Organisation registerd successfully' ,
//          createdOrgansiation
//      })

//    } catch (error) {
//     next(error)
//    }

// }

const registerOrganisation = async (req, res, next) => {
    try {
        const { organisationName, organisationEmail, password, country, city , website , instagram ,twitter ,logo} = req.body;

        if ([organisationName, organisationEmail, password, country, city, website , instagram ,twitter].some(field => field?.trim() === "")) {
            throw new CustomAPIError('Please provide all the details', 400);
        }

        // Check if the organisation already exists
        const organisation = await Organisation.findOne({ organisationEmail });

        if (organisation) {
            throw new CustomAPIError('Organisation already exists, please register with unique credentials', 409);
        }

        // Create new organisation
        const newOrganisation = await Organisation.create({
            organisationName,
            organisationEmail,
            country,
            city,
            password,
            website , 
            instagram ,
            twitter,
            logo
        });

        const createdOrganisation = await Organisation.findById(newOrganisation._id).select("-password");

        if (!createdOrganisation) {
            throw new CustomAPIError("Something went wrong while registering the organisation");
        }

        const token = await generateOrganisationToken(createdOrganisation._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(201)
            .cookie("authToken", token, options)
            .json({
                message: 'Organisation registered successfully',
                createdOrganisation
            });
    } catch (error) {
        console.log('In register org', error);
        next(error);
    }
};

const login = async(req,res,next) => {
     console.log('in login')
  try {
      const {email , password } = req.body
      console.log('in login route')
      if(!email ) {
          throw new CustomAPIError('Please provide an email ',400) // bad req status code
      }
      if(!password ) {
          throw new CustomAPIError('Please provide the password ',400)  // bad req status code
      }
    
      const user = await User.findOne({userEmail : email})
      const organisation = await Organisation.findOne({organisationEmail : email})
  
      
     if( !user && !organisation){
         throw new CustomAPIError('No such email is registered , please create an account first',404) // unauth errorr
     } 
     console.log('user or org in login')
     if(user){
        const isPasswordCorrect = await user.comparePassword(password)
  
        console.log('password correct',isPasswordCorrect)
  
        if(!isPasswordCorrect){
            throw new CustomAPIError('Incorrect password',401) // unauth errorr
        }
  
        const token = await generateUserToken(user._id)
        const loggedInUser = await User.findById(user._id).select(" -password")
  
        const options = {
          httpOnly : true ,
          secure : true ,
        }
  
        return res.status(200)
        .cookie("authToken",token,options)
        .json({
            isUser : true,
             user : loggedInUser ,
              message : 'user logged in successfully'
        })
        
     }
  
     if(organisation){
        const isPasswordCorrect = await organisation.comparePassword(password)
  
        if(!isPasswordCorrect){
            throw new CustomAPIError('Incorrect password',) // unauth errorr
        }
  
        const token = await generateOrganisationToken(organisation._id)
        const loggedInOrganisation = await Organisation.findById(organisation._id).select(" -password")
  
        const options = {
          httpOnly : true ,
          secure : true ,
        }
  
        return res.status(200)
        .cookie("authToken",token,options)
        .json({
            isOrganisation : true,
             organisation : loggedInOrganisation ,
              message : 'organisation logged in successfully'
        })
        
     }
  } catch (error) {
    next(error)
  }

}


const logout = async(req,res,next)=>{

    try {
        const user = await User.findById(req?.user?._id)
       const organisation = await Organisation.findById(req?.organisation?._id)
    

    if(user){
        await User.findByIdAndUpdate(
            req.user._id , 
            {
                $unset : {
                    token : ""
                }
            },{
                new : true 
            }
        )
    }
    if(organisation){
        await Organisation.findByIdAndUpdate(
            req.organisation._id , 
            {
                $unset : {
                    token : ""
                }
            },{
                new : true 
            }
        )
    }
    const options = {
        httpOnly : true ,
        secure : true ,
      }
    
      return res.status(200)
      .clearCookie("authToken",options)
      .json({
        message : 'logged out successfully'
      })
    } catch (error) {
        next(error)
    }
}


const getCurrentUser =  async(req,res,next)=> {
   try {

    const user = req?.user
    const organisation = req?.organisation

    if(user){
        return res.status(200).json({
            isUser : true,
            isOrg : false,
            user : req?.user ,
            message : 'user fetched successfuly'
        })
    }
    if(organisation){
        return res.status(200).json({
            isOrg : true,
            isUser : false,
            organisation : req?.organisation ,
            message : 'organisation fetched successfuly'
        })
    }
   } catch (error) {
    next(error)
   }
}

const updateUserDetails = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

// const isUserLoggedIn = async(req,res,next)=> {
//     try {
//         let isUser = true
//     } catch (error) {
//         next(error)
//     }
// }


module.exports = {registerOrganisation , registerUser , login , logout , getCurrentUser}