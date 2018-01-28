import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';

const root = document.getElementById('root');

// ReactDOM.hydrate(<App />, root);

// Test Webpack global variables
console.log(process.ent.TWO);
console.log(process.ent.NODE_ENV);
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  );
};

render(App);

// https://stackoverflow.com/questions/27732209/turning-off-eslint-rule-for-a-specific-line
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    const NextApp = require('./App.jsx').default; // eslint-disable-line global-require
    render(NextApp);
  });
}
