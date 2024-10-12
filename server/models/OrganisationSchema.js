const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const OrganisationSchema = new mongoose.Schema({
    organisationName : {
        type : String ,
        required : [true , 'Orgnaisation name is required'],
        lowercase : true ,
        trim : true
    },
    organisationEmail : {
        type : String ,
        required : [true , 'Orgnaisation email is required'],
        lowercase : true ,
        trim : true,
        unique : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       , 'Enter a valid email'
     ]
    },
    password : {
        type : String ,
        required : [true , 'Password is required'],
    },
    country : {
        type : String ,
        required : [true , 'Country name is required'],
        lowercase : true ,
        trim : true
    },
    city : {
        type : String ,
        required : [true , 'City name  is required'],
        lowercase : true ,
        trim : true
    },
    instagram : {
        type : String ,
        // required : [true , 'Instagram profile is required'],
    },
    website : {
        type : String ,
        // required : [true , 'Website link is required'],
    },
    twitter : {
        type : String ,
        // required : [true , 'Twitter link is required'],
    },
    token : {
        type : String ,
    },
    logo : {
        type : String ,
    }
},{

    timestamps : true
})

OrganisationSchema.pre('save',async function(next){
   
    if(!this.isModified("password")){
        return next()
    }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password , salt)
   next()
})

OrganisationSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

OrganisationSchema.methods.generateJWTToken = function(){
    return  jwt.sign({ID : this._id , organisationName : this.organisationName , type:"organisation"}, process.env.JWT_SECRET , { expiresIn : process.env.JWT_LIFETIME})
}

const Organisation = mongoose.model('Organisation',OrganisationSchema)
module.exports = Organisation