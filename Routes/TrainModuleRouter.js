const express = require('express');
const router = express.Router();
const trainingModuleController = require('../Controllers/TraninigModular');

// Create a New Training Module
router.post('/training-modules', trainingModuleController.createTrainingModule);

// Get All Training Modules
router.get('/training-modules', trainingModuleController.getAllTrainingModules);

// Update a Training Module
router.put('/training-modules/:moduleID', trainingModuleController.updateTrainingModule);

// Delete a Training Module
router.delete('/training-modules/:moduleID', trainingModuleController.deleteTrainingModule);

module.exports = router;
