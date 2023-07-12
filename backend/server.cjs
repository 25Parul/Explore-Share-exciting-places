const express = require("express");
const mongoose = require("mongoose");
const { check } = require("express-validator");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();

const Place = require("./models/place.cjs");
require("./config/database.cjs");

//Import places callback functions from controller folder
const {
  getPlaceById,
  getPlacesbyUserId,
  createPlace,
  deletePlace,
  updatePlace,
} = require("./controllers/places.cjs");

//Import users callback functions from controller folder
const { getUsers, signUp, login } = require("./controllers/users.cjs");

// Routes for finding Places: /api/places/
app.get("/api/places/:pid", getPlaceById);
app.get("/api/places/user/:uid", getPlacesbyUserId);
app.post(
  "/api/places/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);
app.patch(
  "/api/places/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);
app.delete("/api/places/:pid", deletePlace);

// Routes for finding user: /api/users/
app.get("/api/users/", getUsers);
app.post(
  "/api/users/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signUp
);
app.post("/api/users/login", login);

// Error handling middleware for unsupported routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(4010, () => {
  console.log("Listening on port 4010");
});

// PUT handles updates by replacing the entire entity, while PATCH only updates specified fields
