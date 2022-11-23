import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import ExtendDueDate from './ExtendDueDate';
import ExtendDueDateForm from './ExtendDueDateForm';
import { Provider } from 'react-redux';
import store from '../../store';
import '@testing-library/jest-dom';
import { t } from 'i18next';

describe('extend due date form', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <ExtendDueDate />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders ', () => {
    test('first step view correctly', async () => {
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ExtendDueDate />
          </I18nextProvider>
        </Provider>
      );

      const refNumberEl = screen.getByRole('textbox', {
        name: t('common:fine-info:ref-number:label') + ' *'
      });
      expect(refNumberEl).toBeInTheDocument();
      expect(refNumberEl).toHaveValue('');

      const regNumberEl = screen.getByRole('textbox', {
        name: t('common:fine-info:reg-number:label') + ' *'
      });
      expect(regNumberEl).toBeInTheDocument();
      expect(regNumberEl).toHaveValue('');
    });

    test('second step view correctly', async () => {
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ExtendDueDateForm />
          </I18nextProvider>
        </Provider>
      );

      const refNumberEl = screen.getByRole('textbox', {
        name: t('common:fine-info:ref-number:label')
      });
      expect(refNumberEl).toBeInTheDocument();

      const regNumberEl = screen.getByRole('textbox', {
        name: t('common:fine-info:reg-number:label')
      });
      expect(regNumberEl).toBeInTheDocument();

      const sumEl = screen.getByRole('textbox', {
        name: t('common:fine-info:sum:label')
      });
      expect(sumEl).toBeInTheDocument();

      const dueDateEl = screen.getByRole('textbox', {
        name: t('common:fine-info:due-date:label')
      });
      expect(dueDateEl).toBeInTheDocument();
      expect(dueDateEl).toHaveValue('12.12.2022');

      const newDueDateEl = screen.getByRole('textbox', {
        name: t('due-date:new-due-date')
      });
      expect(newDueDateEl).toBeInTheDocument();
      expect(newDueDateEl).toHaveValue('11.01.2023');

      const checkbox = screen.getByRole('checkbox', {
        name: t('common:email-confirmation')
      });
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      await waitFor(() => {
        checkbox.click();
      });
      expect(checkbox).toBeChecked();
    });
  });
});
