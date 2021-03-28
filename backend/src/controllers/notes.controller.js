const notesCtrl = {};

const Note = require("../models/Note");

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

notesCtrl.createNote = async (req, res) => {
  const { title, description, date, author } = req.body;
  try {
    const newNote = await new Note({
      title,
      description,
      date,
      author,
    });
    await newNote.save();
  } catch (err) {
    console.log(err);
  }

  res.send({ message: "post : notes saved" });
};

notesCtrl.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ message: "note deleted" });
  } catch (err) {
    res.json({ error: "something went wrong" }).status(500);
  }
};
notesCtrl.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author } = req.body;
    await Note.findOneAndUpdate(id, {
      title,
      description,
      author,
    });
    res.json({ message: "note updated" });
  } catch (err) {
    console.log(err);
    res.json({ error: "note NOT updated" }).status(500);
  }
};

notesCtrl.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.json(note);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
module.exports = notesCtrl;
