import React, { useEffect, useRef, useState } from 'react';
import { Button, IconSort, Linkbox, Pagination, Select } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { sortByDate } from '../../utils/helpers';
import RectificationListRow from '../rectificationListRow/RectificationListRow';
import { getDocuments } from '../../services/objectionService';
import { ObjectionDocument } from '../../interfaces/objectionInterfaces';
import './LandingPage.css';
import i18n from 'i18next';

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
  const [documents, setDocuments] = useState<Array<ObjectionDocument>>([]);
  const filteredDocuments = documents.filter(a =>
    filter.value !== 'show-all' ? a.status.value === filter.value : a
  );
  const documentListLength = filteredDocuments.length;
  const isEmptyList = documents.length === 0;
  const isEmptyFilteredList = documentListLength === 0;
  const links = [
    { name: 'due-date', value: '/erapaivansiirto' },
    { name: 'parking-fine', value: '/virhemaksu' },
    { name: 'moved-car', value: '/ajoneuvonsiirto' }
  ];
  const statuses = [
    'show-all',
    'sent',
    'received',
    'handling',
    'resolvedViaEService',
    'resolvedViaMail'
  ];
  const options = statuses.map(status => ({
    value: status,
    label: t(`landing-page:list:status:${status}:default`)
  }));

  const handlePageChange = (index: number) => {
    setPageIndex(index);
    titleRef.current?.scrollIntoView();
  };

  useEffect(() => {
    getDocuments().then(res => setDocuments(res.results));
  }, []);

  type Language = 'en' | 'sv' | 'fi';

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
          <b>{documentListLength}</b>{' '}
          {t(`landing-page:list:status:${filter.value}:conjugated`)}
        </p>
        <Button
          className="rectification-list-sort-button"
          data-testid="rectification-list-sort-button"
          variant="supplementary"
          size="small"
          iconRight={<IconSort />}
          disabled={isEmptyFilteredList}
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
          onChange={(option: StatusFilter) => {
            setFilter(option);
            // Reset the pagination when filtering
            handlePageChange(0);
          }}
        />
      </div>
      <div className="rectification-list">
        <hr />
        {filteredDocuments
          .sort((a, b) => sortByDate(a.updated_at, b.updated_at, sortByNewest))
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
      {isEmptyFilteredList && (
        <p className="disabled-text">{t('landing-page:list:no-forms')}</p>
      )}
      <Pagination
        language={i18n.language as Language}
        onChange={(event, index) => {
          event.preventDefault();
          handlePageChange(index);
        }}
        pageCount={Math.ceil(documentListLength / elementsOnPage)}
        pageHref={() => '#'}
        pageIndex={pageIndex}
        paginationAriaLabel="pagination"
        siblingCount={2}
      />
    </>
  );
};

export default LandingPage;
