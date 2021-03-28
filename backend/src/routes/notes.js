const { Router } = require("express");
const router = Router();

const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  getNote,
} = require("../controllers/notes.controller");

router.get("/", getNotes);
router.post("/", createNote);

router.delete("/:id", deleteNote);
router.put("/:id", updateNote);
router.get("/:id", getNote);

module.exports = router;
