const multer = require('multer')
const { CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary')

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : 'eco_engage',
        
    }
})

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null,'./public/temp')
//     },
//     filename : function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
const upload = multer({storage : storage})

module.exports = upload