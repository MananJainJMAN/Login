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
        const moduleID = req.params.moduleID
        const updatedTrainingModule = await TrainingModule.findByIdAndUpdate(moduleID,req.body)
        if (!updatedTrainingModule) {
            return res.status(404).json({ message: 'Training module not found' });
        }
        res.status(200).json(updatedTrainingModule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getByIdTrainingModules = async (req, res) => {
    try {
        const moduleId = req.params.moduleID; // Extract the module ID from the request parameters
        const trainingModule = await TrainingModule.findById(moduleId); // Find the training module by its ID
        if (!trainingModule) {
            // If no module is found with the given ID, return a 404 Not Found response
            return res.status(404).json({ message: 'Training module not found' });
        }
        // If the module is found, return it in the response
        res.status(200).json(trainingModule);
    } catch (error) {
        // If an error occurs during the process, return a 400 Bad Request response with the error message
        res.status(400).json({ message: error.message });
    }
}
// Delete a Training Module
exports.deleteTrainingModule = async (req, res) => {
    try {
        const moduleID = req.params.moduleID
        const deletedTrainingModule =await TrainingModule.findByIdAndDelete(moduleID)
        if (!deletedTrainingModule) {
            return res.status(404).json({ message: 'Training module not found' });
        }
        res.status(200).json({ message: 'Training module deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
