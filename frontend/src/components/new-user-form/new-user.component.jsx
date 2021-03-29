import React from "react";
import axios from "axios";

//needs to make a post request
//needs to update the overall state

class NewUserForm extends React.Component {
  state = {
    users: [],
    username: "",
  };

  onSubmit = async (e) => {
    e.preventDefault();
    //TODO: handle error of user duplicated
    try {
      await axios.post("http://localhost:3000/api/users", {
        username: this.state.username,
      });
      this.props.getUsers(true);
      this.setState({ username: "" });
      this.forceUpdate();
    } catch (err) {
      console.log(err);
    }
  };
  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  render() {
    return (
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
    );
  }
}

export default NewUserForm;
