import React from "react";
import axios from "axios";

//needs the users
//needs to make delete posts

class UserList extends React.Component {
  deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      this.props.getUsers(true);
      this.forceUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="col-md-8">
        <ul className="list-group">
          {this.props.users.map((user) => (
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
    );
  }
}

export default UserList;
