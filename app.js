const express = require("express");
const bodyParser = require("body-parser");
const service = require("./app.service");

// Configure env variables
require("dotenv").config();
const PORT = process.env.PORT || 3001;


app = express();
app.use(bodyParser.json());


// API endpoints

app.post("/metric/:key", (req, res) => {
  const key = req.params.key,
        value = (req.body || {}).value;

  // validates that value is passed
  if (!value && value !== 0) {
    // no value passed, return error
    res.status(400).json({
      message: "Bad request, value is required"
    });
  }

  service.updateKey(key, value);
  res.status(200).json({});
})

app.get("/metric/:key/sum", (req, res) => {
  const key = req.params.key;

  const value = service.getSumForKey(key);
  res.status(200).json({
    value: value
  });
});


app.listen(PORT, () => {
  console.log("App is listening at:", PORT);
});
