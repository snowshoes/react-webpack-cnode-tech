import React, { Component } from 'react';
import axios from 'axios';

/* eslint-disable */
export default class TestApi extends Component {
  getTopics() {
    axios
      .get('/api/topics')
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  login() {
    axios
      .post('/api/user/login', {
        accessToken: '1cf8cb93-171e-4de0-9053-d13268915312'
      })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  markAll() {
    axios
      .post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>Topics</button>
        <button onClick={this.login}>AccessToken</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    );
  }
  /* eslint-enable */
}
