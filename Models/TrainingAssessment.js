const TrainingModule = require('../Models/TrainingModule')
const mongoose = require('mongoose');
const trainingAssessmentSchema = new mongoose.Schema({
    assessmentID: { type: Number, required: true },
    moduleID: { type: Number, ref: TrainingModule, required: true },
    duration: { type: Number, default: 0 }, // Duration of the assessment in minutes or seconds
    attemptsAllowed: { type: Number, default: 1 }, // Number of attempts allowed for the assessment
    isActive: { type: Boolean, default: true }, // Indicates whether the assessment is active or inactive
    passPercentage: { type: Number, default: 70 } // Minimum percentage required to pass the assessment
});

module.exports = mongoose.model('TrainingAssessment', trainingAssessmentSchema);
