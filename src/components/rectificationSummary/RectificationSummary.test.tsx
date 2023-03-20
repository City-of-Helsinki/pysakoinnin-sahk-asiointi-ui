import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import RectificationSummary from './RectificationSummary';
import store from '../../store';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import mockFoulData from '../../mocks/mockFoulData';

describe('Component', () => {
  it('matches snapshot', async () => {
    const formContentSliceMock = createSlice({
      name: 'formContent',
      initialState: {
        formSubmitted: false,
        selectedForm: 'parking-fine',
        submitDisabled: true,
        foulData: mockFoulData,
        formValues: {
          invoiceNumber: '',
          refNumber: '',
          regNumber: '',
          relation: 'driver',
          poaFile: { name: 'test.pdf', size: 12345, type: 'application/pdf' },
          attachments: [{ name: 'test2.jpg', size: 50100, type: 'image/jpeg' }],
          toSeparateEmail: false,
          newEmailAddress: '',
          newEmailConfirm: '',
          address: 'Elimäenkatu 5',
          zipCode: '00100',
          city: 'Helsinki',
          phone: '+358401234567',
          IBAN: 'FI9780001700903330',
          rectificationContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum condimentum mi, vitae efficitur mi vulputate at. Aliquam porttitor tincidunt ex non fermentum. Fusce consequat imperdiet augue ut pulvinar. Praesent sollicitudin nulla non lacus tristique, sed faucibus urna viverra. Nullam pretium velit lorem. Maecenas porttitor molestie.',
          deliveryDecision: 'toParkingService'
        }
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
        <RectificationSummary />
      </Provider>
    );
    await waitFor(() => expect(container).toMatchSnapshot());
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
