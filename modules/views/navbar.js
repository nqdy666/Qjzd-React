import React from 'react';
import { Link } from 'react-router';
import config from '../config';

class NavLink extends React.Component {
  render() {
    const nav = this.props.nav;
    return (
      <Link {...this.props} to={nav.to}>{nav.text}</Link>
    );
  }
}

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">QjzdClub-React</Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              { config.navJson.map((nav, index) => <li key={index}><NavLink nav={nav} /></li>) }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
