const mongoose = require('mongoose');

const trainingAssessmentSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true }, // Reference to the user
    moduleId: { type: String, ref: 'TrainingModule', required: true }, // Reference to the module
    score: { type: Number, required: true }, // Score achieved by the user for the module
    totalScore: {type:Number, required:true}
});

module.exports = mongoose.model('TrainingAssessment', trainingAssessmentSchema);
