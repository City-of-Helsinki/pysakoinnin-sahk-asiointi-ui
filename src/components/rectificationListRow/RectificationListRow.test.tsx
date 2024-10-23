/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import RectificationListRow from './RectificationListRow';
import mockObjectionDocumentList from '../../mocks/mockObjectionDocumentList';
import mockFoulDataWithDecision from '../../mocks/mockFoulDataWithDecision';
import { Provider } from 'react-redux';
import store from '../../store';
import { t } from 'i18next';
import axios from 'axios';
import { Mocked } from 'vitest';
import { mockAuthenticatedLoginState } from '../../utils/mockLoginHooks';

vi.mock('axios');

const mockedAxios = axios as Mocked<typeof axios>;

describe('rectification list row', () => {
  beforeEach(async () => {
    mockAuthenticatedLoginState();
    mockedAxios.get.mockResolvedValueOnce({
      data: mockFoulDataWithDecision
    });
  });

  test('passes a11y validation', async () => {
    const { container } = await waitFor(async () =>
      render(
        <Provider store={store}>
          <RectificationListRow form={mockObjectionDocumentList[0]} />
        </Provider>
      )
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders', () => {
    test('solved (mailed) rectification form details correctly', async () => {
      const { container } = await waitFor(async () =>
        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <RectificationListRow form={mockObjectionDocumentList[0]} />
            </I18nextProvider>
          </Provider>
        )
      );

      const status = container.getElementsByClassName(
        'rectification-list-row-status'
      )[0];
      expect(status).toHaveTextContent(
        t<string>('landing-page:list:status:resolvedViaMail:default')
      );

      const showMoreButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:show-more')
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

      await waitFor(async () => fireEvent.click(showMoreButton));

      // Details visible and contain right content
      expect(details.length).toBe(1);

      // Events
      expect(events.length).toBe(1);
      expect(events[0]).toHaveTextContent(
        t<string>('landing-page:list:status:sent:default')
      );
      expect(events[0]).toHaveTextContent(
        t<string>('landing-page:list:status:handling:default')
      );
      expect(events[0]).toHaveTextContent(
        t<string>('landing-page:list:status:received:default')
      );
      expect(events[0]).toHaveTextContent(
        t<string>('landing-page:list:status:resolvedViaMail:default')
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
        t<string>('landing-page:list:details:notification:resolvedViaMail:text')
      );

      // 'Show form' button is visible but 'open decision' button is not
      const showFormButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:details:show-form')
      });
      expect(showFormButton).toBeVisible();

      const openDecisionButton = screen.queryByRole('button', {
        name: t<string>('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).not.toBeInTheDocument();
    });

    test('solved (online) rectification form details correctly', async () => {
      await waitFor(async () =>
        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <RectificationListRow form={mockObjectionDocumentList[4]} />
            </I18nextProvider>
          </Provider>
        )
      );

      const showMoreButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:show-more')
      });
      expect(showMoreButton).toBeVisible();

      await waitFor(async () => fireEvent.click(showMoreButton));

      // No notifications visible
      const notification = screen.queryByRole('region', {
        name: 'Notification'
      });
      expect(notification).not.toBeInTheDocument();

      // Both buttons visible
      const showFormButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:details:show-form')
      });
      expect(showFormButton).toBeVisible();

      const openDecisionButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).toBeVisible();
    });

    test('rectification form that is being processed correctly', async () => {
      const { container } = await waitFor(async () =>
        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <RectificationListRow form={mockObjectionDocumentList[5]} />
            </I18nextProvider>
          </Provider>
        )
      );

      const showMoreButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:show-more')
      });
      expect(showMoreButton).toBeVisible();

      await waitFor(async () => fireEvent.click(showMoreButton));

      // No notifications visible
      const notification = screen.queryByRole('region', {
        name: 'Notification'
      });
      expect(notification).not.toBeInTheDocument();

      // 'Show form' button is visible but 'open decision' button is not
      const showFormButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:details:show-form')
      });
      expect(showFormButton).toBeVisible();

      const openDecisionButton = screen.queryByRole('button', {
        name: t<string>('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).not.toBeInTheDocument();

      // Events and attachments empty when there is no data
      const events = container.getElementsByClassName(
        'rectification-details-events'
      );
      expect(events.length).toBe(1);
      expect(events[0]).toHaveTextContent(
        t<string>('landing-page:list:details:events')
      );

      const attachments = container.getElementsByClassName(
        'rectification-details-attachments'
      );
      expect(attachments.length).toBe(1);
      expect(attachments[0]).toHaveTextContent(
        t<string>('landing-page:list:details:attachments')
      );
    });

    test('due date form details correctly', async () => {
      const { container } = await waitFor(async () =>
        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <RectificationListRow form={mockObjectionDocumentList[2]} />
            </I18nextProvider>
          </Provider>
        )
      );

      const status = container.getElementsByClassName(
        'rectification-list-row-status'
      )[0];
      expect(status).toHaveTextContent(
        t<string>('landing-page:list:status:sent:default')
      );

      const showMoreButton = screen.getByRole('button', {
        name: t<string>('landing-page:list:show-more')
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

      await waitFor(async () => fireEvent.click(showMoreButton));

      // Details visible and contain right content
      expect(details.length).toBe(1);

      // Events
      expect(events.length).toBe(1);
      expect(events[0]).toHaveTextContent(
        t<string>('landing-page:list:status:sent:default')
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
        name: t<string>('landing-page:list:details:show-form')
      });
      expect(showFormButton).not.toBeInTheDocument();

      const openDecisionButton = screen.queryByRole('button', {
        name: t<string>('landing-page:list:details:open-decision')
      });
      expect(openDecisionButton).not.toBeInTheDocument();
    });
  });
});
