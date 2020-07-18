const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Require the Aylien npm package
var aylien = require("aylien_textapi");

// You could call it aylienapi, or anything else
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

//get
app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile("dist/index.html");
});

//post
app.post("/NLP", function (req, res) {
  textapi.sentiment({ url: req.body.url }, (error, response) => {
    if (error === null) res.send(response);
    else console.log(error);
  });
});

//port
app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
