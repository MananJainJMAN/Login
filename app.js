const { spawn } = require('child_process');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const authRouter = require('./Routes/authRouter');
const TrainPlanRouter = require('./Routes/TrainPlanRouter');
const TrainModuleRouter = require('./Routes/TrainModuleRouter');
const TrainingAssessmentRouter = require('./Routes/TrainingAssesRouter');
const ProgressTrackerRouter = require('./Routes/ProgressTrackerRouter');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();
connectToDB();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cors());
app.use(express.static('./public'));
app.use(sanitize());
app.use(xss());
app.use(hpp({ whitelist: ['id', 'token'] }));

app.use('/user', authRouter);
app.use('/admin', TrainPlanRouter, TrainModuleRouter, TrainingAssessmentRouter, ProgressTrackerRouter);

let pythonProcess = null;

// Function to start the Python script
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

// Start the Python script when the server starts
// startPythonScript();

// Check if the Python script is running periodically
setInterval(() => {
    if (pythonProcess && pythonProcess.exitCode !== null) {
        // If Python process has exited, restart it
        startPythonScript();
    }
}, 5000); // Check every 5 seconds

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
