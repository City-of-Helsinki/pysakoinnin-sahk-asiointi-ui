import React from 'react';
import { Linkbox } from 'hds-react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const LandingPage = (): React.ReactElement => {
  const { t } = useTranslation();
  const links = [
    { name: 'due-date', value: '/erapaivansiirto' },
    { name: 'parking-fine', value: '/virhemaksu' },
    { name: 'moved-car', value: '/ajoneuvonsiirto' }
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
    </>
  );
};

export default LandingPage;
