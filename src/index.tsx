import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-namespace
import * as Sentry from '@sentry/browser';

import './index.css';
import './utils/i18n.js';
import BrowserApp from './BrowserApp';
// eslint-disable-next-line import/no-namespace
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _env_: any;
  }
}

const ENVS_WITH_SENTRY = ['staging', 'production'];

if (
  window._env_.REACT_APP_ENVIRONMENT &&
  ENVS_WITH_SENTRY.includes(window._env_.REACT_APP_ENVIRONMENT)
) {
  Sentry.init({
    dsn: window._env_.REACT_APP_SENTRY_DSN,
    environment: window._env_.REACT_APP_ENVIRONMENT
  });
}

ReactDOM.render(<BrowserApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
