const User = require("../models/User");

const userCtrl = {};

userCtrl.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json({ user: user });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

userCtrl.createUser = async (req, res) => {};
userCtrl.deleteUser = async (req, res) => {};
module.exports = userCtrl;
