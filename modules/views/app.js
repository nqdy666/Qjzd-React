import React from 'react';
import NavBar from './navbar';
import Footer from './footer';

export default React.createClass({
    render() {
        return (
            <div>
                <NavBar />
                <br/>
                {this.props.children}
                <Footer />
            </div>
        )
    }
});