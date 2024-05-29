import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import InfoContainer from './InfoContainer';
import { Provider } from 'react-redux';
import store from '../../store';
import mockFoulData from '../../mocks/mockFoulData';
import mockTransferData from '../../mocks/mockTransferData';
import { FormId } from '../formContent/formContentSlice';

describe('info container', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <InfoContainer selectedForm={FormId.PARKINGFINE} editMode={true} />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders parking fine summary correctly', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <InfoContainer
          selectedForm={FormId.PARKINGFINE}
          foulData={mockFoulData}
          editMode={true}
        />
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
    const { getByTestId } = render(
      <Provider store={store}>
        <InfoContainer
          selectedForm={FormId.MOVEDCAR}
          transferData={mockTransferData}
          editMode={true}
        />
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
