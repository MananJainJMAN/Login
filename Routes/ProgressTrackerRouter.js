const express = require('express');
const router = express.Router();
const ProgressTracker = require('../Controllers/ProgressTracker')

// Create a New Training progress
router.post('/training-progress', ProgressTracker.createProgressTracker);

// Get All Training progresss
router.get('/training-progress', ProgressTracker.getAllProgressTrackers);

// Update a Training progress
router.put('/training-progress/:progressID', ProgressTracker.updateProgressTracker);

// Delete a Training progress
router.delete('/training-progress/:progressID', ProgressTracker.deleteProgressTracker);

module.exports = router;

