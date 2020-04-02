import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginCheck } from '../../actions/postActions';
import './index.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    let loggedIn = true;
    if(token == null) {
      loggedIn = false;
    }
    this.state = {
      password: '',
      email: '',
      loggedIn,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onBlur(e) {
    if(e.target.value) {
      $(e.target).addClass('active');
    } else {
      $(e.target).removeClass('active');
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const { password, email, loggedIn } = this.state;
    const post = {
      password,
      email,
      loggedIn
    };
    if(post.email === 'admin' && post.password == 'admin') {
      localStorage.setItem('token', 'yes');
      post.loggedIn = true;
      this.setState({
        loggedIn: true
      });
    }
    this.props.loginCheck(post);
    /* this.setState({
      password: '',
      email: '',
    }); */
    //$('.form-control').removeClass('active');
  }
  render() {
    if(this.state.loggedIn) {
      return <Redirect to="/admin" />
    }
    return (
      <div className="container blogs">
        <h1>Blog Headline</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-md-12 mb-md-0 mb-12">
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.email}
                  id="email"
                />
                <label htmlFor="email">Email:</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  value={this.state.password}
                  id="password"
                />
                <label htmlFor="password">Password:</label>
              </div>
            </div>
          </div>
          <div className="text-center text-md-left">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
          <div className="status"></div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginCheck: PropTypes.func.isRequired
};
export default connect(null, { loginCheck })(Login);