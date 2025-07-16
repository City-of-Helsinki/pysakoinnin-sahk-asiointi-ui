/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import RectificationListDetails from './RectificationListDetails';
import mockObjectionDocumentList from '../../mocks/mockObjectionDocumentList';
import { Provider } from 'react-redux';
import store from '../../store';
import { t } from 'i18next';
import { FormId } from '../formContent/formContentSlice';

describe('rectification list details', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationListDetails
          form={mockObjectionDocumentList[0]}
          formType={FormId.PARKINGFINE}
        />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
  test('renders form summary dialog correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <RectificationListDetails
            form={mockObjectionDocumentList[0]}
            formType={FormId.PARKINGFINE}
          />
        </I18nextProvider>
      </Provider>
    );

    // Dialog visible only after 'show form' button is clicked
    let rectificationSummaryDialog = screen.queryByRole('dialog');
    expect(rectificationSummaryDialog).not.toBeInTheDocument();

    const showFormButton = screen.getByRole('button', {
      name: t('landing-page:list:details:show-form')
    });
    expect(showFormButton).toBeVisible();
    fireEvent.click(showFormButton);

    rectificationSummaryDialog = screen.getByRole('dialog');
    expect(rectificationSummaryDialog).toBeVisible();

    // Rectification summary visible inside dialog
    const rectificationSummaryContent = container.getElementsByClassName(
      'rectification-summary-container'
    )[0];
    expect(rectificationSummaryContent).toBeVisible();

    // Dialog buttons visible
    let closeButton = screen.getByRole('button', {
      name: t('common:close')
    });
    const printButton = screen.getByRole('button', {
      name: t('common:print')
    });
    expect(closeButton).toBeVisible();
    expect(printButton).toBeVisible();

    // Dialog can be closed by clicking the small 'x' button or bigger 'close' button
    const closeButtonSmall = screen.getByLabelText(
      t('common:close-rectification-dialog') as string
    );
    expect(closeButtonSmall).toBeVisible();
    fireEvent.click(closeButtonSmall);

    rectificationSummaryDialog = screen.queryByRole('dialog');
    expect(rectificationSummaryDialog).not.toBeInTheDocument();

    fireEvent.click(showFormButton);

    rectificationSummaryDialog = screen.getByRole('dialog');
    expect(rectificationSummaryDialog).toBeVisible();

    closeButton = screen.getByRole('button', {
      name: t('common:close')
    });
    fireEvent.click(closeButton);

    rectificationSummaryDialog = screen.queryByRole('dialog');
    expect(rectificationSummaryDialog).not.toBeInTheDocument();
  });
});
