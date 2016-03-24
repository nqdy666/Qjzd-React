import React from 'react';
import { findDOMNode } from 'react-dom'
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from '../TestUtils';
import TopicDetail from '../../modules/views/TopicDetail';
import request from 'superagent';
import config from '../../modules/config';

describe('TopicDetail Shallow Rendering', function() {
  it ('加载中', function() {
    const topicDetail = TestUtils.shallowRender(TopicDetail, {params: {}});
    expect(topicDetail.props.children).to.contain('加载中');
  });
});

describe('TopicDetail DOM Rendering', function() {
  let topicDetail;
  let topicDetailDOM;
  let topicId;

  before(function(done) {
    request
      .get(`${config.apiUrl}/topics?page=1&limit=1`)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        topicId = res.body.data[0].id;
        topicDetail = ReactTestUtils.renderIntoDocument(
          <TopicDetail params={{topicId: topicId}}/>);
        topicDetailDOM = findDOMNode(topicDetail);
        done();
      });
  });

  it ('title is not empty', function(done) {
    setTimeout(function() {
      const title = topicDetailDOM.querySelector('h3');
      expect(title.innerHTML).to.be.ok;
      done();
    }, 1000);
  });
});