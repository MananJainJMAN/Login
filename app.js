const express = require('express')
const connectToDB = require('./config/db')
const authRouter = require('./Routes/authRouter')



const app = express()
connectToDB()
// Middleware to parse JSON request body
app.use(express.json());



app.use('/user',authRouter)


// Start the server after successfully connecting to the database
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
