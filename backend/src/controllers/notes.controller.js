const notesCtrl = {};

notesCtrl.getNotes = (req, res) => res.json({ message: [] });
notesCtrl.createNote = (req, res) =>
  res.send({ message: "post : notes saved" });

notesCtrl.deleteNote = (req, res) => res.json({ message: "note deleted" });
notesCtrl.updateNote = (req, res) => res.json({ message: "note updated" });
notesCtrl.getNote = (req, res) => res.json({ title: "sexoooo" });
module.exports = notesCtrl;
