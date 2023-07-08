const express = require("express");
const app= express();
const bodyParser= require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/api/places", (req, res, next) => {
    console.log("Get Request in Places");
    res.json({message: "It works"});
})


app.listen(4010, () => {
    console.log("Listening on port 4010");
  });