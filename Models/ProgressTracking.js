const User = require('../Models/userModel');
const mongoose = require('mongoose');
const progressTrackingSchema = new mongoose.Schema({
    UserID: { type:String, ref:User, required: true },
    moduleID: { type: Number, ref: 'TrainingModule', required: true },
    completionStatus: { type: String, enum: ['Completed', 'In Progress'], required: true },
    lastAccessedDate: { type: Date, required: true },
});

module.exports = mongoose.model('ProgressTracking', progressTrackingSchema);