import React, { Component } from "react";
import axios from "axios";
//TODO: use redux to manage state and refactor the form component to make it separated
export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };

  async componentDidMount() {
    try {
      await this.getUsers();
      console.log(this.state.users);
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers() {
    const {
      data: { users },
    } = await axios.get("http://localhost:3000/api/users");
    this.setState({ users: users });
  }

  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    //TODO: handle error of user duplicated
    try {
      await axios.post("http://localhost:3000/api/users", {
        username: this.state.username,
      });
      this.getUsers();
      this.setState({ username: "" });
    } catch (err) {
      console.log(err);
    }
  };

  deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      this.getUsers();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create new user</h3>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="form-control"
                onChange={this.onChangeUserName}
                value={this.state.username}
              />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                key={user._id}
                className="list-group-item list-group-item-action"
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
