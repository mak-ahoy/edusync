import express from 'express';
import  { MongoClient } from 'mongodb'
import dotenv from 'dotenv';
import cors from 'cors';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

dotenv.config();



const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI; // MongoDB connection string from environment variables
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// Middleware
app.use(cors({
  origin: ['https://edusync-psi.vercel.app' , 'http://localhost:3000'] // Replace with your frontend domain
}));
app.use(express.json());


const mailerSend = new MailerSend({
  apiKey: process.env.API_KEY,
});

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


// API endpoint to say welcome
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

    const email_check = emailRegex.test(email)

    if (!email_check){
      return res.status(400).json({
        message: "Please enter a valid email."
      })

    }
    const email_exists = await emailsCollection.findOne({email})



    if (email_exists){
      return res.status(400).json({
        message: "Email already registered!"
      })
    }

    // Store email in MongoDB
    const result = await emailsCollection.insertOne({ email });
    console.log('Email stored with ID:', result.insertedId);


    const sentFrom = new Sender("support@trial-ynrw7gy0932l2k8e.mlsender.net", "EduSync");

    const recipients = [
      new Recipient(email, "Customer")
    ];


    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Welcome to EduSync!")
      .setTemplateId('351ndgwnr7rgzqx8');

    mailerSend.email
    	.send(emailParams)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

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
