/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import FormStepper from './FormStepper';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import store from '../../store';
import { t } from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import loadingSlice from '../loader/loadingSlice';
import { FormId } from '../formContent/formContentSlice';
import { mockAuthenticatedLoginState } from '../../utils/mockLoginHooks';

const mockAction = vi.fn(() => {
  // Mock function
});

const formContentSliceMock = createSlice({
  name: 'formContent',
  initialState: {
    formSubmitted: false,
    selectedForm: FormId.DUEDATE,
    submitDisabled: true,
    formValues: {},
    formError: null,
    submitError: false,
    emailConfirmation: false
  },
  reducers: {}
});

const extendDueDateFormSliceMock = createSlice({
  name: 'extendDueDateForm',
  initialState: {
    dueDate: '2022-12-12',
    newDueDate: '2023-01-11',
    emailConfirmationChecked: false
  },
  reducers: {}
});

let formStepperSliceMock = createSlice({
  name: 'formStepper',
  initialState: {
    activeStepIndex: 0,
    steps: [
      {
        label: 'Haku',
        state: 0
      },
      {
        label: 'Eräpäivän siirto',
        state: 2
      }
    ]
  },
  reducers: {
    completeStep: mockAction,
    setActive: mockAction,
    setSteps: mockAction
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

describe('form stepper', () => {
  beforeEach(async () => {
    mockAuthenticatedLoginState();
  });
  test('passes a11y validation', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <FormStepper
            initialSteps={formStepperSliceMock.getInitialState().steps}
          />
        </Provider>
      </BrowserRouter>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  test('renders first step view correctly', async () => {
    const store = configureStore({
      reducer: {
        formContent: formContentSliceMock.reducer,
        formStepper: formStepperSliceMock.reducer,
        extendDueDateForm: extendDueDateFormSliceMock.reducer,
        user: userSliceMock.reducer,
        loading: loadingSlice
      }
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <FormStepper
              initialSteps={formStepperSliceMock.getInitialState().steps}
            />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    );

    // Check that the correct step is rendered
    const firstStepHeading = screen.getByRole('heading', {
      name: 'Vaihe 1/2: Haku'
    });
    expect(firstStepHeading).toBeInTheDocument();

    const secondStepHeading = screen.queryByRole('heading', {
      name: 'Vaihe 2/2: Eräpäivän siirto'
    });
    expect(secondStepHeading).toBeNull();

    // Check that both buttons are visible and enabled

    // 'previous' button should have role 'link' instead of 'button'
    // since it takes user to the landing page
    const previousButton = screen.queryByRole('button', {
      name: t('common:previous')
    });
    expect(previousButton).not.toBeInTheDocument();

    const previousButtonLink = screen.queryByRole('link', {
      name: t('common:previous')
    });
    expect(previousButtonLink).toBeInTheDocument();
    expect(previousButtonLink).toBeEnabled();

    const nextButton = screen.getByRole('button', {
      name: t('common:next')
    });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeEnabled();

    await waitFor(() => {
      nextButton.click();
    });

    expect(mockAction).toHaveBeenCalled();
  });

  test('renders last step view correctly', async () => {
    formStepperSliceMock = createSlice({
      name: 'formStepper',
      initialState: {
        activeStepIndex: 1,
        steps: [
          {
            label: 'Haku',
            state: 1
          },
          {
            label: 'Eräpäivän siirto',
            state: 0
          }
        ]
      },
      reducers: {
        completeStep: mockAction,
        setActive: mockAction,
        setSteps: mockAction
      }
    });

    const store = configureStore({
      reducer: {
        formContent: formContentSliceMock.reducer,
        formStepper: formStepperSliceMock.reducer,
        extendDueDateForm: extendDueDateFormSliceMock.reducer,
        user: userSliceMock.reducer
      }
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <FormStepper
              initialSteps={formStepperSliceMock.getInitialState().steps}
            />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    );

    // Check that the correct step is rendered
    const firstStepHeading = screen.queryByRole('heading', {
      name: 'Vaihe 1/2: Haku'
    });
    expect(firstStepHeading).toBeNull();

    const secondStepHeading = screen.getByRole('heading', {
      name: 'Vaihe 2/2: Eräpäivän siirto'
    });
    expect(secondStepHeading).toBeInTheDocument();

    // Check that both buttons are visible but submit button is disabled by default
    const previousButton = screen.getByRole('button', {
      name: t('common:previous')
    });
    expect(previousButton).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: t('due-date:submit')
    });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      submitButton.click();
    });

    expect(mockAction).toHaveBeenCalled();
  });
});
