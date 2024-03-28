const TrainingModule = require('../Models/TrainingModule');

// Create a New Training Module
exports.createTrainingModule = async (req, res) => {
    try {
        const newTrainingModule = await TrainingModule.create(req.body);
        res.status(201).json(newTrainingModule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Training Modules
exports.getAllTrainingModules = async (req, res) => {
    try {
        const allTrainingModules = await TrainingModule.find();
        res.status(200).json(allTrainingModules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Training Module
exports.updateTrainingModule = async (req, res) => {
    try {
        const updatedTrainingModule = await TrainingModule.findOneAndUpdate(
            { moduleID: req.params.moduleID }, // Query criteria to find the document to update
            req.body,       // Update fields
            { new: true }      
        );
        if (!updatedTrainingModule) {
            return res.status(404).json({ message: 'Training module not found' });
        }
        res.status(200).json(updatedTrainingModule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Training Module
exports.deleteTrainingModule = async (req, res) => {
    try {
        const deletedTrainingModule =await TrainingModule.findOneAndDelete(
            { moduleID: req.params.moduleID }, // Query criteria to find the document to update
            req.body,       // Update fields
            { new: true }      );
        if (!deletedTrainingModule) {
            return res.status(404).json({ message: 'Training module not found' });
        }
        res.status(200).json({ message: 'Training module deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
