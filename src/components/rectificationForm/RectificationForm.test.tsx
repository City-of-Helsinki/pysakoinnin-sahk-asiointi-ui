import React, { useContext } from 'react';
import { render, waitFor } from '@testing-library/react';
import RectificationForm from './RectificationForm';
import { ObjectionForm } from '../../interfaces/objectionInterfaces';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { axe } from 'vitest-axe';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import { ClientContext } from '../../client/ClientProvider';

// ClientContext needs to be added here since the tests don't get it from FormStepper
renderHook(() => useContext(ClientContext));
const { result } = renderHook(() => useForm<ObjectionForm>());
const control = result.current.control;
const values = result.current.getValues;

const mockAction = vi.fn(() => {
  // Mock function
});

describe('Component in parking fine appeal form', () => {
  const formContentSliceMock = createSlice({
    name: 'formContent',
    initialState: {
      formSubmitted: false,
      selectedForm: 'parking-fine',
      submitDisabled: true
    },
    reducers: {}
  });

  const userProfileSliceMock = createSlice({
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

  const store = configureStore({
    reducer: {
      formContent: formContentSliceMock.reducer,
      user: userProfileSliceMock.reducer
    }
  });

  it('matches snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
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
});

describe('Component in moved car form', () => {
  const formContentSliceMock = createSlice({
    name: 'formContent',
    initialState: {
      formSubmitted: false,
      selectedForm: 'moved-car',
      submitDisabled: true
    },
    reducers: {}
  });

  const userProfileSliceMock = createSlice({
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

  const store = configureStore({
    reducer: {
      formContent: formContentSliceMock.reducer,
      user: userProfileSliceMock.reducer
    }
  });

  it('matches snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
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
});
