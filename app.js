const express = require('express')
const connectToDB = require('./config/db')
const authRouter = require('./Routes/authRouter')
const TrainPlanRouter = require('./Routes/TrainPlanRouter')
const TrainModuleRouter = require('./Routes/TrainModuleRouter')
const TrainingAssessmentRouter = require('./Routes/TrainingAssesRouter')
const ProgressTrackerRouter = require('./Routes/ProgressTrackerRouter')



const app = express()
connectToDB()
// Middleware to parse JSON request body
app.use(express.json());



app.use('/user',authRouter)
app.use('/admin',TrainPlanRouter,TrainModuleRouter,TrainingAssessmentRouter,ProgressTrackerRouter)


// Start the server after successfully connecting to the database
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
