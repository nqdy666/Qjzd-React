import React from 'react';
import { findDOMNode } from 'react-dom'
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from '../TestUtils';
import NavBar from '../../modules/views/NavBar';

describe('NavBar Shallow Rendering', function() {
  const navbar = TestUtils.shallowRender(NavBar);
  it ('包含navbar类', function() {
    expect(navbar.props.className).to.include('navbar');
  });
});

describe('NavBar DOM Rendering', function() {
  it ('has li', function() {
    const navbar = ReactTestUtils.renderIntoDocument(<NavBar/>);
    const navBarDOM = findDOMNode(navbar);
    const liItems = navBarDOM.querySelectorAll('li');
    expect(liItems.length > 0).to.be.ok;
  });
});