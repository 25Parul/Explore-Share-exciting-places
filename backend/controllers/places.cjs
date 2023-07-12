const { validationResult } = require("express-validator");
const getCoordsForAdrress = require("../util/location");
const Place = require("../models/place.cjs");
const User = require("../models/user.cjs");
const mongoose = require("mongoose");

const getPlaceById = async (req, res) => {
  const placeId = req.params.pid;
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      res
        .status(404)
        .json({ message: "Could not find a place for the provided id." });
    } else {
      res.json({ place: place.toObject({getters:true}) });
    }
  } catch (error) {
    return res
      .status(500)
      .send("Something went wrong, could not find the place");
  }
};

const getPlacesbyUserId = async (req, res) => {
  const userId = req.params.uid;
  try {
    // populates all the corrosponding places that user has
    const userWithPlaces = await User.findById(userId).populate("places");
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return res
        .status(404)
        .json({ message: "Could not find places for the provided user id." });
    } else {
      res.json({ places: userWithPlaces.places.map(p => p.toObject({ getters: true })) });
    }
  } catch (err) {
    return res.status(500).send("Failed to get places, please try again");
  }
};

const createPlace = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check your data" });
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAdrress(address);
  } catch (error) {
    return res.status(500).send("Error getting location");
  }

  const createdPlace = new Place({
    title,
    description,
    image: "https://media.timeout.com/images/101705309/1920/1080/image.jpg",
    location: coordinates,
    address,
    creator,
  });

  let user;
  try {
    // check if the creator id exist in User collection or not
    user = await User.findById(creator);
    if (!user) {
      return res.status(404).send("Could not find user for provided id");
    }
  } catch (err) {
    return res
      .status(500)
      .send("Creating place failed, please try again later");
  }
  //groups database operations. Here I am creating a new place and associating it with a user by adding this place in places array of user.
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    await session.commitTransaction();
    return res.status(201).json({ place: createdPlace });
  } catch (error) {
    console.error("Failed to save place:", error);
    return res
      .status(500)
      .send("Failed to create new place,  please try again");
  }
};

const updatePlace = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid inputs, please check your data" });
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  try {
    let place = await Place.findById(placeId);
    place.title = title;
    place.description = description;
    await place.save();
    return res.status(200).json({ place });
  } catch (err) {
    return res.status(500).send("Something went wrong, could not update place");
  }
};


const deletePlace = async (req, res) => {
  const placeId = req.params.pid;

  try {
    const place = await Place.findById(placeId);
    const uid = place.creator;

    await Place.findByIdAndDelete(placeId);

    const user = await User.findById(uid);
    user.places = user.places.filter(
      (place) => place.toString() !== placeId.toString()
    );
    await user.save();

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete place", error });
  }
};

module.exports = {
  getPlaceById,
  getPlacesbyUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
