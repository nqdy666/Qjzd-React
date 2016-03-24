import React from 'react';
import { findDOMNode } from 'react-dom'
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from '../TestUtils';
import UserDetail from '../../modules/views/UserDetail';

describe('UserDetail Shallow Rendering', function() {
  const userDetail = TestUtils.shallowRender(UserDetail, {params: {}});
  it ('开发中', function() {
    expect(userDetail.props.children).to.contain('开发中');
  });
});
