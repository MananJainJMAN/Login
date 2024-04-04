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

// Get All Training assessments for a specific user
exports.getAllTrainingAssessments = async (req, res) => {
    const userId = req.params.userId; // Get user ID from request parameters
    try {
        // Find all training assessments for the specific user ID
        const userTrainingAssessments = await TrainingAssessment.find({ userId: userId });

        // Check if user assessments exist
        if (!userTrainingAssessments || userTrainingAssessments.length === 0) {
            return res.status(404).json({ message: 'User assessments not found' });
        }

        // Return the user assessments
        res.status(200).json(userTrainingAssessments);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};


//Deleting All Training assessments

exports.DeleteAllTrainingAssessments = async (req,res)=>
{
    try{
        const allTrainingAssessments = await TrainingAssessment.deleteMany({});
        res.status(200).json(allTrainingAssessments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}
