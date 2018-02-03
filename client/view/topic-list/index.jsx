import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../../store/app-state';

@inject('appState')
@observer
export default class TopicList extends Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }
  changeName(evt) {
    this.props.appState.changeName(evt.target.value);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        <br />
        <span>{this.props.appState.msg}</span>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired
};
