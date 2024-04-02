const express = require('express');
const router = express.Router();
const TrainingAssessmentor = require('../Controllers/TrainingAssessmenter');

// Create a New Training Module
router.post('/training-assessment', TrainingAssessmentor.createTrainingAssessment);

// Get All Training assessment
router.get('/training-assessment', TrainingAssessmentor.getAllTrainingAssessments);


module.exports = router;
