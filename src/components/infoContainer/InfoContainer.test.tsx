import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import InfoContainer from './InfoContainer';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../../store';
import '@testing-library/jest-dom';

describe('info container', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <InfoContainer />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders parking fine summary correctly', async () => {
    const parkingFineFormContentSliceMock = createSlice({
      name: 'formContent',
      initialState: {
        formSubmitted: false,
        selectedForm: 'parking-fine',
        submitDisabled: true
      },
      reducers: {}
    });
    const store = configureStore({
      reducer: {
        formContent: parkingFineFormContentSliceMock.reducer
      }
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <InfoContainer />
      </Provider>
    );

    // Car info card is visible
    await waitFor(() => expect(getByTestId('carInfoCard')).toBeVisible());

    // ParkingFineSummary is visible
    await waitFor(() =>
      expect(getByTestId('parkingFineSummary')).toBeVisible()
    );
  });

  test('renders reimbursement summary correctly', async () => {
    const movedCarFormContentSliceMock = createSlice({
      name: 'formContent',
      initialState: {
        formSubmitted: false,
        selectedForm: 'moved-car',
        submitDisabled: true
      },
      reducers: {}
    });
    const store = configureStore({
      reducer: {
        formContent: movedCarFormContentSliceMock.reducer
      }
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <InfoContainer />
      </Provider>
    );

    // Car info card is visible
    await waitFor(() => expect(getByTestId('carInfoCard')).toBeVisible());

    // ReimbursementSummary is visible
    await waitFor(() =>
      expect(getByTestId('reimbursementSummary')).toBeVisible()
    );
  });
});
