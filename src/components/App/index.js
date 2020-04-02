import React, { Component } from 'react';

/* import PostForm from '../PostForm'; */
import { Provider } from 'react-redux';
import "./index.scss";
import Popper from 'popper.js';
//window.Popper = Popper;
//import "bootstrap";
import dataJson from '../../actions/data.json'
import Nav from "../Nav";
import { BrowserRouter as Router, Switch, Route, NavLink, Link, browserHistory } from 'react-router-dom';

import SubPages from '../pages/SubPages';
import PrivacyPolicyTemplate from '../pages/PrivacyPolicyTemplate';
import { Login, Logout, Admin } from '../Login';
import Root from '../root';
import '../../script.js';
class App extends Component {
  constructor(props) {
    super(props);
    const {
      pageConfig,
      navBarList,
      homeContent,
      aboutContent,
      headerContent,
      competitiveIntelligence,
      getBuyingCenterInsight,
      managedMarketingDatabase,
      digitalMarketing,
      databaseManagement,
      websiteDevelopment,
    } = dataJson;
    this.state = {
      pageConfig: pageConfig,
      navBarList: navBarList,
      homeContent: homeContent,
      aboutContent: aboutContent,
      headerContent: headerContent,
      competitiveIntelligence: competitiveIntelligence,
      getBuyingCenterInsight: getBuyingCenterInsight,
      managedMarketingDatabase: managedMarketingDatabase,
      digitalMarketing: digitalMarketing,
      databaseManagement: databaseManagement,
      websiteDevelopment: websiteDevelopment,
    };
    this.requireAuth = this.requireAuth.bind(this);
  }
  requireAuth() {
    alert('Admin');
  }
  componentDidMount() {
    $('#spin').hide();
  }
  componentWillMount() {
    document.title = this.state.pageConfig.title
  }
  render() {
    const {
      pageConfig,
      navBarList,
      homeContent,
      aboutContent,
      headerContent,
      competitiveIntelligence,
      getBuyingCenterInsight,
      managedMarketingDatabase,
      digitalMarketing,
      databaseManagement,
      websiteDevelopment
    } = this.state;
    return (
      <div className={`App`} id={`${pageConfig.websiteAppClass}`}>
        <Router /* history={browserHistory} */>
          <Nav navBarList={navBarList} navClassName="navbar-dropdown navbar-fixed-top" />
          <Route
            exact
            path="/"
            //component={Home}
            render={(routeProps) => (
              <SubPages
                subPages={homeContent.header}
                headerContent={headerContent}
              />
            )} />
          <Route
            path="/about"
            //component={About}
            render={(routeProps) => (
              <SubPages
                subPages={aboutContent.sectionData}
              />
            )}
          />
          <Route
            path="/getBuyingCenterInsight"
            //component={GetBuyingCenterInsight}
            render={(routeProps) => (
              <SubPages
                subPages={getBuyingCenterInsight}
              />
            )}
          />
          <Route
            path="/managedMarketingDatabase"
            //component={ManagedMarketingDatabase}
            render={(routeProps) => (
              <SubPages
                subPages={managedMarketingDatabase}
              />
            )}
          />
          <Route
            path="/competitiveIntelligence"
            //component={CompetitiveIntelligence}
            render={(routeProps) => (
              <SubPages
                subPages={competitiveIntelligence}
              />
            )}
          />
          <Route
            path="/digitalMarketing"
            //component={DigitalMarketing}
            render={(routeProps) => (
              <SubPages
                subPages={digitalMarketing}
              />
            )}
          />
          <Route
            path="/databaseManagement"
            //component={DatabaseManagement}
            render={(routeProps) => (
              <SubPages
                subPages={databaseManagement}
              />
            )}
          />
          <Route
            path="/websiteDevelopment"
            //component={WebsiteDevelopment}
            render={(routeProps) => (
              <SubPages
                subPages={websiteDevelopment}
              />
            )}
          />
          <Route
            path="/services"
            //component={Services}
            render={(routeProps) => (
              <SubPages
                subPages={"services"}
              />
            )}
          />
          <Route
            path="/topics"
            component={Root}
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/admin"
            component={Admin} onEnter={this.requireAuth}
          />
          <Route
            path="/logout"
            component={Logout}
          />
          <Route
            path="/privacyPolicyTemplate" component={PrivacyPolicyTemplate} />
        </Router>
        {/* <ContactUs /> */}
      </div>
    );
  }
}

export default App;