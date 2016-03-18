import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/App';
import Topics from './views/Topics';
import TopicDetail from './views/TopicDetail';
import UserDetail from './views/UserDetail';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Topics} />
    <Route path="/topics/:tab" component={Topics} />
    <Route path="/topic/:topicId" component={TopicDetail} />
    <Route path="/user/:userName" component={UserDetail} />
  </Route>
);

