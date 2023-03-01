import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../utils/i18n';
import LandingPage from './LandingPage';
import { Provider } from 'react-redux';
import store from '../../store';
import '@testing-library/jest-dom';
import { t } from 'i18next';
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

describe('landing page', () => {
  test('passes a11y validation', async () => {
    const { container } = render(
      <Provider store={store}>
        <LandingPage />
      </Provider>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  describe('renders ', () => {
    test('links correctly', async () => {
      render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LandingPage />
          </I18nextProvider>
        </Provider>
      );

      // Linkboxes are visible
      expect(
        screen.getByRole('heading', {
          name: t('landing-page:links:due-date')
        })
      ).toBeVisible();
      expect(
        screen.getByRole('link', {
          name: `${t('landing-page:links:due-date')}.`
        })
      ).toBeVisible();

      expect(
        screen.getByRole('heading', {
          name: t('landing-page:links:parking-fine')
        })
      ).toBeVisible();
      expect(
        screen.getByRole('link', {
          name: `${t('landing-page:links:parking-fine')}.`
        })
      ).toBeVisible();

      expect(
        screen.getByRole('heading', {
          name: t('landing-page:links:moved-car')
        })
      ).toBeVisible();
      expect(
        screen.getByRole('link', {
          name: `${t('landing-page:links:moved-car')}.`
        })
      ).toBeVisible();
    });

    test('list of rectification forms correctly', async () => {
      const scrollIntoViewMock = jest.fn();
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

      const { container } = render(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <LandingPage />
          </I18nextProvider>
        </Provider>
      );
      // Title
      expect(
        screen.getByRole('heading', {
          name: t('landing-page:list:title')
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
      expect(rectificationList[0]).toHaveTextContent(
        /Viimeksi muokattu 11.2.2023/
      );

      // 7 results in total, 5 results shown on the main page
      expect(rectificationList.length).toBe(5);

      const nextPagebutton = screen.getByTestId('hds-pagination-next-button');
      expect(nextPagebutton).toBeVisible();
      fireEvent.click(nextPagebutton);

      // 2 results on the second page
      expect(rectificationList.length).toBe(2);
    });
  });

  test('sorts results correctly by date', async () => {
    const renderResult = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LandingPage />
        </I18nextProvider>
      </Provider>
    );
    const { container } = renderResult;

    // Get all rectification forms
    const rectificationList = container.getElementsByClassName(
      'rectification-list-row'
    );

    // Sorting results by date
    const sortButton = screen.getByTestId('rectification-list-sort-button');
    expect(sortButton).toBeVisible();
    expect(sortButton).toHaveTextContent(t('landing-page:newest-first'));

    expect(rectificationList[0]).toHaveTextContent(
      /Viimeksi muokattu 11.2.2023/
    );

    // 'Sort by date' button is clicked
    fireEvent.click(sortButton);

    expect(sortButton).toHaveTextContent(t('landing-page:oldest-first'));
    expect(rectificationList.length).toBe(5);
    expect(rectificationList[0]).toHaveTextContent(
      /Viimeksi muokattu 20.11.2021/
    );
  });

  test('filters results correctly by status', async () => {
    const renderResult = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <LandingPage />
        </I18nextProvider>
      </Provider>
    );
    const { container } = renderResult;

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
      name: t('landing-page:list:status:show-all:default')
    });
    expect(filterButton).toBeVisible();
    fireEvent.click(filterButton);

    // Filter by 'sent' status
    const receivedOption = screen.getAllByText(
      t('landing-page:list:status:sent:default') as string
    )[0];
    fireEvent.click(receivedOption);

    expect(rectificationList.length).toBe(1);
    expect(rectificationList[0]).toHaveTextContent(
      t('landing-page:list:status:sent:default')
    );
    expect(rectificationCounter).toHaveTextContent(
      `1 ${t('landing-page:list:status:sent:conjugated')}`
    );

    const receivedFilterButton = screen.getByRole('button', {
      name: t('landing-page:list:status:sent:default')
    });
    fireEvent.click(receivedFilterButton);

    // Filter by 'processing' status
    const processingOption = screen.getAllByText(
      t('landing-page:list:status:processing:default') as string
    )[0];
    fireEvent.click(processingOption);

    expect(rectificationList.length).toBe(2);
    expect(rectificationList[0]).toHaveTextContent(
      t('landing-page:list:status:processing:default')
    );
    expect(rectificationCounter).toHaveTextContent(
      `2 ${t('landing-page:list:status:processing:conjugated')}`
    );
  });
});
