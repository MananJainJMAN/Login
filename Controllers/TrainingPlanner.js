const TrainingPlan = require('../Models/TrainingPlan');

// Create a New Training Plan
exports.createTrainingPlan = async (req, res) => {
    try {
        const newTrainingPlan = await TrainingPlan.create(req.body);
        res.status(201).json(newTrainingPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Training Plans
exports.getAllTrainingPlans = async (req, res) => {
    try {
        const allTrainingPlans = await TrainingPlan.find();
        res.status(200).json(allTrainingPlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Training Plan
exports.updateTrainingPlan = async (req, res) => {
    try {

        const planID = req.params.planID
        const updatedTrainingPlan = await TrainingPlan.findByIdAndUpdate(planID,req.body)
        if (!updatedTrainingPlan) {
            return res.status(404).json({ message: 'Training plan not found' });
        }
        res.status(200).json(updatedTrainingPlan);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Training Plan
exports.deleteTrainingPlan = async (req, res) => {
    try {
        const deletedTrainingPlan = await TrainingPlan.findOneAndDelete(req.params.planID);
        if (!deletedTrainingPlan) {
            return res.status(404).json({ message: 'Training plan not found' });
        }
        res.status(200).json({ message: 'Training plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
