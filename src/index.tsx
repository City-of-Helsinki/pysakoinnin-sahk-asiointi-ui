import React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-namespace
import * as Sentry from '@sentry/react';

import './index.css';
import './utils/i18n';
import BrowserApp from './BrowserApp';
// eslint-disable-next-line import/no-namespace
import * as serviceWorker from './serviceWorker';
import { beforeSend, beforeSendTransaction } from './utils/sentry';

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
  tracesSampleRate: isLocalhost
    ? 0.0
    : window._env_.REACT_APP_SENTRY_TRACE_RATE,
  beforeSend: beforeSend as Sentry.BrowserOptions['beforeSend'],
  beforeSendTransaction: beforeSendTransaction as Sentry.BrowserOptions['beforeSendTransaction']
});

// Create a root instance
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

// Render the app through the root
root.render(<BrowserApp />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
