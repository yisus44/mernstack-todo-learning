const userCtrl = {};

userCtrl.getUser = (req, res) => res.send("get");
userCtrl.createUser = (req, res) => res.send("post");
userCtrl.deleteUser = (req, res) => res.send("delete");

module.exports = userCtrl;
