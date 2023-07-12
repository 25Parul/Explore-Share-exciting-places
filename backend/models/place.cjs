const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    // establishing relationships between documents. Each place belongs to only one user.
    // By referencing the ObjectId of user document in the creator field of place document, Associates a place with the user who created it.
    creator: { type: mongoose.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
