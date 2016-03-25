import React from 'react';
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from '../TestUtils';
import Footer from '../../app/components/Footer';

describe('Footer Shallow Rendering', function() {
  const footer = TestUtils.shallowRender(Footer);
  it ('包含footer类', function() {
    expect(footer.props.className).to.include('footer');
  });
});

describe('Footer DOM Rendering', function() {
  const footer = ReactTestUtils.renderIntoDocument(<Footer/>);
  it ('has Copyrights', function() {
    const divItems = ReactTestUtils.scryRenderedDOMComponentsWithClass(footer, 'footer');
    expect(divItems[0].innerHTML).to.include('Copyrights');
  });
});