const TrainingAssessment = require('../Models/TrainingAssessment')


// Create a New Training assessment
exports.createTrainingAssessment = async (req, res) => {
    try {
        const newTrainingAssessment = await TrainingAssessment.create(req.body);
        res.status(201).json(newTrainingAssessment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Training assessments
exports.getAllTrainingAssessments = async (req, res) => {
    try {
        const allTrainingAssessments = await TrainingAssessment.find();
        res.status(200).json(allTrainingAssessments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Training assessment
exports.updateTrainingAssessment = async (req, res) => {
    try {
        // const updatedTrainingAssessment = await TrainingAssessment.findOne(req.params.assessmentID, req.body, { new: true });
        const updatedTrainingAssessment = await TrainingAssessment.findOneAndUpdate(
            { assessmentID: req.params.assessmentID }, // Query criteria to find the document to update
            req.body,       // Update fields
            { new: true }       // Options: Return the updated document
        );
        if (!updatedTrainingAssessment) {
            return res.status(404).json({ message: 'Training assessment not found' });
        }
        res.status(200).json(updatedTrainingAssessment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Training assessment
exports.deleteTrainingAssessment = async (req, res) => {
    try {
        const deletedTrainingAssessment = await TrainingAssessment.findOneAndDelete(req.params.assessmentID);
        if (!deletedTrainingAssessment) {
            return res.status(404).json({ message: 'Training assessment not found' });
        }
        res.status(200).json({ message: 'Training assessment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
