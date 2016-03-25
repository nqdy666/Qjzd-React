import React from 'react';
import { findDOMNode } from 'react-dom'
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from '../TestUtils';
import Topics from '../../app/components/Topics';

describe('Topics Shallow Rendering', function() {
  const topics = TestUtils.shallowRender(Topics, {params: {}});
  it ('包含container类', function() {
    expect(topics.props.className).to.include('container');
  });
});

describe('Topics DOM Rendering', function() {
  const topics = ReactTestUtils.renderIntoDocument(<Topics params={{}}/>);
  const topicsDOM = findDOMNode(topics);

  it ('first a has active class', function() {
    const liItems = topicsDOM.querySelectorAll('.nav-tabs li');
    const aItem = liItems[0].querySelector('a');
    expect(aItem.classList.contains('active')).to.ok;
  });
});