import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <br />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
