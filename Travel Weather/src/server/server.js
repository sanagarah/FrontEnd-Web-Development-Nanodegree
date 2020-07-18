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

app.get("/test", function (req, res) {
  res.status(200).json({ done: "done" });
});

module.exports = app;
