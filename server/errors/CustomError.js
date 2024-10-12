class  CustomAPIError extends Error {
    constructor(message , statuscode){
        super(message)
        this.statusCode = statuscode
    }
}

// class BadRequest extends CustomAPIError{
//     constructor(message){
//         super(message )
//         this.statusCode = 400 
//     }
// }

module.exports = CustomAPIError