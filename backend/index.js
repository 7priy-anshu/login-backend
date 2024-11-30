

// Import the required libraries
const express = require('express'); // Express framework for handling HTTP requests
const app = express(); // Initialize the Express app
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction

// Connect to MongoDB (database name is 'login')
mongoose.connect('mongodb://127.0.0.1:27017/login')
    .then(() => console.log('Connected! Database')); // Confirm database connection

// Middleware to parse JSON data from requests
app.use(express.json()); 

// Define a Mongoose schema (blueprint) for a user object
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,        // User's name
    username: String,    // Username
    password: String,    // Password
    mobile: String,      // Mobile number
    createdOn: Date,     // Date of account creation
    updatedOn: Date      // Date of last account update
});

// Create a model 'Users' using the user schema, corresponding to 'users' collection in MongoDB
const Users = mongoose.model('users', userSchema);

// Route to handle GET requests at the root URL ('/')
app.get('/', function(req, res) {
    res.send('Hello world'); // Respond with 'Hello world'
    // 'db;' is unnecessary here; it does nothing
});

// Route to handle user registration (POST request)
app.post('/register', async (req, res) => {
    const data = req.body; // Get data from the request body
    console.log(data); // Log the incoming data for reference
    const userData = new Users(data); // Create a new user using the received data
    await userData.save(); // Save the new user to the database
    res.send("Data inserted successfully"); // Send a response confirming the user was added
});

// Route to handle user login (POST request)
app.post('/login', async (req, res) => {
    const data = req.body; // Get login details (username and password) from request body
    let user = await Users.findOne(data); // Find the user in the database with matching details
    console.log(user); // Log the found user
    if (user == null) {
        res.send("Username and password do not match"); // If no user is found, send an error message
    } else {
        res.send("Login successful"); // If user is found, confirm login
    }
});

// Start the server on port 4000
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
