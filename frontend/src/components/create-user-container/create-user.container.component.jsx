import React, { Component } from "react";
import axios from "axios";

import NewUserForm from "../new-user-form/new-user.component";
import UserList from "../user-list/user-list.component";
export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    //passing this function to the child
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: [],
      username: "",
    };
  }
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
      alert("Invalid information");
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
        <NewUserForm getUsers={this.getUsers} />
        <UserList getUsers={this.getUsers} users={this.state.users} />
      </div>
    );
  }
}
