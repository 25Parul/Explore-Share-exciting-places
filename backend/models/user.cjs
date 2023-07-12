const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    // array indicates that each user can create multiple places.
    places: [{ type: mongoose.ObjectId, ref: "Place" }],
  },
  { timestamps: true }
);

// Create new user only. it's a validation step for email
userSchema.plugin(uniqueValidator);

const user = mongoose.model("User", userSchema);

module.exports = user;
