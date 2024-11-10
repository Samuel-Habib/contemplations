// controllers/ideaController.js
const ideaModel = require('../models/ideaModel');
const IdeaModel = require('../models/ideaModel');


exports.createIdea = async (req, res) => {
  try {
    const ideaObject = new ideaModel(req.body);
    await ideaObject.save();
    res.status(201).send({ message: "Document saved successfully", ideaObject });
  } catch (error) {
    console.error("Error saving document:", error);
    res.status(500).send({ message: "Error saving document", error });
  }
};

exports.getIdeas = async (req, res) => {
  try {
    const ideas = await ideaModel.find();
    res.status(200).send(ideas);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send({ message: "Error fetching documents", error });
  }
};

exports.deleteIdea = async (req, res) => {
  try {
    const ideaId = req.params.id;
    const deletedIdea = await ideaModel.findByIdAndDelete(ideaId);
    res.status(200).send({ message: "Idea deleted successfully", deletedIdea });
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send({ message: "Error deleting document", error });
  }
}