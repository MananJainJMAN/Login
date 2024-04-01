const User = require('../Models/userModel');
const mongoose = require('mongoose');
const trainingModuleSchema = new mongoose.Schema({
    moduleName: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, default: 0 }, // Duration of the module in minutes or hours
    difficultyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }, // Difficulty level of the module
    prerequisites: [{ type: String }], // List of prerequisites for the module
    resourceLinks: [{ 
        title: { type: String, required: true },
        url: { type: String, required: true }
    }] // Array of resource links containing title and URL
});

module.exports = mongoose.model('TrainingModule', trainingModuleSchema);
