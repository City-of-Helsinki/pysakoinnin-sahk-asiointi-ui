import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-namespace
import * as Sentry from '@sentry/react';

import './index.css';
import './utils/i18n';
import BrowserApp from './BrowserApp';
// eslint-disable-next-line import/no-namespace
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _env_: any;
  }
}

const isLocalhost = window.location.hostname === 'localhost';

Sentry.init({
  dsn: window._env_.REACT_APP_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  environment: window._env_.REACT_APP_ENVIRONMENT,
  tracesSampleRate: isLocalhost ? 0.0 : window._env_.REACT_APP_SENTRY_TRACE_RATE
});

ReactDOM.render(<BrowserApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
