import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import RectificationSummary from './RectificationSummary';
import store from '../../store';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import mockFoulData from '../../mocks/mockFoulData';
import mockRectificationForm from '../../mocks/mockRectificationForm';

describe('Component', () => {
  it('matches snapshot', async () => {
    const formContentSliceMock = createSlice({
      name: 'formContent',
      initialState: {
        formSubmitted: false,
        selectedForm: 'parking-fine',
        submitDisabled: true,
        foulData: mockFoulData,
        formValues: mockRectificationForm
      },
      reducers: {}
    });

    const userSliceMock = createSlice({
      name: 'user',
      initialState: {
        userProfile: {
          name: 'Test User',
          email: 'test.user@test.fi',
          SSN: '123456-789A'
        },
        promptLogin: false
      },
      reducers: {}
    });

    const store = configureStore({
      reducer: {
        formContent: formContentSliceMock.reducer,
        user: userSliceMock.reducer
      }
    });
    const { container } = render(
      <Provider store={store}>
        <RectificationSummary
          form={mockRectificationForm}
          formType="parking-fine"
        />
      </Provider>
    );
    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11Y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationSummary
          form={mockRectificationForm}
          formType="parking-fine"
        />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
