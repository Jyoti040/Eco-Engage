require('dotenv').config()
const cors = require("cors")
const cookieParser = require("cookie-parser")

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const CustomError = require('./errors/CustomError')
const NotFoundMiddleware = require('./middleware/NotFound')
const ErrorHandlerMiddleware = require('./middleware/ErrorHandler')

const authRoutes = require('./routes/authorise')
const eventRoutes = require('./routes/events')
const organisationRoutes = require('./routes/organisation')
const userRoutes = require('./routes/user')

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true 
}))
app.use(cookieParser())
app.use(express.json())

// app.set("view engine","ejs") //have to verify this

app.use('/auth',authRoutes)
app.use('/api/v1/events',eventRoutes)
app.use('/api/v1/organisation',organisationRoutes)
app.use('/api/v1/user/:userId',userRoutes)

app.use(ErrorHandlerMiddleware)
app.use(NotFoundMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(
            port , ()=>{ console.log(`The server is listening to ${port}`)}
        )
    } catch (error) {
        console.log(error)
    }
}

start()