import express from 'express';
import  { MongoClient } from 'mongodb'
import dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer'
dotenv.config();

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to EduSync</title>
    <style>
        body {
            font-family: Helvetica;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border: 1px solid #ddd;
        }
        .header {
            text-align: center;
            color: #fff;
            padding: 40px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            font-family: Georgia, 'Times New Roman', Times, serif;
            background: #7F00FF;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #E100FF, #7F00FF);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #E100FF, #7F00FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px;
            margin-top: 10px;
            font-family:  Helvetica, sans-serif;
            color: #4b4949;

        }
        .content p {
            margin: 0 0 10px;
            
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            font-size: 0.9em;
            color: #777;
            border-top: 1px solid #ddd;
        }
        .signature {
            margin-top: 20px;
        }
        .signature p {
            margin: 0px;
        }
        .signature p:last-child {
            margin-top: 5px;
        }
        .punch {
        
        font-weight: 600;
        padding-bottom: 10px;
            
    }
        .text {
          font-size: small;
        }
    </style>

    <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>

</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to the EduSync Community!</h1>
        </div>
        <div class="content">
            <p class= "punch">Dear Community Member,</p>
            <div class="text">
              <p>Thanks for joining our waitlist! We are so excited to have you on board with us as we integrate more valuable and effective features into the EduSync platform.</p>
              <p>I am Ali Haris, founder of EduSync. We appreciate every single piece of interest shown and value the continuous support at this stage. We are more than happy to journey through this with you.</p>
              <br>
              <p><span style="font-weight: 600;">About EduSync:</span><br><br>
                EduSync is designed to revolutionize the way educators manage their classrooms and resources. Our platform consolidates essential tools into one streamlined interface, making it easier for teachers to focus on what they do best—teaching. From lesson planning and student progress tracking to classroom management and communication, EduSync aims to enhance productivity and improve educational outcomes.</p>
              <p>Please do not hesitate to contact us if you have any questions or if there is something you would like to discuss regarding our tools or your experience so far. We value your feedback greatly.</p>
            <div>
            <p>Thanks again for joining me on this journey. I will keep you updated and provide early access as we roll out new features.</p>
            
            <div class="signature">
                <p>Warm regards,</p>
                <p>Ali Haris</p>
                <p>Founder, EduSync</p>
            </div>
        </div>
        <div class="footer">
            <p>You received this email because you signed up on our website or made a purchase from us.</p>
            <div>
                <a style="text-decoration: underline;">Unsubscribe</a>
            </div>
        </div>
    </div>
</body>
</html>
`

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


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.PASS_KEY,
  },
});


// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(email) {

  console.log("In send email ")

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"EduSync 👻" <mail.edusync@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Welcome 👋", // Subject line
    text: "Hello world?", // plain text body
    html: template, // html body
  });
  console.log("In send email post transporter")
  
  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}




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
app.post('/storeEmail', async (req, res) => {
  try {
    const { email } = req.body;

    console.log(email+" this is email posted")

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


    sendEmail(email).catch(console.error);

    console.log("After send email ")


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
