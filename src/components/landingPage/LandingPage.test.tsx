import axios from 'axios';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import LandingPage from './LandingPage';
import { Provider } from 'react-redux';
import store from '../../store';
import { t } from 'i18next';
import { mockObjectionDocumentResponse } from '../../mocks/mockObjectionDocumentList';
import { Mocked } from 'vitest';
import { mockAuthenticatedLoginState } from '../../utils/mockLoginHooks';
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

vi.mock('axios');

const mockedAxios = axios as Mocked<typeof axios>;

describe('landing page', () => {
  beforeEach(async () => {
    mockAuthenticatedLoginState();
    mockedAxios.get.mockResolvedValueOnce({
      data: mockObjectionDocumentResponse
    });
  });

  test('passes a11y validation', async () => {
    const { container } = await waitFor(async () =>
      render(
        <Provider store={store}>
          <LandingPage />
        </Provider>
      )
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders ', () => {
    test('links correctly', async () => {
      await waitFor(() =>
        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <LandingPage />
            </I18nextProvider>
          </Provider>
        )
      );
      // Linkboxes are visible
      expect(
        screen.getByRole('heading', {
          name: t<string>('landing-page:links:due-date')
        })
      ).toBeVisible();
      expect(
        screen.getByRole('link', {
          name: `${t('landing-page:links:due-date')}.`
        })
      ).toBeVisible();

      expect(
        screen.getByRole('heading', {
          name: t<string>('landing-page:links:parking-fine')
        })
      ).toBeVisible();
      expect(
        screen.getByRole('link', {
          name: `${t('landing-page:links:parking-fine')}.`
        })
      ).toBeVisible();

      expect(
        screen.getByRole('heading', {
          name: t<string>('landing-page:links:moved-car')
        })
      ).toBeVisible();
      expect(
        screen.getByRole('link', {
          name: `${t('landing-page:links:moved-car')}.`
        })
      ).toBeVisible();
    });

    test('list of rectification forms correctly', async () => {
      const scrollIntoViewMock = vi.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

      const { container } = await waitFor(() =>
        render(
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <LandingPage />
            </I18nextProvider>
          </Provider>
        )
      );
      // Title
      expect(
        screen.getByRole('heading', {
          name: t<string>('landing-page:list:title')
        })
      ).toBeVisible();

      // Get all rectification forms
      const rectificationList = container.getElementsByClassName(
        'rectification-list-row'
      );

      // Check that the first element has required properties
      expect(rectificationList[0]).toHaveTextContent(
        /Oikaisuvaatimus pysäköintivirhemaksuun/
      );
      expect(rectificationList[0]).toHaveTextContent(/23456789/);
      expect(rectificationList[0]).toHaveTextContent(/Vastaanotettu/);
      expect(rectificationList[0]).toHaveTextContent(/11.2.2023/);

      // 7 results in total, 5 results shown on the main page
      expect(rectificationList.length).toBe(5);

      const nextPageButton = screen.getByTestId('hds-pagination-next-button');
      expect(nextPageButton).toBeVisible();
      fireEvent.click(nextPageButton);

      // 2 results on the second page
      expect(rectificationList.length).toBe(2);
    });
  });

  test('sorts results correctly by date', async () => {
    const { container } = await waitFor(() =>
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LandingPage />
          </I18nextProvider>
        </Provider>
      )
    );

    // Get all rectification forms
    const rectificationList = container.getElementsByClassName(
      'rectification-list-row'
    );

    // Sorting results by date
    const sortButton = screen.getByTestId('rectification-list-sort-button');
    expect(sortButton).toBeVisible();
    expect(sortButton).toHaveTextContent(
      t<string>('landing-page:newest-first')
    );

    expect(rectificationList[0]).toHaveTextContent(/11.2.2023/);

    // 'Sort by date' button is clicked
    fireEvent.click(sortButton);

    expect(sortButton).toHaveTextContent(
      t<string>('landing-page:oldest-first')
    );
    expect(rectificationList.length).toBe(5);
    expect(rectificationList[0]).toHaveTextContent(/20.11.2021/);
  });

  test('filters results correctly by status', async () => {
    const { container } = await waitFor(() =>
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LandingPage />
          </I18nextProvider>
        </Provider>
      )
    );

    // Get all rectification forms
    const rectificationList = container.getElementsByClassName(
      'rectification-list-row'
    );

    const rectificationCounter = container.getElementsByClassName(
      'rectification-list-sent-count'
    )[0];
    expect(rectificationCounter).toHaveTextContent(
      `7 ${t('landing-page:list:status:show-all:conjugated')}`
    );

    // Open dropdown menu
    const filterButton = screen.getByRole('button', {
      name: t<string>('landing-page:list:status:show-all:default')
    });
    expect(filterButton).toBeVisible();
    fireEvent.click(filterButton);

    // Filter by 'sent' status
    const sentOption = screen.getAllByText(
      t('landing-page:list:status:sent:default') as string
    )[0];

    fireEvent.click(sentOption);

    expect(rectificationList.length).toBe(2);
    expect(rectificationList[0]).toHaveTextContent(
      t<string>('landing-page:list:status:sent:default')
    );
    expect(rectificationCounter).toHaveTextContent(
      `2 ${t('landing-page:list:status:sent:conjugated')}`
    );

    const sentFilterButton = screen.getByRole('button', {
      name: t<string>('landing-page:list:status:sent:default')
    });
    fireEvent.click(sentFilterButton);

    // Filter by 'handling' status
    const handlingOption = screen.getAllByText(
      t('landing-page:list:status:handling:default') as string
    )[0];
    fireEvent.click(handlingOption);

    expect(rectificationList.length).toBe(1);
    expect(rectificationList[0]).toHaveTextContent(
      t<string>('landing-page:list:status:handling:default')
    );
    expect(rectificationCounter).toHaveTextContent(
      `1 ${t('landing-page:list:status:handling:conjugated')}`
    );
  });

  test('filters results correctly by status after page is changed', async () => {
    const { container } = await waitFor(() =>
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LandingPage />
          </I18nextProvider>
        </Provider>
      )
    );

    // Get all rectification forms
    const rectificationList = container.getElementsByClassName(
      'rectification-list-row'
    );

    // Click the 'next page' button
    const nextPageButton = screen.getByTestId('hds-pagination-next-button');
    expect(nextPageButton).toBeVisible();
    fireEvent.click(nextPageButton);

    // Filter results

    // Open dropdown menu
    const filterButton = screen.getByRole('button', {
      name: t<string>('landing-page:list:status:show-all:default')
    });
    expect(filterButton).toBeVisible();
    fireEvent.click(filterButton);

    // Filter by 'solved (mailed)' status
    const solvedMailedOption = screen.getAllByText(
      t('landing-page:list:status:resolvedViaMail:default') as string
    )[0];
    fireEvent.click(solvedMailedOption);

    // 1 result should be shown
    expect(rectificationList.length).toBe(1);

    const rectificationCounter = container.getElementsByClassName(
      'rectification-list-sent-count'
    )[0];
    expect(rectificationCounter).toHaveTextContent(
      `1 ${t('landing-page:list:status:resolvedViaMail:conjugated')}`
    );
  });

  test('shows error message', async () => {
    vi.resetAllMocks();
    mockAuthenticatedLoginState();
    mockedAxios.get.mockRejectedValue(new Error('Mock Error!'));

    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LandingPage />
        </I18nextProvider>
      </Provider>
    );

    expect(
      await screen.findByText('Tietojen lataaminen epäonnistui')
    ).toBeInTheDocument();
  });
});
