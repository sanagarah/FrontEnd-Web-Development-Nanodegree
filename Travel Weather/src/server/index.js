// Setup empty JS object to act as endpoint for all routes
let projectData = {};

var path = require("path");
// Require Express to run server and routes
const express = require("express");
// Cors for cross origin allowance
const cors = require("cors");
/* Dependencies */
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
// Cors for cross origin allowance
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

//Get route
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// Post Route
app.post("/travel", addInfo);
function addInfo(req, res) {
  projectData["city"] = req.body.city;
  projectData["date"] = req.body.date;
  projectData["weather"] = req.body.weather;
  projectData["lat"] = req.body.lat;

  res.send(projectData);
}
