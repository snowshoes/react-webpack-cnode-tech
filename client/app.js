import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './view/App.jsx'; // eslint-disable-line

const root = document.getElementById('root');

// ReactDOM.hydrate(<App />, root);

// Test Webpack global variables
console.log(process.ent.TWO);
console.log(process.ent.NODE_ENV);
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root
  );
};

render(App);

// https://stackoverflow.com/questions/27732209/turning-off-eslint-rule-for-a-specific-line
if (module.hot) {
  module.hot.accept('./view/App.jsx', () => {
    const NextApp = require('./view/App.jsx').default; // eslint-disable-line global-require
    render(NextApp);
  });
}
