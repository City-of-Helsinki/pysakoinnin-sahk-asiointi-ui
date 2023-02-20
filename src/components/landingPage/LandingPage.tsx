import React, { useRef, useState, MouseEvent } from 'react';
import {
  Button,
  IconAngleDown,
  IconSort,
  Linkbox,
  Pagination
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import RectificationListRow from '../rectificationListRow/RectificationListRow';
import './LandingPage.css';
/* eslint-disable sonarjs/no-duplicate-string */

const LandingPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const [pageIndex, setPageIndex] = useState(0);
  const [sortByNewest, setSortByNewest] = useState(true);
  const elementsOnPage = 5;
  const titleRef = useRef<null | HTMLDivElement>(null);
  const links = [
    { name: 'due-date', value: '/erapaivansiirto' },
    { name: 'parking-fine', value: '/virhemaksu' },
    { name: 'moved-car', value: '/ajoneuvonsiirto' }
  ];

  const handlePageChange = (event: MouseEvent, index: number) => {
    event.preventDefault();
    setPageIndex(index);
    titleRef.current?.scrollIntoView();
  };

  const sortByDate = (a: string, b: string) =>
    sortByNewest
      ? Date.parse(b) - Date.parse(a)
      : Date.parse(a) - Date.parse(b);

  const rectificationForms = [
    {
      id: 12345678,
      type: 'parking-fine',
      status: 'solved-mailed',
      edited: '2022-12-01'
    },
    {
      id: 23456789,
      type: 'parking-fine',
      status: 'received',
      edited: '2023-02-11'
    },
    {
      id: 34567890,
      type: 'due-date',
      status: 'processing',
      edited: '2023-02-11'
    },
    {
      id: 45678901,
      type: 'moved-car',
      status: 'sent',
      edited: '2023-02-01'
    },
    {
      id: 56789012,
      type: 'moved-car',
      status: 'solved-online',
      edited: '2023-02-01'
    },
    {
      id: 67890123,
      type: 'parking-fine',
      status: 'processing',
      edited: '2023-02-11'
    },
    {
      id: 78901234,
      type: 'due-date',
      status: 'solved-online',
      edited: '2022-11-20'
    }
  ];

  return (
    <>
      <div className="landing-page-link-list">
        {links.map(link => (
          <Linkbox
            key={link.name}
            className="landing-page-linkbox"
            linkboxAriaLabel={`Linkbox: ${t(
              `landing-page:links:${link.name}`
            )}`}
            linkAriaLabel={t(`landing-page:links:${link.name}`)}
            href={link.value}
            heading={t(`landing-page:links:${link.name}`)}
          />
        ))}
      </div>
      <h2 ref={titleRef}>{t('landing-page:list:title')}</h2>
      <div className="rectification-list-filters">
        <p className="rectification-list-sent-count">
          <b>{rectificationForms.length}</b> {t('landing-page:sent')}
        </p>
        <Button
          className="rectification-list-sort-date"
          variant="supplementary"
          size="small"
          iconRight={<IconSort />}
          onClick={() => setSortByNewest(!sortByNewest)}>
          {sortByNewest
            ? t('landing-page:newest-first')
            : t('landing-page:oldest-first')}
        </Button>
        <Button
          className="rectification-list-filter-selector"
          variant="supplementary"
          size="small"
          iconRight={<IconAngleDown />}
          //onClick={() => {}}
        >
          {t('landing-page:show-all')}
        </Button>
      </div>
      <div className="rectification-list">
        <hr />
        {rectificationForms
          .sort((a, b) => sortByDate(a.edited, b.edited))
          .slice(
            pageIndex * elementsOnPage,
            pageIndex * elementsOnPage + elementsOnPage
          )
          .map(form => (
            <div key={form.id}>
              <RectificationListRow form={form} />
              <hr />
            </div>
          ))}
      </div>
      <Pagination
        language="fi"
        onChange={(event, index) => handlePageChange(event, index)}
        pageCount={Math.ceil(rectificationForms.length / elementsOnPage)}
        pageHref={() => '#'}
        pageIndex={pageIndex}
        paginationAriaLabel="pagination"
        siblingCount={2}
      />
    </>
  );
};

export default LandingPage;
