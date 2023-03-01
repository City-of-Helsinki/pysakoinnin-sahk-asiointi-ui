/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import RectificationListRow from './RectificationListRow';
import mockRectificationList from '../../mocks/mockRectificationList';
import { Provider } from 'react-redux';
import store from '../../store';
import '@testing-library/jest-dom';
import { t } from 'i18next';

describe('rectification list row', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationListRow form={mockRectificationList[0]} />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders', () => {
    test('solved (mailed) rectification form details correctly', async () => {
      const { container } = render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RectificationListRow form={mockRectificationList[0]} />
          </I18nextProvider>
        </Provider>
      );

      const status = container.getElementsByClassName(
        'rectification-list-row-status'
      )[0];
      expect(status).toHaveTextContent(
        t('landing-page:list:status:solved-mailed:default')
      );

      const showMoreButton = screen.getByRole('button', {
        name: t('landing-page:list:show-more')
      });
      expect(showMoreButton).toBeVisible();

      // Details not visible before 'show more' button is clicked
      const details = container.getElementsByClassName('rectification-details');
      expect(details.length).toBe(0);

      const events = container.getElementsByClassName(
        'rectification-details-events'
      );
      expect(events.length).toBe(0);

      const attachments = container.getElementsByClassName(
        'rectification-details-attachments'
      );
      expect(attachments.length).toBe(0);

      fireEvent.click(showMoreButton);

      // Details visible and contain right content
      expect(details.length).toBe(1);

      // Events
      expect(events.length).toBe(1);
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:status:sent:default')
      );
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:status:processing:default')
      );
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:status:received:default')
      );
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:status:solved-mailed:default')
      );

      // Attachments
      expect(attachments.length).toBe(1);
      expect(attachments[0]).toHaveTextContent(
        'long-file-name-for-testing-abcd-efgh-ijkl.png'
      );
      expect(attachments[0]).toHaveTextContent('test-image2.jpg');
      expect(attachments[0]).toHaveTextContent('test-file1.pdf');

      // Notification
      const mailNotification = screen.getByRole('region', {
        name: 'Notification'
      });
      expect(mailNotification).toBeVisible();
      expect(mailNotification).toHaveTextContent(
        t('landing-page:list:details:mailed-notification:text')
      );

      // 'Show form' button is visible but 'open decision' button is not
      const showFormButton = screen.getByRole('button', {
        name: t('landing-page:list:details:show-form')
      });
      expect(showFormButton).toBeVisible();

      const openDecisionButton = screen.queryByRole('button', {
        name: t('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).not.toBeInTheDocument();
    });

    test('solved (online) rectification form details correctly', async () => {
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RectificationListRow form={mockRectificationList[4]} />
          </I18nextProvider>
        </Provider>
      );

      const showMoreButton = screen.getByRole('button', {
        name: t('landing-page:list:show-more')
      });
      expect(showMoreButton).toBeVisible();

      fireEvent.click(showMoreButton);

      // No notifications visible
      const notification = screen.queryByRole('region', {
        name: 'Notification'
      });
      expect(notification).not.toBeInTheDocument();

      // Both buttons visible
      const showFormButton = screen.getByRole('button', {
        name: t('landing-page:list:details:show-form')
      });
      expect(showFormButton).toBeVisible();

      const openDecisionButton = screen.getByRole('button', {
        name: t('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).toBeVisible();
    });

    test('rectification form that is being processed correctly', async () => {
      const { container } = render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RectificationListRow form={mockRectificationList[5]} />
          </I18nextProvider>
        </Provider>
      );
      const showMoreButton = screen.getByRole('button', {
        name: t('landing-page:list:show-more')
      });
      expect(showMoreButton).toBeVisible();

      fireEvent.click(showMoreButton);

      // No notifications visible
      const notification = screen.queryByRole('region', {
        name: 'Notification'
      });
      expect(notification).not.toBeInTheDocument();

      // 'Show form' button is visible but 'open decision' button is not
      const showFormButton = screen.getByRole('button', {
        name: t('landing-page:list:details:show-form')
      });
      expect(showFormButton).toBeVisible();

      const openDecisionButton = screen.queryByRole('button', {
        name: t('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).not.toBeInTheDocument();

      // Events and attachments empty when there is no data
      const events = container.getElementsByClassName(
        'rectification-details-events'
      );
      expect(events.length).toBe(1);
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:details:events')
      );

      const attachments = container.getElementsByClassName(
        'rectification-details-attachments'
      );
      expect(attachments.length).toBe(1);
      expect(attachments[0]).toHaveTextContent(
        t('landing-page:list:details:attachments')
      );
    });

    test('due date form details correctly', async () => {
      const { container } = render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <RectificationListRow form={mockRectificationList[6]} />
          </I18nextProvider>
        </Provider>
      );

      const status = container.getElementsByClassName(
        'rectification-list-row-status'
      )[0];
      expect(status).toHaveTextContent(
        t('landing-page:list:status:received:default')
      );

      const showMoreButton = screen.getByRole('button', {
        name: t('landing-page:list:show-more')
      });
      expect(showMoreButton).toBeVisible();

      // Details not visible before 'show form' button is clicked
      const details = container.getElementsByClassName('rectification-details');
      expect(details.length).toBe(0);

      const events = container.getElementsByClassName(
        'rectification-details-events'
      );
      expect(events.length).toBe(0);

      const attachments = container.getElementsByClassName(
        'rectification-details-attachments'
      );
      expect(attachments.length).toBe(0);

      fireEvent.click(showMoreButton);

      // Details visible and contain right content
      expect(details.length).toBe(1);

      // Events
      expect(events.length).toBe(1);
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:status:sent:default')
      );
      expect(events[0]).toHaveTextContent(
        t('landing-page:list:status:received:default')
      );

      // Attachments should be empty and title not visible
      expect(attachments.length).toBe(0);

      // Notification
      const mailNotification = screen.getByRole('region', {
        name: 'Notification'
      });
      expect(mailNotification).toBeVisible();
      expect(mailNotification).toHaveTextContent(
        /Eräpäivää on siirretty 30 päivällä./
      );

      // Buttons not visible
      const showFormButton = screen.queryByRole('button', {
        name: t('landing-page:list:details:show-form')
      });
      expect(showFormButton).not.toBeInTheDocument();

      const openDecisionButton = screen.queryByRole('button', {
        name: t('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).not.toBeInTheDocument();
    });
  });
});
