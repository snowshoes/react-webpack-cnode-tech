import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import appState from './store/app-state';
import App from './view/App.jsx'; // eslint-disable-line

const root = document.getElementById('root');

// ReactDOM.hydrate(<App />, root);

// Test Webpack global variables
console.log(process.ent.TWO);
console.log(process.ent.NODE_ENV);

// const render = (Component) => {
//   ReactDOM.hydrate(
//     <AppContainer>
//       <Provider appState={appState}>
//         <BrowserRouter>
//           <Component />
//         </BrowserRouter>
//       </Provider>
//     </AppContainer>,
//     root
//   );
// };

// 这么写可以避免一个warning
// https://github.com/nozzle/react-static/issues/144
const render = (Component) => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
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
