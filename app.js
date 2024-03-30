const express = require('express')
const cors = require('cors');
const connectToDB = require('./config/db')
const authRouter = require('./Routes/authRouter')
const TrainPlanRouter = require('./Routes/TrainPlanRouter')
const TrainModuleRouter = require('./Routes/TrainModuleRouter')
const TrainingAssessmentRouter = require('./Routes/TrainingAssesRouter')
const ProgressTrackerRouter = require('./Routes/ProgressTrackerRouter')
// const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const sanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')



const app = express()
connectToDB()
// Middleware to parse JSON request body

app.use(helmet())
app.use(express.json({limit:'10kb'}));

app.use(cors());

app.use(express.static('./public'))

app.use(sanitize())

app.use(xss())

app.use(hpp({whitelist:['id','token']}))


// //rate limiter

// let limiter = rateLimit(
//     {
//         max:500,
//         windowMs: 60*60*100,
//         message:"We have recieved many requests, please try again later after one hour",
//         standardHeaders: true,
//         legacyHeaders: false,
//     }
// )

// app.use('/user',limiter)
app.use('/user',authRouter)
app.use('/admin',TrainPlanRouter,TrainModuleRouter,TrainingAssessmentRouter,ProgressTrackerRouter)


// Start the server after successfully connecting to the database
app.listen(5000, () => {
    console.log('Server started on port 5000');
});
