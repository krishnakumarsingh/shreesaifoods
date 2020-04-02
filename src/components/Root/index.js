import React from "react";
import "./index.scss";
import Nav from "../Nav";
import { Route, NavLink } from 'react-router-dom';
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    const match = this.props.match;
    return (
      <div className="container root">
        <div className="row1">
          <h2>Topics1</h2>
          <ul className="sub-menu nav nav-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to={`${match.url}/components`}>Components</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact activeClassName="active" to={`${match.url}/props-v-state`}>Props v. State</NavLink>
            </li>
          </ul>
          <Route path={`${match.path}/:id`} component={Topic} />
          <Route
            exact
            path={match.path}
            component={SelectTopic}
          />
        </div>
      </div>
    );
  }
}


function SelectTopic({ match }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Please select a topic.</h5>
      </div>
    </div>
  );
}

function Topic({ match }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Requested Param: {match.params.id}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default Root;