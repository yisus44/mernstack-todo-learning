const User = require("../models/User");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    console.log(err);
    res
      .json({ error: "Something went wrong fetching the users.." })
      .status(500);
  }
};

userCtrl.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await new User({ username });
    await newUser.save();
    res.json({ message: "User created" });
  } catch (err) {
    console.log(err);
    res.json({ error: err }).status(500);
  }
};
userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "user deleted" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong" }).status(500);
  }
};
module.exports = userCtrl;
