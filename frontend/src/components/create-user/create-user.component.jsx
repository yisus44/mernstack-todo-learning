import React, { Component } from "react";
import axios from "axios";
//TODO: use redux to manage state and refactor the form component to make it separated
import NewUserForm from "../new-user-form/new-user.component";
import UserList from "../user-list/user-list.component";
export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };
  //onSubmit
  //onChangeUserName
  async componentDidMount() {
    try {
      await this.getUsers();
      console.log(this.state.users);
    } catch (err) {
      console.log(err);
    }
  }

  async getUsers(isCalledFromChild = false) {
    const {
      data: { users },
    } = await axios.get("http://localhost:3000/api/users");
    if (isCalledFromChild) return;
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
        <NewUserForm getUsers={this.getUsers} />
        <UserList getUsers={this.getUsers} users={this.state.users} />
      </div>
    );
  }
}
