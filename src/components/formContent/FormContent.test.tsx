import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { axe } from 'jest-axe';
import FormContent from './FormContent';
import { RectificationFormType } from './formContentSlice';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ClientContext } from '../../client/ClientProvider';
import store from '../../store';
import '@testing-library/jest-dom';

// ClientContext needs to be added here since the tests don't get it from FormStepper
renderHook(() => useContext(ClientContext));

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

const movedCarFormContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: 'moved-car',
    submitDisabled: true
  },
  reducers: {}
});

const { result } = renderHook(() =>
  useForm<RectificationFormType>({
    defaultValues: {
      invoiceNumber: '',
      refNumber: '',
      regNumber: ''
    }
  })
);

const control = result.current.control;
const values = result.current.getValues;

describe('form content', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <FormContent activeStep={0} control={control} values={values} />
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
            <FormContent activeStep={0} control={control} values={values} />
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
            <FormContent activeStep={0} control={control} values={values} />
          </Provider>
        );
        await waitFor(() => expect(getByTestId('searchForm')).toBeVisible());
      });

      test('moved car appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: movedCarFormContentSliceMock.reducer
          }
        });
        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent activeStep={0} control={control} values={values} />
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
            <FormContent activeStep={1} control={control} values={values} />
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
            <FormContent activeStep={1} control={control} values={values} />
          </Provider>
        );

        await waitFor(() =>
          expect(getByTestId('parkingFineSummary')).toBeVisible()
        );
      });

      test('moved car appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: movedCarFormContentSliceMock.reducer
          }
        });
        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent activeStep={1} control={control} values={values} />
          </Provider>
        );
        await waitFor(() =>
          expect(getByTestId('reimbursementSummary')).toBeVisible()
        );
      });
    });
  });
});
