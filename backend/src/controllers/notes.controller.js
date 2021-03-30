const notesCtrl = {};

const Note = require("../models/Note");

notesCtrl.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong fetching your data" }).status(500);
  }
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
    res.send({ message: "post : notes saved" });
  } catch (err) {
    console.log(err);
    res.send({ error: "Something went wrong with your request" }).status(500);
  }
};

notesCtrl.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.json({ message: "note deleted" });
  } catch (err) {
    console.log(err);
    res.json({ error: "something went wrong" }).status(500);
  }
};
notesCtrl.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, author, date } = req.body;
    console.log(req.body);
    await Note.findByIdAndUpdate(req.params.id, {
      title,
      description,
      author,
      id,
      date,
    });
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
    res.json({ error: "Something went wrong fetching your data" }).status(500);
  }
};
module.exports = notesCtrl;
