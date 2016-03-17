import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './views/app';
import Topics from './views/topics';
import TopicDetail from './views/topic-detail';
import UserDetail from './views/user-detail'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Topics} />
        <Route path="/topics/:tab" component={Topics}/>
        <Route path="/topic/:topicId" component={TopicDetail} />
        <Route path="/user/:userName" component={UserDetail}/>
    </Route>
);

