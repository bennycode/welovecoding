import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App';
import store from 'src/state/store';

import 'src/styles/index.scss';

function renderApp(RootComponent) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <RootComponent />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App.tsx'], () => {
    renderApp((require('./App') as any).default);
  });
}
