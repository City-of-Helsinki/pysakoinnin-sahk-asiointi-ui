/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { act, render, screen, waitFor, renderHook } from '@testing-library/react';
import RectificationForm, { phoneNumberRegex } from './RectificationForm';
import { ObjectionForm } from '../../interfaces/objectionInterfaces';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { axe } from 'vitest-axe';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';

const { result } = renderHook(() => useForm<ObjectionForm>());
const control = result.current.control;
const values = result.current.getValues;

const mockAction = vi.fn(() => {
  // Mock function
});

const renderFormWithValues = (defaultValues: ObjectionForm) => {
  const form = renderHook(() => useForm<ObjectionForm>({ defaultValues }));
  const testStore = configureStore({
    reducer: {
      formContent: createSlice({
        name: 'validationFormContent',
        initialState: {
          formSubmitted: false,
          selectedForm: 'parking-fine',
          submitDisabled: true
        },
        reducers: {}
      }).reducer,
      user: createSlice({
        name: 'validationUser',
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
      }).reducer
    }
  });

  render(
    <Provider store={testStore}>
      <RectificationForm
        control={form.result.current.control}
        values={form.result.current.getValues}
        onSubmitPoaFile={mockAction}
        onSubmitAttachmentFiles={mockAction}
        formFiles={{ poaFile: [], attachments: [] }}
      />
    </Provider>
  );

  return form.result;
};

describe('Component in parking fine appeal form', () => {
  const formContentSliceMock = createSlice({
    name: 'formContent',
    initialState: {
      formSubmitted: false,
      selectedForm: 'parking-fine',
      submitDisabled: true
    },
    reducers: {}
  });

  const userProfileSliceMock = createSlice({
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
      user: userProfileSliceMock.reducer
    }
  });

  it('matches snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Component in moved car form', () => {
  const formContentSliceMock = createSlice({
    name: 'formContent',
    initialState: {
      formSubmitted: false,
      selectedForm: 'moved-car',
      submitDisabled: true
    },
    reducers: {}
  });

  const userProfileSliceMock = createSlice({
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
      user: userProfileSliceMock.reducer
    }
  });

  it('matches snapshot', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationForm
          control={control}
          values={values}
          onSubmitPoaFile={mockAction}
          onSubmitAttachmentFiles={mockAction}
          formFiles={{ poaFile: [], attachments: [] }}
        />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});

describe('Phone number validation regex', () => {
  it.each([
    '0401234567',
    '+358401234567',
    '+358 40 123 4567',
    '040 123 4567',
    '00 358 40 1234567'
  ])('accepts valid phone number: %s', phone => {
    expect(phoneNumberRegex.test(phone)).toBe(true);
  });

  it.each([
    '',
    '   ',
    'abc',
    '040abc1234',
    '+',
    '040+1234567'
  ])('rejects invalid phone number: %s', phone => {
    expect(phoneNumberRegex.test(phone)).toBe(false);
  });
});

describe('Validation messages', () => {
  it('shows the invalid IBAN message', async () => {
    const form = renderFormWithValues({ iban: 'invalid' });

    await act(async () => {
      await form.current.trigger('iban');
    });

    expect(
      screen.getByText(t('rectificationForm:errors:invalid-iban'))
    ).toBeVisible();
  });

  it('shows the required description message', async () => {
    const form = renderFormWithValues({ description: '' });

    await act(async () => {
      await form.current.trigger('description');
    });

    expect(screen.getByText(t('common:required-field'))).toBeVisible();
  });

  it('shows the description length message', async () => {
    const overlongDescription = 'a'.repeat(
      Number(window._env_.REACT_APP_RECTIFICATION_CHAR_LIMIT) + 1
    );
    const form = renderFormWithValues({ description: overlongDescription });

    await act(async () => {
      await form.current.trigger('description');
    });

    expect(
      screen.getByText(
        t('rectificationForm:errors:description-over-limit')
      )
    ).toBeVisible();
  });
});
