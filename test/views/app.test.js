import React from 'react';
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from '../TestUtils';
import App from '../../modules/views/App';

describe('App Shallow Rendering', function() {
  const app = TestUtils.shallowRender(App);

  it ('APP类型应该是div', function() {
    expect(app.type).to.equal('div');
  });
  it('APP第一个子元素应该是NavBar', function() {
    expect(app.props.children[0].type.name).to.equal('NavBar');
  });
  it('APP最后一个元素应该是Footer', function() {
    expect(app.props.children[app.props.children.length - 1]
      .type.name).equal('Footer');
  });
});

describe('App Element Component', function() {
  it ('is Element', function() {
    const isElement = ReactTestUtils.isElement(<App/>);
    expect(isElement).to.be.ok;
  });
  it ('isElementOfType', function() {
    const isElementOfType = ReactTestUtils.isElementOfType(<App/>, App);
    expect(isElementOfType).to.be.ok;
  });
  it ('isDOMComponent', function() {
    const app = ReactTestUtils.renderIntoDocument(<App/>);
    const divItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'div');
    const isDomComponent = ReactTestUtils.isDOMComponent(divItems[0]);
    expect(isDomComponent).to.be.ok;
  });
  it ('isCompositeComponent', function() {
    const app = new App();
    const isCompositeComponent = ReactTestUtils.isCompositeComponent(app);
    expect(isCompositeComponent).to.be.ok;
  });
});

describe('App Dom Rendering', function() {
  it ('has div', function() {
    const app = ReactTestUtils.renderIntoDocument(<App/>);
    const divItems = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'div');
    expect(divItems.length > 0).to.be.ok;
  });
});