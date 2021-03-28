const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(express.json());
app.use(cors());
//routes
app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

//////////////////////
module.exports = app;
