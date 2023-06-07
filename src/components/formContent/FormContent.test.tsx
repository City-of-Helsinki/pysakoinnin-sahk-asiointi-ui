import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { axe } from 'jest-axe';
import FormContent from './FormContent';
import { ObjectionForm } from '../../interfaces/objectionInterfaces';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ClientContext } from '../../client/ClientProvider';
import store from '../../store';
import '@testing-library/jest-dom';
import mockFoulData from '../../mocks/mockFoulData';
import mockTransferData from '../../mocks/mockTransferData';

// ClientContext needs to be added here since the tests don't get it from FormStepper
renderHook(() => useContext(ClientContext));

const mockAction = jest.fn(() => {
  // Mock function
});

const dueDateFormContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: 'due-date',
    submitDisabled: true,
    foulData: mockFoulData
  },
  reducers: {}
});

const parkingFineFormContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: 'parking-fine',
    submitDisabled: true,
    foulData: mockFoulData
  },
  reducers: {}
});

const movedCarFormContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: 'moved-car',
    submitDisabled: true,
    transferData: mockTransferData
  },
  reducers: {}
});

const userSliceMock = createSlice({
  name: 'user',
  initialState: {
    userProfile: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@test.fi',
      ssn: '123456-789A'
    },
    promptLogin: false
  },
  reducers: {}
});

const { result } = renderHook(() =>
  useForm<ObjectionForm>({
    defaultValues: {
      transferNumber: '',
      foulNumber: '',
      registerNumber: ''
    }
  })
);

const control = result.current.control;
const values = result.current.getValues;

describe('form content', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <FormContent
          activeStep={0}
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders correct view based on active step and selected form', () => {
    describe('step 1 of', () => {
      test('extend due date form', async () => {
        const store = configureStore({
          reducer: {
            formContent: dueDateFormContentSliceMock.reducer,
            user: userSliceMock.reducer
          }
        });

        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent
              activeStep={0}
              control={control}
              values={values}
              onSubmitPoaFile={mockAction}
              onSubmitAttachmentFiles={mockAction}
              formFiles={{ poaFile: [], attachments: [] }}
            />
          </Provider>
        );

        await waitFor(() => expect(getByTestId('searchForm')).toBeVisible());
      });

      test('parking fine appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: parkingFineFormContentSliceMock.reducer,
            user: userSliceMock.reducer
          }
        });
        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent
              activeStep={0}
              control={control}
              values={values}
              onSubmitPoaFile={mockAction}
              onSubmitAttachmentFiles={mockAction}
              formFiles={{ poaFile: [], attachments: [] }}
            />
          </Provider>
        );
        await waitFor(() => expect(getByTestId('searchForm')).toBeVisible());
      });

      test('moved car appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: movedCarFormContentSliceMock.reducer,
            user: userSliceMock.reducer
          }
        });
        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent
              activeStep={0}
              control={control}
              values={values}
              onSubmitPoaFile={mockAction}
              onSubmitAttachmentFiles={mockAction}
              formFiles={{ poaFile: [], attachments: [] }}
            />
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
            user: userSliceMock.reducer
          }
        });

        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent
              activeStep={1}
              control={control}
              values={values}
              onSubmitPoaFile={mockAction}
              onSubmitAttachmentFiles={mockAction}
              formFiles={{ poaFile: [], attachments: [] }}
            />
          </Provider>
        );

        await waitFor(() =>
          expect(getByTestId('extendDueDateForm')).toBeVisible()
        );
      });

      test('parking fine appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: parkingFineFormContentSliceMock.reducer,
            user: userSliceMock.reducer
          }
        });

        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent
              activeStep={1}
              control={control}
              values={values}
              onSubmitPoaFile={mockAction}
              onSubmitAttachmentFiles={mockAction}
              formFiles={{ poaFile: [], attachments: [] }}
            />
          </Provider>
        );

        await waitFor(() =>
          expect(getByTestId('parkingFineSummary')).toBeVisible()
        );
      });

      test('moved car appeal form', async () => {
        const store = configureStore({
          reducer: {
            formContent: movedCarFormContentSliceMock.reducer,
            user: userSliceMock.reducer
          }
        });
        const { getByTestId } = render(
          <Provider store={store}>
            <FormContent
              activeStep={1}
              control={control}
              values={values}
              onSubmitPoaFile={mockAction}
              onSubmitAttachmentFiles={mockAction}
              formFiles={{ poaFile: [], attachments: [] }}
            />
          </Provider>
        );
        await waitFor(() =>
          expect(getByTestId('reimbursementSummary')).toBeVisible()
        );
      });
    });
  });
});
