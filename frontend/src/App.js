import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/navigation/navigation.component";
import NoteList from "./components/notelist/notelist.component";
import CreateNote from "./components/create-note/create-note.component";
import CreateUser from "./components/create-user/create-user.component";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Route exact path="/" component={NoteList} />
        <Route path="/edit:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
      </Router>
    </div>
  );
}

export default App;
