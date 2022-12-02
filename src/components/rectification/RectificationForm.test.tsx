import React from 'react';
import { render, waitFor } from '@testing-library/react';
import RectificationForm from './RectificationForm';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { axe } from 'jest-axe';

// eslint-disable-next-line no-magic-numbers
jest.setTimeout(10000);

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

  const store = configureStore({
    reducer: {
      formContent: formContentSliceMock.reducer
    }
  });

  it('matches snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm />
      </Provider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm />
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

  const store = configureStore({
    reducer: {
      formContent: formContentSliceMock.reducer
    }
  });

  it('matches snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm />
      </Provider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
