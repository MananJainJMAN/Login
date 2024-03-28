const express = require('express');
const router = express.Router();
const TrainingAssessmentor = require('../Controllers/TrainingAssessmenter');

// Create a New Training Module
router.post('/training-assessment', TrainingAssessmentor.createTrainingAssessment);

// Get All Training assessment
router.get('/training-assessment', TrainingAssessmentor.getAllTrainingAssessments);

// Update a Training Module
router.put('/training-assessment/:assessmentID', TrainingAssessmentor.updateTrainingAssessment);

// Delete a Training Module
router.delete('/training-assessment/:assessmentID', TrainingAssessmentor.deleteTrainingAssessment);

module.exports = router;
