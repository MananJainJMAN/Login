const TrainingModule = require('../Models/TrainingModule')
const mongoose = require('mongoose');
const trainingPlanSchema = new mongoose.Schema({
    planID: { type: Number, required: true },
    planName: { type: String, required: true },
    department: {
        type: String,
        enum: ['HR', 'IT', 'Finance', 'Marketing'], // Define enum for departments
        required: true
    },
    description: { type: String },
    moduleID: { type:Number, ref: TrainingModule ,required: true },
    schedule: {
        startDate: { type: Date, required: true }, // Start time of the training plan
        endDate: {
            type: Date,
            required: true,
        } // End time of the training plan
    },
});

module.exports = mongoose.model('TrainingPlan', trainingPlanSchema);
