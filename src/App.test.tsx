import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import renderWithProvider from './utils/renderWithProviders';
import { act } from '@testing-library/react';
import {
  mockAuthenticatedLoginState,
  mockUnauthenticatedLoginState
} from './utils/mockLoginHooks';

it('renders without crashing (unauthenticated)', async () => {
  mockUnauthenticatedLoginState();
  await act(async () => {
    renderWithProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});

it('renders without crashing (authenticated)', async () => {
  mockAuthenticatedLoginState();
  await act(async () => {
    renderWithProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
