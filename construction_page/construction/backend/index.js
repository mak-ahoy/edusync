const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // For loading environment variables
const cors = require('cors');


const app = express();
app.use(cors({
  origin: 'https://edusync-psi.vercel.app' // Replace with your frontend domain
}));
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI; // MongoDB connection string from environment variables
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Middleware
app.use(express.json());

// API endpoint to say hello
app.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: 'Welcome!' });
  } catch (error) {
    console.log(error);
  }
});

// API endpoint to say hello
app.get('/hello', async (req, res) => {
  try {
    res.status(200).json({ message: 'Hello, World!' });
  } catch (error) {
    console.log(error);
  }
});

// API endpoint to store email
app.post('/api/storeEmail', async (req, res) => {
  try {
    const { email } = req.body;

    // Connect to MongoDB
    const db = client.db(process.env.DB_NAME);
    const emailsCollection = db.collection('waitlist_emails');

    // Store email in MongoDB
    const result = await emailsCollection.insertOne({ email });
    console.log('Email stored with ID:', result.insertedId);

    res.status(200).json({ message: 'Email stored successfully' });
  } catch (error) {
    console.error('Error storing email:', error);
    res.status(500).json({ error: 'Failed to store email' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect to MongoDB when the server starts
connectToMongoDB();


// // index.js

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// // Define your routes
// app.get('/', (req, res) => {
//   res.send('Hello from your Node.js backend!');
// });

// app.get('/api/data', (req, res) => {
//   const data = { message: 'This is your API data!' };
//   res.json(data);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
