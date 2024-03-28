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
        // const updatedTrainingPlan = await TrainingPlan.findOne(req.params.planID, req.body, { new: true });
        const updatedTrainingPlan = await TrainingPlan.findOneAndUpdate(
            { planID: req.params.planID }, // Query criteria to find the document to update
            req.body,       // Update fields
            { new: true }       // Options: Return the updated document
        );
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
