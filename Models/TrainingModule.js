const User = require('../Models/userModel');
const mongoose = require('mongoose');
const trainingModuleSchema = new mongoose.Schema({
    moduleID: { type:Number, required: true },
    moduleName: { type: String, required: true },
    description: { type: String },
    content: { type: String }, // You might want to use a different type depending on your needs
    duration: { type: Number, default: 0 }, // Duration of the module in minutes or hours
    difficultyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }, // Difficulty level of the module
    prerequisites: [{ type: String }], // List of prerequisites for the module
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User },
    resourceLinks: [{ 
        title: { type: String, required: true },
        url: { type: String, required: true }
    }] // Array of resource links containing title and URL
});

module.exports = mongoose.model('TrainingModule', trainingModuleSchema);
