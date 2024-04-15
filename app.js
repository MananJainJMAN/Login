const path = require('path'); 
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const authRouter = require('./Routes/authRouter');
const TrainPlanRouter = require('./Routes/TrainPlanRouter');
const TrainModuleRouter = require('./Routes/TrainModuleRouter');
const TrainingAssessmentRouter = require('./Routes/TrainingAssesRouter');
const ProgressTrackerRouter = require('./Routes/ProgressTrackerRouter');
const helmet = require('helmet');//provide security headers
const sanitize = require('express-mongo-sanitize');// prevent injection
const xss = require('xss-clean');//preventing xss
const hpp = require('hpp');// preventing parameter pollution
const { spawn , exec } = require('child_process');
const rateLimit = require('express-rate-limit');// request rate limiting

const app = express();
connectToDB();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.use(express.static('./public'));
app.use(sanitize());
app.use(xss());
app.use(hpp({ whitelist: ['id', 'token'] }));

// // Configure the rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
//   max: 100, // Limit each IP to 100 requests per window (15 minutes)
//   message: 'Too many requests from this IP, please try again after 15 minutes'
// });

// // Apply the rate limiter middleware to all requests
// app.use(limiter);

app.use('/user', authRouter);
app.use('/admin', TrainPlanRouter, TrainModuleRouter, TrainingAssessmentRouter, ProgressTrackerRouter);

let pythonProcess = null;

//Function to start the Python script
function startPythonScript() {
  pythonProcess = spawn('python', ['./DATA/Migration/MongoToSSMS.py']);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`fetching data from mongodb, status: ${code}`);
    // Restart the script after a delay (e.g., 5 seconds)
    setTimeout(startPythonScript, 6000);
  });
}


function dbtTrigger(req, res) {
  const dbtMainProjectFolderPath = path.join(__dirname, 'DATA', 'DBT', 'ETMS');

  // Change the working directory to the main_project folder
  process.chdir(dbtMainProjectFolderPath);

  // Execute the DBT command
  exec('dbt run', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send(`DBT execution failed: ${error.message}`);
    }

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send(`DBT execution failed: ${stderr}`);
    }

    console.log(`DBT output: ${stdout}`);
    res.status(200).send('DBT execution successful');
  });
}

function startMachineLearning() {
  const pythonProcess1 = spawn('python', ['./ML/FlaskApp/Prediction.py']);

  pythonProcess1.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output === 'flaskAPI is active') {
      console.log('Flask API is active');
      // You can perform additional actions here if needed
    }
  });

  pythonProcess1.stderr.on('data', (data) => {
    console.error(`Error from Flask API: ${data}`);
    // Handle error cases if required
  });

  pythonProcess1.on('close', (code) => {
    console.log(`Flask API process exited with code ${code}`);
    // Handle process close events
  });
}


// // Start the Python script when the server starts
// startPythonScript();


//flask server for machinelearning
startMachineLearning()

// //DBT Trigger 
// dbtTrigger()

// // Check if the Python script is running periodically
// setInterval(() => {
//     if (pythonProcess && pythonProcess.exitCode !== null) {
//         // If Python process has exited, restart it
//         startPythonScript();
//     }
// }, 5000); // Check every 5 seconds

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
