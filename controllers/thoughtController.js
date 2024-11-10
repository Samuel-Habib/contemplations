const ThoughtModel = require('../models/ThoughtModel');

exports.createThought = async (req, res) => {
    try {
      console.log("Request body:", req.body);
      const thoughtObject = new ThoughtModel(req.body);
      await thoughtObject.save().then(console.log("Mongoose document saved:", thoughtObject));

      const allThoughts = await ThoughtModel.find();
      console.log("All thoughts from database:", allThoughts);

      res.status(201).send({ message: "Document saved successfully", thoughtObject });
    } catch (error) {
      console.error("Error saving document:", error);
      res.status(500).send({ message: "Error saving document", error });
    }
  };
  
exports.getThoughts = async (req, res) => {
  try {
    const thoughts = await ThoughtModel.find();
    res.status(200).send(thoughts);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send({ message: "Error fetching documents", error });
  }
};

exports.deleteThought = async (req, res) => {
  try{
    const thought = req.params.id
    console.log("this is that thought -----------> ", thought);
    const removedThought = await ThoughtModel.findByIdAndDelete(thought);
    console.log(`this is that thought -----------> ${removedThought}`);
    res.status(200).send({message: "Thought deleted successfully", removedThought})
  } catch(error) {
    console.log(error)
    res.status(500).send({message: "Error fetching documents", error})
  }
}

