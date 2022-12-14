import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import ExtendDueDate from './ExtendDueDate';
import ExtendDueDateForm from './ExtendDueDateForm';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../../store';
import '@testing-library/jest-dom';
import { t } from 'i18next';
import { formatDate, formatISODate, getNewDueDate } from '../../utils/helpers';

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

      // Form title is visible
      const formTitle = screen.getByRole('heading', {
        name: t('due-date:title')
      });
      expect(formTitle).toBeInTheDocument();

      // Search fields (reference number and registration number) are visible
      // and empty by default
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
      const currentDate = formatISODate(new Date());
      const newDueDate = formatISODate(getNewDueDate(currentDate));

      const extendDueDateFormSliceMock = createSlice({
        name: 'extendDueDateForm',
        initialState: {
          dueDate: currentDate,
          newDueDate: newDueDate,
          emailConfirmationChecked: false
        },
        reducers: {
          setEmailConfirmationChecked: (state, action) => {
            state.emailConfirmationChecked = action.payload;
          }
        }
      });
      const formContentSliceMock = createSlice({
        name: 'formContent',
        initialState: {
          formSubmitted: false,
          selectedForm: 'due-date',
          submitDisabled: true
        },
        reducers: {}
      });

      const store = configureStore({
        reducer: {
          extendDueDateForm: extendDueDateFormSliceMock.reducer,
          formContent: formContentSliceMock.reducer
        }
      });

      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ExtendDueDateForm />
          </I18nextProvider>
        </Provider>
      );

      // Parking fine info is visible
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
      expect(dueDateEl).toHaveValue(formatDate(currentDate));

      const newDueDateEl = screen.getByRole('textbox', {
        name: t('due-date:new-due-date')
      });
      expect(newDueDateEl).toBeInTheDocument();
      expect(newDueDateEl).toHaveValue(formatDate(newDueDate));

      // Due date notification is visible
      const infoNotification = screen.getByRole('heading', {
        name: t('due-date:notifications:allowed:label')
      });
      expect(infoNotification).toBeInTheDocument();

      // Email confirmation text is visible
      const emailConfirmationLabel = screen.getByText(/S??hk??postivahvistus/i);
      expect(emailConfirmationLabel).toBeInTheDocument();

      const emailConfirmationText = screen.getByText(
        /Vahvistus l??hetet????n Helsinki-profiilissasi olevaan s??hk??postiosoitteeseen:/i
      );
      expect(emailConfirmationText).toBeInTheDocument();

      // Checkbox is visible and clickable
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
