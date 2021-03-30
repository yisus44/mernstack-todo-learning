import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/navigation/navigation.component";
import NoteList from "./components/notelist/notelist.component";

const CreateUser = React.lazy(() =>
  import(
    "./components/create-user-container/create-user.container.component.jsx"
  )
);

const CreateNote = React.lazy(() =>
  import("./components/create-note/create-note.component")
);

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <div className="container p-4">
          <Route exact path="/" component={NoteList} />
          <Suspense
            fallback={<div>We didnt find what you are looking for...</div>}
          >
            <Route path="/edit/:id" component={CreateNote} />
            <Route path="/create" component={CreateNote} />
            <Route path="/user" component={CreateUser} />
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
