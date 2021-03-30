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
    editing: false,
    id: "",
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { title, description, date } = this.state;
    const newNote = {
      title,
      description,
      date,
      author: this.state.userSelected,
    };
    alert(new Date(date));
    if (this.state.editing) {
      console.log("http://localhost:3000/api/notes/" + this.state._id);
      await axios.put(
        "http://localhost:3000/api/notes/" + this.state._id,
        newNote
      );
    } else {
      try {
        await axios.post("http://localhost:3000/api/notes/", newNote);
      } catch (err) {
        alert("Something went wrong with your request");
      }
    }
    window.location.href = "/";
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:3000/api/users");
    this.setState({
      users: res.data.users.map((user) => user.username),
      userSelected: res.data.users[0].username,
    });

    if (this.props.match.params.id) {
      console.log(this.props.match.params.id);
      const { data } = await axios.get(
        "http://localhost:3000/api/notes/" + this.props.match.params.id
      );

      const { title, description, date, author } = data;
      this.setState({
        title,
        description,
        date: new Date(date),
        userSelected: author,
        editing: true,
        _id: this.props.match.params.id,
      });
    }
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
              value={this.state.userSelected}
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
              value={this.state.title}
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              placeholder="description"
              required
              value={this.state.description}
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
            <button type="submit" className="btn btn-primary">
              Save a note!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
