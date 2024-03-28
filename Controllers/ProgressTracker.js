const ProgressTracker = require('../Models/ProgressTracking')


// Create a New Training assessment
exports.createProgressTracker = async (req, res) => {
    try {
        const newProgressTracker = await ProgressTracker.create(req.body);
        res.status(201).json(newProgressTracker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Training assessments
exports.getAllProgressTrackers = async (req, res) => {
    try {
        const allProgressTrackers = await ProgressTracker.find();
        res.status(200).json(allProgressTrackers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Training assessment
exports.updateProgressTracker = async (req, res) => {
    try {
        // const updatedProgressTracker = await ProgressTracker.findOne(req.params.assessmentID, req.body, { new: true });
        const updatedProgressTracker = await ProgressTracker.findOneAndUpdate(
            { email: req.params.progressID }, // Query criteria to find the document to update
            req.body,       // Update fields
            { new: true }       // Options: Return the updated document
        );
        if (!updatedProgressTracker) {
            return res.status(404).json({ message: 'Training assessment not found' });
        }
        res.status(200).json(updatedProgressTracker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Training assessment
exports.deleteProgressTracker = async (req, res) => {
    try {
        const deletedProgressTracker = await ProgressTracker.findOneAndDelete(req.params.assessmentID);
        if (!deletedProgressTracker) {
            return res.status(404).json({ message: 'Training progress not found' });
        }
        res.status(200).json({ message: 'Training progress deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
