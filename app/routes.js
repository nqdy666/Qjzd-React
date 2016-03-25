import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Topics from './components/Topics';
import TopicDetail from './components/TopicDetail';
import UserDetail from './components/UserDetail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Topics} />
    <Route path="/topics/:tab" component={Topics} />
    <Route path="/topic/:topicId" component={TopicDetail} />
    <Route path="/user/:userName" component={UserDetail} />
  </Route>
);

