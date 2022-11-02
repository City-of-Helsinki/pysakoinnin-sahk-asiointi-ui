import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-namespace
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

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

Sentry.init({
  dsn: window._env_.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: window._env_.REACT_APP_ENVIRONMENT,
  tracesSampleRate: window._env_.REACT_APP_SENTRY_TRACE_RATE
});

ReactDOM.render(<BrowserApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
