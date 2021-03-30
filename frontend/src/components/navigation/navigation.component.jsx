import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Notes app
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <Link className="nav-link" to="/">
                  View notes
                </Link>
                <Link className="nav-link" to="/create">
                  Create note
                </Link>
                <Link className="nav-link" to="/user">
                  Create user
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
