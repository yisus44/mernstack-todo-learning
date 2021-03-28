const { Router } = require("express");
const router = Router();

const {
  getUser,
  deleteUser,
  createUser,
} = require("../controllers/users.controller");

router.get("/", getUser);
router.post("/", createUser);

router.delete("/:id", deleteUser);
module.exports = router;
