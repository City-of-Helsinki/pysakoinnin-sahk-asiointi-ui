import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import RectificationSummary from './RectificationSummary';
import store from '../../store';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

describe('Component', () => {
  it('matches snapshot', () => {
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
    const { container } = render(
      <Provider store={store}>
        <RectificationSummary />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('passes A11Y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationSummary />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
