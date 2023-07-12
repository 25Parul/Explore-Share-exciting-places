const { validationResult } = require("express-validator");
const User = require("../models/user.cjs");

const getUsers = async (req, res) => {
  let allUsers;
  try {
    // the password field should be excluded (-) from the returned documents
    allUsers = await User.find({}, "-password");
    res
      .status(200)
      .json({
        users: allUsers.map((user) => user.toObject({ getters: true })),
      });
  } catch (err) {
    return res
      .status(500)
      .send("fetching users failed, please try again later");
  }
};

const signUp = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(422).json({ message: "Invalid inputs, please check your data" });
  }
  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).send("User already exist, please login instead");
    } else {
      const createdUser = new User({
        name,
        email,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEn7BdXxLJy8esUixApTZqQMGJifPqgKTsAwJUEkiEYCMy8uMrLpRadP5bYSB-kfTxRfQ&usqp=CAU",
        password,
        places: [],
      });
      await createdUser.save();
      res.status(201).json({ user: createdUser });
    }
  } catch (err) {
    return res.status(500).send("Signing up failed, please try again later");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser || existingUser.password !== password) {
      return res
        .status(401)
        .json({ message: "Invalid credentials. Could not log you in" });
    } else {
      let existingUser = await User.findOne({ email });
      return res.json({ message: "Logged in!", user: existingUser });
    }
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }
};

module.exports = {
  getUsers,
  signUp,
  login,
};
