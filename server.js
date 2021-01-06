// The Code propose 

/* This code is to turn in our server and oppining the port number 3000 */

// requiring the express, cors and body-parser
let cors = require('cors'); 
let express = require('express');
let bodyParser = require('body-parser');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes and starting up an instance of app
let app = express();

/* Middleware*/

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/* Seting up the server */

// Defining the port
const port = 3000;

// Run the port and send all the data to the server
app.get('/getAll', (request, response) => {
    response.send(projectData).status(200).end()
});

// Posting the data
app.post('/postData', function(req, res) {
    projectData = {
        temp:request.body.temp,
        date:request.body.date,
        content:request.body.content
    };
    response.send(projectData).status(404).end();
});

// Listen to the server and making sure that the port 3000 is opened
app.listen(port, () => {
    console.log(`Server Running On: http://localhost:${port}`);
});