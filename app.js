// Import the MongoDB client
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

// MongoDB connection string
require('dotenv').config();
const uri = process.env.MONGO_URI;

// Create a MongoClient with options to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Express setup
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static('public'));


// Mongoose connection setup
mongoose.set('debug', true);
mongoose.connect(uri)
  .then(() => console.log('Mongoose connected to MongoDB'))
  .catch(err => console.log('Mongoose connection error:', err));

// Define a Mongoose schema and model
const schema = mongoose.Schema;
const thoughtSchema = new schema({
  thought: { type: String, required: false },
  date: { type: Date, required: false },
  idea: { type: String, required: false },
  category: { type: String, required: false }
});
const ThoughtModel = mongoose.model('ThoughtModel', thoughtSchema);

// Async function to handle MongoDB operations
async function run() {
  try {
    // Connect the client to the MongoDB cluster
    await client.connect();

    // Select the database and collection
    const database = client.db("contemplation"); // Correctly referencing the database here
    const collection = database.collection("thoughts"); // Define the collection object

    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Handle form submission and insert into the database
    app.post('/submit', async (req, res) => {
      try {
        const userInput = req.body;
        console.log("Received input:", userInput);

        // Create a new Mongoose document
        const thoughtObject = new ThoughtModel({
          thought: userInput.thought,
          type: 2 // Example type field
        });

        // Save using Mongoose
        await thoughtObject.save();
        console.log("Mongoose document saved:", thoughtObject);

        // Insert using MongoClient as a raw document
        const result = await collection.insertOne({
          thought: thoughtObject.thought,
          type: thoughtObject.type,
          mongooseId: thoughtObject._id // Reference the Mongoose document ID
        });
        console.log(`Document inserted into 'though1' collection with _id: ${result.insertedId}`);

        res.status(201).send({ message: "Document saved successfully", thoughtObject });
      } catch (error) {
        console.error("Error saving document:", error);
        res.status(500).send({ message: "Error saving document", error });
      }
    });

    // Endpoint to fetch all documents from the collection
// Endpoint to serve the HTML page instead of sending JSON
    app.get('/mythoughts', async (req, res) => {
      try {
        res.sendFile(__dirname + '/public/mythoughts.html');
      } catch (error) {
        console.error("Error loading HTML page:", error);
        res.status(500).send({ message: "Error loading page", error });
      }
    });

    // New API endpoint to fetch all thoughts as JSON data
    app.get('/api/mythoughts', async (req, res) => {
      try {
        const thoughts = await collection.find({}).toArray();
        // you need to get thoughts from the colleciton first 
        // putting it into array format makes it easier for the 
        // for each to work with them 
        res.status(200).send(thoughts);
        // it sends these thoughts to the fetch
      } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).send({ message: "Error fetching documents", error });
      }
    });

    app.get('/ideas', (req, res) => {
      res.status(200)
    });
  } finally {
    
  }
}

// Run the MongoDB connection setup and server start
run().catch(console.dir);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});