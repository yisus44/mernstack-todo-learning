import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";

import { Link } from "react-router-dom";

export default class NoteList extends Component {
  state = {
    notes: [],
  };

  async componentDidMount() {
    try {
      await this.getNotes();
    } catch (err) {}
  }

  async getNotes() {
    const { data } = await axios.get("http://localhost:3000/api/notes");
    this.setState({
      notes: data,
    });
  }

  async onDeleteNote(id) {
    try {
      await axios.delete("http://localhost:3000/api/notes/" + id);
      this.getNotes();
    } catch (err) {}
  }
  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.title}</h5>
                <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                  Edit
                </Link>
              </div>

              <div className="card-body">
                <p>{note.description}</p>
                <p>{note.author}</p>
                <p>{format(note.date)}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.onDeleteNote(note._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
