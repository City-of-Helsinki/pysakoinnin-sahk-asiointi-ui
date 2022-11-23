import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import FormContent from './FormContent';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../../store';
import '@testing-library/jest-dom';

const extendDueDateFormSliceMock = createSlice({
  name: 'extendDueDateForm',
  initialState: {
    dueDate: '2022-12-12',
    newDueDate: '2023-01-11',
    emailConfirmationChecked: false
  },
  reducers: {}
});

const dueDateFormContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: 'due-date',
    submitDisabled: true
  },
  reducers: {}
});

const parkingFineFormContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: 'parking-fine',
    submitDisabled: true
  },
  reducers: {}
});

describe('form content', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <FormContent activeStep={0} />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders correct view based on active step and selected form', () => {
    describe('step 1 of', () => {
      test('extend due date form', async () => {
        const store = configureStore({
          reducer: {
            formContent: dueDateFormContentSliceMock.reducer
          }
        });

        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent activeStep={0} />
          </Provider>
        );

        await waitFor(() => expect(getByTestId('searchForm')).toBeVisible());
      });

      test('parking fine appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: parkingFineFormContentSliceMock.reducer
          }
        });
        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent activeStep={0} />
          </Provider>
        );
        await waitFor(() => expect(getByTestId('searchForm')).toBeVisible());
      });
    });
    describe('step 2 of', () => {
      test('extend due date form', async () => {
        const store = configureStore({
          reducer: {
            formContent: dueDateFormContentSliceMock.reducer,
            extendDueDateForm: extendDueDateFormSliceMock.reducer
          }
        });

        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent activeStep={1} />
          </Provider>
        );

        await waitFor(() =>
          expect(getByTestId('extendDueDateForm')).toBeVisible()
        );
      });
      test('parking fine appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: parkingFineFormContentSliceMock.reducer
          }
        });

        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent activeStep={1} />
          </Provider>
        );

        await waitFor(() =>
          expect(getByTestId('parkingFineSummary')).toBeVisible()
        );
      });
    });
  });
});
