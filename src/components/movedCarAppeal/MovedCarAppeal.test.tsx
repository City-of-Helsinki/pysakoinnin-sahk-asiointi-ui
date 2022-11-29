import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import MovedCarAppeal from './MovedCarAppeal';
import { Provider } from 'react-redux';
import store from '../../store';
import '@testing-library/jest-dom';
import { t } from 'i18next';

describe('moved car appeal form', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <MovedCarAppeal />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders ', () => {
    test('first step view correctly', async () => {
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <MovedCarAppeal />
          </I18nextProvider>
        </Provider>
      );

      // Form title is visible
      const formTitle = screen.getByRole('heading', {
        name: t('moved-car:title')
      });
      expect(formTitle).toBeInTheDocument();

      // Search fields (invoice number and registration number) are visible
      // and empty bu default
      const invoiceNumberEl = screen.getByRole('textbox', {
        name: t('common:fine-info:invoice-number:label') + ' *'
      });
      expect(invoiceNumberEl).toBeInTheDocument();
      expect(invoiceNumberEl).toHaveValue('');

      const regNumberEl = screen.getByRole('textbox', {
        name: t('common:fine-info:reg-number:label') + ' *'
      });
      expect(regNumberEl).toBeInTheDocument();
      expect(regNumberEl).toHaveValue('');
    });
  });
});
