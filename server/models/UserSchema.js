const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    userName : {
        type : String ,
        required : [true , 'User name is required'],
        lowercase : true ,
        trim : true
    },
    userEmail : {
        type : String ,
        required : [true , 'User email is required'],
        lowercase : true ,
        trim : true,
        unique : [true,'Email already registered  '],
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
    token : {
        type : String ,
    },
    profilePicture : {
        type : String
    },
},{
    timestamps : true
})

UserSchema.pre('save',async function(next){
   
    if(!this.isModified("password")){
        return next()
    }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password , salt)
   next()
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

UserSchema.methods.generateJWTToken = function(){
    return  jwt.sign({ID:this._id , userName : this.userName , type:"user"}, process.env.JWT_SECRET , { expiresIn : process.env.JWT_LIFETIME})
}

const User = mongoose.model('User', UserSchema)
module.exports = User