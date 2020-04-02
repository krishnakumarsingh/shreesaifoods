import React, { Component } from 'react';
import './index.scss';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    $('.nav-dropdown-bottom').append($('.navbar-nav').html());
    $('.nav-dropdown-bottom').hide();
    this.setState({isLoading: false});
  }
  render() {
    return (
      <footer className="base-small-footer base-section base-section-nopadding" id="footer1-2p">
        <ul className="nav-dropdown-bottom">
          <li className="nav-item home-list">
            <NavLink
              exact
              to={"/"}
              className="link"
              id="formatics"
            >
              <i className="fa fa-home fa-lg"></i>
            </NavLink>
          </li>
          <li className="nav-item home-list">
            <NavLink
              exact
              to={"/about"}
              className="link"
              id="formatics"
            >
              About us
            </NavLink>
          </li>
        </ul>
        <div className="container">
          <p className="text-xs-center text-white mb-0">Copyright (c) 2019 2Formatics | 
            <NavLink
              exact
              to={"/privacyPolicyTemplate"}
              className="text-white"
            >
              &nbsp;Privacy Policy
            </NavLink>
          </p>
        </div>
      </footer>
    )
  }
}
export default Footer;