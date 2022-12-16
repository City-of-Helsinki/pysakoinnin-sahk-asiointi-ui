import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import ReimbursementSummary from './ReimbursementSummary';
import { Provider } from 'react-redux';
import store from '../../store';
import '@testing-library/jest-dom';
import { t } from 'i18next';

describe('reimbursement summary', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <ReimbursementSummary />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders correctly', async () => {
    render(
      <Provider store={store}>
        <ReimbursementSummary />
      </Provider>
    );

    // Summary fields are visible
    const moveDate = screen.getByRole('textbox', {
      name: t('moved-car:move-timestamp:label')
    });
    expect(moveDate).toBeInTheDocument();

    const refNumberEl = screen.getByRole('textbox', {
      name: t('common:fine-info:ref-number:label')
    });
    expect(refNumberEl).toBeInTheDocument();

    const moveReasonEl = screen.getByRole('textbox', {
      name: t('moved-car:move-reason:label')
    });
    expect(moveReasonEl).toBeInTheDocument();

    const moveTypeEl = screen.getByRole('textbox', {
      name: t('moved-car:move-type:label')
    });
    expect(moveTypeEl).toBeInTheDocument();

    const moveAddressFromEl = screen.getByRole('textbox', {
      name: t('moved-car:address-from:label')
    });
    expect(moveAddressFromEl).toBeInTheDocument();

    const moveAddressToEl = screen.getByRole('textbox', {
      name: t('moved-car:address-to:label')
    });
    expect(moveAddressToEl).toBeInTheDocument();

    const reimbursementSum = screen.getByRole('textbox', {
      name: t('moved-car:reimbursement-sum:label')
    });
    expect(reimbursementSum).toBeInTheDocument();

    const barcodeEl = screen.getByText(/Virtuaaliviivakoodi/);
    expect(barcodeEl).toBeInTheDocument();
  });
});
