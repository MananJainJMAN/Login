const express = require('express');
const router = express.Router();
const trainingPlanController = require('../Controllers/TrainingPlanner')

// Create a New Training Plan
router.post('/training-plans', trainingPlanController.createTrainingPlan);

// Get All Training Plans
router.get('/training-plans', trainingPlanController.getAllTrainingPlans);

// Update a Training Plan
router.put('/training-plans/:planID', trainingPlanController.updateTrainingPlan);

// Delete a Training Plan
router.delete('/training-plans/:planID', trainingPlanController.deleteTrainingPlan);

module.exports = router;



