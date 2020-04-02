import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
class Admin extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    let loggedIn = true;
    if(token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn
    };
  }
  render() {
    if(!this.state.loggedIn) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        Admin Page
        <Link to="/logout">Logout</Link>
      </div>
    )
  }
}
export default Admin;