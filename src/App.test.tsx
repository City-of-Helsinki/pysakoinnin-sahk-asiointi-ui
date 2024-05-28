import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import renderWithProvider from './utils/renderWithProviders';
import { act } from '@testing-library/react';

it('renders without crashing', async () => {
  await act(async () => {
    renderWithProvider(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
