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
