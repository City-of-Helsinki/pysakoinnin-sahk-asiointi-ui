import React from 'react';
import { Linkbox } from 'hds-react';
import { useTranslation } from 'react-i18next';
import RectificationListRow from '../rectificationListRow/RectificationListRow';
import './LandingPage.css';
/* eslint-disable sonarjs/no-duplicate-string */

const LandingPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const links = [
    { name: 'due-date', value: '/erapaivansiirto' },
    { name: 'parking-fine', value: '/virhemaksu' },
    { name: 'moved-car', value: '/ajoneuvonsiirto' }
  ];

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
      <h2>{t('landing-page:list:title')}</h2>
      <div className="rectification-list">
        <hr />
        {rectificationForms.map(form => (
          <div key={form.id}>
            <RectificationListRow form={form} />
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
