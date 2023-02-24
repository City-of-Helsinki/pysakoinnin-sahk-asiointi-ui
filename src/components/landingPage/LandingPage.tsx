import React, { useRef, useState, MouseEvent } from 'react';
import { Button, IconSort, Linkbox, Pagination, Select } from 'hds-react';
import { useTranslation } from 'react-i18next';
import RectificationListRow from '../rectificationListRow/RectificationListRow';
import mockRectificationList from '../../mocks/mockRectificationList'; /* use mock data for now */
import './LandingPage.css';

type StatusFilter = {
  value: string;
  label: string;
};

const LandingPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const [pageIndex, setPageIndex] = useState(0);
  const [sortByNewest, setSortByNewest] = useState(true);
  const elementsOnPage = 5;
  const titleRef = useRef<null | HTMLDivElement>(null);
  const [filter, setFilter] = useState({
    value: 'show-all',
    label: t('landing-page:list.status:show-all:default')
  });
  const isEmptyList = mockRectificationList.length === 0;
  const filteredRectifications = mockRectificationList.filter(a =>
    filter.value !== 'show-all' ? a.status === filter.value : a
  );
  const links = [
    { name: 'due-date', value: '/erapaivansiirto' },
    { name: 'parking-fine', value: '/virhemaksu' },
    { name: 'moved-car', value: '/ajoneuvonsiirto' }
  ];
  const statuses = [
    'show-all',
    'received',
    'sent',
    'processing',
    'solved-online',
    'solved-mailed'
  ];
  const options = statuses.map(status => ({
    value: status,
    label: t(`landing-page:list:status:${status}:default`)
  }));

  const handlePageChange = (event: MouseEvent, index: number) => {
    event.preventDefault();
    setPageIndex(index);
    titleRef.current?.scrollIntoView();
  };

  const sortByDate = (a: string, b: string) =>
    sortByNewest
      ? Date.parse(b) - Date.parse(a)
      : Date.parse(a) - Date.parse(b);

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
          <b>{filteredRectifications.length}</b>{' '}
          {t(`landing-page:list:status:${filter.value}:conjugated`)}
        </p>
        <Button
          className="rectification-list-sort-button"
          data-testid="rectification-list-sort-button"
          variant="supplementary"
          size="small"
          iconRight={<IconSort />}
          disabled={isEmptyList}
          onClick={() => setSortByNewest(!sortByNewest)}>
          {sortByNewest
            ? t('landing-page:newest-first')
            : t('landing-page:oldest-first')}
        </Button>
        <Select
          className={`rectification-list-filter-selector ${
            isEmptyList ? 'disabled' : ''
          }`}
          label=""
          options={options}
          value={{
            label: filter.label,
            value: filter.value
          }}
          disabled={isEmptyList}
          onChange={(option: StatusFilter) => setFilter(option)}
        />
      </div>
      <div className="rectification-list">
        <hr />
        {filteredRectifications
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
      {isEmptyList && (
        <p className="disabled-text">{t('landing-page:list:no-forms')}</p>
      )}
      <Pagination
        language="fi"
        onChange={(event, index) => handlePageChange(event, index)}
        pageCount={Math.ceil(filteredRectifications.length / elementsOnPage)}
        pageHref={() => '#'}
        pageIndex={pageIndex}
        paginationAriaLabel="pagination"
        siblingCount={2}
      />
    </>
  );
};

export default LandingPage;
