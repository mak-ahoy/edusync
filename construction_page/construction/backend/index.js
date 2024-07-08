// Example backend using Node.js and Express

const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // For loading environment variables

const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI; // MongoDB connection string from environment variables
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
} 

app.use(express.json());

// API endpoint to store email

app.get('/hello', async (req, res) => {
  try{
    res.status(200).json({ message: 'Hello, World!' });

  }
  catch(error){
    console.log(error);
  }
}
)
app.post('/api/storeEmail', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Connect to MongoDB
    const db = client.db(process.env.DB_NAME);
    const emailsCollection = db.collection('emails');

    // Store email in MongoDB
    const result = await emailsCollection.insertOne({ email });
    console.log('Email stored with ID:', result.insertedId);

    res.status(200).json({ message: 'Email stored successfully' });
  } catch (error) {
    console.error('Error storing email:', error);
    res.status(500).json({ error: 'Failed to store email' });
  }
});

// Start server and connect to MongoDB
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
  await connectToMongoDB();
});
