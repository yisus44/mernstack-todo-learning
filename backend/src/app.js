const express = require("express");
const app = express();
const cors = require("cors");
//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(express.json());
app.use(cors());
//routes
app.get("/", (req, res) => res.send("Welcome"));
app.get("/api/users", (req, res) => res.send("User notes"));
app.get("/api/notes", (req, res) => res.send("User routes"));

module.exports = app;
