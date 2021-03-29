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
    console.log(req.params.id);
    console.log(id);
    const { title, description, author } = req.body;
    const resp = await Note.findByIdAndUpdate(req.params.id, {
      title,
      description,
      author,
      id,
    });
    console.log(resp);
    res.status(200).json({ message: "updated" });
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
