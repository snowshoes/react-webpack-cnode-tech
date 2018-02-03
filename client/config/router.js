import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../view/topic-list/index';
import TopicDetail from '../view/topic-detail';

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact />,
  <Route path="/list" component={TopicList} />,
  <Route path="/detail" component={TopicDetail} />
];
