/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable sonarjs/no-duplicate-string */
import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { axe } from 'vitest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import ExtendDueDate from './ExtendDueDate';
import ExtendDueDateForm from './ExtendDueDateForm';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../../store';
import { t } from 'i18next';
import { formatDate } from '../../utils/helpers';
import { ClientContext } from '../../client/ClientProvider';
import { BrowserRouter } from 'react-router-dom';
import mockFoulData from '../../mocks/mockFoulData';

// ClientContext needs to be added here since the tests don't get it from FormStepper
renderHook(() => useContext(ClientContext));

describe('extend due date form', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ExtendDueDate />
        </Provider>
      </BrowserRouter>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders ', () => {
    test('first step view correctly', async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ExtendDueDate />
            </I18nextProvider>
          </Provider>
        </BrowserRouter>
      );

      // Form title is visible
      const formTitle = screen.getByRole('heading', {
        name: t<string>('due-date:title')
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

    describe('second step view correctly', () => {
      test('when due date can be extended', async () => {
        const dueDate = '2023-04-05';
        const newDueDate = '2023-05-05';

        const formContentSliceMock = createSlice({
          name: 'formContent',
          initialState: {
            formSubmitted: false,
            selectedForm: 'due-date',
            submitDisabled: false,
            emailConfirmation: false,
            foulData: {
              dueDate: '2023-04-05T09:32:00',
              dueDateExtendable: true
            }
          },
          reducers: {
            setEmailConfirmation: (state, action) => {
              state.emailConfirmation = action.payload;
            }
          }
        });

        const userSliceMock = createSlice({
          name: 'user',
          initialState: {
            userProfile: {
              firstName: 'Test',
              lastName: 'User',
              email: 'test.user@test.fi',
              ssn: '123456-789A'
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

        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ExtendDueDateForm />
            </I18nextProvider>
          </Provider>
        );

        // Parking fine info is visible

        const refNumberEl = screen.getByTestId('refNumber');
        expect(refNumberEl).toBeInTheDocument();
        expect(refNumberEl).toHaveTextContent(
          t<string>('common:fine-info:ref-number:label')
        );

        const regNumberEl = screen.getByTestId('regNumber');
        expect(regNumberEl).toBeInTheDocument();
        expect(regNumberEl).toHaveTextContent(
          t<string>('common:fine-info:reg-number:label')
        );

        const sumEl = screen.getByTestId('sum');
        expect(sumEl).toBeInTheDocument();
        expect(sumEl).toHaveTextContent(t<string>('common:fine-info:sum'));

        const dueDateEl = screen.getByTestId('dueDate');
        expect(dueDateEl).toBeInTheDocument();
        expect(dueDateEl).toHaveTextContent(
          t<string>('common:fine-info:due-date')
        );
        expect(dueDateEl).toHaveTextContent(formatDate(dueDate));

        const newDueDateEl = screen.getByTestId('newDueDate');
        expect(newDueDateEl).toBeInTheDocument();
        expect(newDueDateEl).toHaveTextContent(
          t<string>('due-date:new-due-date')
        );
        expect(newDueDateEl).toHaveTextContent(formatDate(newDueDate));

        // Due date notification is visible
        const infoNotificationHeading = screen.queryByRole('heading', {
          name: t<string>('due-date:notifications:allowed:label')
        });
        const infoNotificationBody = screen.getByText(
          t('due-date:notifications:allowed:text') as string
        );
        expect(infoNotificationHeading).toBeVisible();
        expect(infoNotificationBody).toBeVisible();

        const closeNotificationButton = screen.getByRole('button', {
          name: t<string>('common:close-notification')
        });
        expect(closeNotificationButton).toBeVisible();

        // Email confirmation text is visible
        const emailConfirmationLabel = screen.getByText(/Sähköpostivahvistus/i);
        expect(emailConfirmationLabel).toBeInTheDocument();

        const emailConfirmationText = screen.getByText(
          /Vahvistus lähetetään Helsinki-profiilissasi olevaan sähköpostiosoitteeseen:/i
        );
        expect(emailConfirmationText).toBeInTheDocument();

        // Checkbox is visible and clickable
        const checkbox = screen.getByRole('checkbox', {
          name: t<string>('common:email-confirmation')
        });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        await waitFor(() => {
          checkbox.click();
        });
        expect(checkbox).toBeChecked();
      });

      describe('when due date cannot be extended because', () => {
        const userSliceMock = createSlice({
          name: 'user',
          initialState: {
            userProfile: {
              firstName: 'Test',
              lastName: 'User',
              email: 'test.user@test.fi',
              ssn: '123456-789A'
            },
            promptLogin: false
          },
          reducers: {}
        });

        test('it is already passed', async () => {
          const foulData = { ...mockFoulData, dueDateExtendableReason: 2 };
          const dueDate = '2023-04-05';

          const formContentSliceMock = createSlice({
            name: 'formContent',
            initialState: {
              formSubmitted: false,
              selectedForm: 'due-date',
              submitDisabled: true,
              foulData: foulData
            },
            reducers: {}
          });

          const store = configureStore({
            reducer: {
              formContent: formContentSliceMock.reducer,
              user: userSliceMock.reducer
            }
          });

          render(
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <ExtendDueDateForm />
              </I18nextProvider>
            </Provider>
          );

          // Due date notification is visible
          const infoNotificationHeading = screen.getByRole('heading', {
            name: t<string>('due-date:notifications:not-allowed:label')
          });
          const infoNotificationBody = screen.getByText(
            t('due-date:errors:due-date-past') as string
          );

          expect(infoNotificationHeading).toBeVisible();
          expect(infoNotificationBody).toBeVisible();

          // Parking fine info is visible

          const refNumberEl = screen.getByTestId('refNumber');
          expect(refNumberEl).toBeInTheDocument();
          expect(refNumberEl).toHaveTextContent(
            t<string>('common:fine-info:ref-number:label')
          );

          const regNumberEl = screen.getByTestId('regNumber');
          expect(regNumberEl).toBeInTheDocument();
          expect(regNumberEl).toHaveTextContent(
            t<string>('common:fine-info:reg-number:label')
          );

          const sumEl = screen.getByTestId('sum');
          expect(sumEl).toBeInTheDocument();
          expect(sumEl).toHaveTextContent(t<string>('common:fine-info:sum'));

          const dueDateEl = screen.getByTestId('dueDate');
          expect(dueDateEl).toBeInTheDocument();
          expect(dueDateEl).toHaveTextContent(
            t<string>('common:fine-info:due-date')
          );
          expect(dueDateEl).toHaveTextContent(formatDate(dueDate));

          // New due date field not visible when due date cannot be extended
          const newDueDateEl = screen.queryByTestId('newDueDate');
          expect(newDueDateEl).not.toBeInTheDocument();

          // Checkbox is visible but not clickable
          const checkbox = screen.getByRole('checkbox', {
            name: t<string>('common:email-confirmation')
          });
          expect(checkbox).toBeInTheDocument();
          expect(checkbox).toBeDisabled();
        });

        test('it has already been extended', async () => {
          const foulData = { ...mockFoulData, dueDateExtendableReason: 4 };

          const formContentSliceMock = createSlice({
            name: 'formContent',
            initialState: {
              formSubmitted: false,
              selectedForm: 'due-date',
              foulData: foulData
            },
            reducers: {}
          });

          const store = configureStore({
            reducer: {
              formContent: formContentSliceMock.reducer,
              user: userSliceMock.reducer
            }
          });

          render(
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <ExtendDueDateForm />
              </I18nextProvider>
            </Provider>
          );

          // Due date notification is visible
          const infoNotificationHeading = screen.getByRole('heading', {
            name: t<string>('due-date:notifications:not-allowed:label')
          });
          const infoNotificationBody = screen.getByText(
            t('due-date:errors:already-extended') as string
          );

          expect(infoNotificationHeading).toBeVisible();
          expect(infoNotificationBody).toBeVisible();
        });

        test('something else happened', async () => {
          const foulData = { ...mockFoulData, dueDateExtendableReason: 6 };

          const formContentSliceMock = createSlice({
            name: 'formContent',
            initialState: {
              formSubmitted: false,
              selectedForm: 'due-date',
              foulData: foulData
            },
            reducers: {}
          });

          const store = configureStore({
            reducer: {
              formContent: formContentSliceMock.reducer,
              user: userSliceMock.reducer
            }
          });

          render(
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <ExtendDueDateForm />
              </I18nextProvider>
            </Provider>
          );

          // Due date notification is visible
          const infoNotificationHeading = screen.getByRole('heading', {
            name: t<string>('due-date:notifications:not-allowed:label')
          });
          const infoNotificationBody = screen.getByText(
            t('due-date:errors:default') as string
          );

          expect(infoNotificationHeading).toBeVisible();
          expect(infoNotificationBody).toBeVisible();
        });
      });
    });
  });
});
