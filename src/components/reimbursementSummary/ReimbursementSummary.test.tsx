import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import ReimbursementSummary from './ReimbursementSummary';
import mockTransferData from '../../mocks/mockTransferData';
import { Provider } from 'react-redux';
import store from '../../store';

describe('reimbursement summary', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <ReimbursementSummary transferData={mockTransferData} />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders correctly', async () => {
    render(
      <Provider store={store}>
        <ReimbursementSummary transferData={mockTransferData} />
      </Provider>
    );

    // Summary fields are visible
    const moveDate = screen.getByText(/Siirron päivämäärä/i);
    expect(moveDate).toBeInTheDocument();

    const refNumberEl = screen.getByText(/Asianumero/i);
    expect(refNumberEl).toBeInTheDocument();

    const moveReasonEl = screen.getByText(/Siirron syy/i);
    expect(moveReasonEl).toBeInTheDocument();

    const moveTypeEl = screen.getByText(/Siirron tyyppi/i);
    expect(moveTypeEl).toBeInTheDocument();

    const moveAddressFromEl = screen.getByText(/Siirron lähtöosoite/i);
    expect(moveAddressFromEl).toBeInTheDocument();

    const moveAddressToEl = screen.getByText(/Siirron pääteosoite/i);
    expect(moveAddressToEl).toBeInTheDocument();

    const reimbursementSum = screen.getByText(/Korvauspäätöksen summa/i);
    expect(reimbursementSum).toBeInTheDocument();

    const barcodeEl = screen.getByText(/Virtuaaliviivakoodi/);
    expect(barcodeEl).toBeInTheDocument();
  });
});
