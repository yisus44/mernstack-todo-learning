import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    title: "",
    description: "",
    userSelected: "",
    date: new Date(),
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:3000/api/users");
    //TODO: stablish a user selected
    this.setState({ users: res.data.users.map((user) => user.username) });
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a note</h4>

          {/* SELECT USER */}
          <div className="form-group">
            <select
              onChange={this.onInputChange}
              className="form-control"
              name="userSelected"
            >
              {this.state.users.map((user) => (
                <option value={user} key={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              required
              onChange={this.onInputChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              placeholder="description"
              required
              onChange={this.onInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btnn btn-primary">
              Save a note!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
