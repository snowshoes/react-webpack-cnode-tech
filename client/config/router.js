import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../view/topic-list/index';
import TopicDetail from '../view/topic-detail';
import TestApi from '../view/test/api-test';

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />
];
