import React, { useState } from 'react';
import { IconSignout, Navigation } from 'hds-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClient } from '../client/hooks';
import styles from './styles.module.css';
import config from '../config';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

type Page =
  | 'frontpage'
  | 'apiAccessTokens'
  | 'userTokens'
  | 'profile'
  | 'userinfo'
  | 'backend';

const Header = (): React.ReactElement => {
  const currentConfig = config.config;
  const pathPrefix = currentConfig.path;
  const client = useClient();
  const authenticated = client.isAuthenticated();
  const initialized = client.isInitialized();
  const user = client.getUser();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.replace(pathPrefix, '');
  const currentPageFromPath: Page =
    path && path.length > 1 ? (path.substr(1) as Page) : 'frontpage';
  const [active, setActive] = useState<Page>(currentPageFromPath);
  const { t } = useTranslation();

  const title = t('common:title');
  document.title = title;
  const userName = user ? `${user.given_name} ${user.family_name}` : '';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    window.location.reload();
  };

  return (
    <Navigation
      className="hide-on-print"
      fixed={false}
      logoLanguage="fi"
      menuToggleAriaLabel="Close menu"
      theme="light"
      title={title}
      titleUrl="/"
      skipTo="#content"
      skipToContentLabel="Skip to main content">
      <Navigation.Row variant="inline">
        <Navigation.Item
          active={active === 'frontpage'}
          label={t('common:frontpage')}
          key="frontpage"
          tabIndex={0}
          onClick={(): void => {
            setActive('frontpage');
            navigate('/');
          }}
          data-test-id="header-link-frontpage"
        />
      </Navigation.Row>
      <Navigation.Actions>
        {initialized && (
          <Navigation.User
            authenticated={authenticated}
            label="Kirjaudu sisään"
            onSignIn={(): void => client.login()}
            userName={userName}>
            <Navigation.Item
              href={`${config.ui.profileUIUrl}/loginsso`}
              label="Helsinki-profiili"
              target="_blank"
              className={styles['link-to-profile']}
            />
            <Navigation.Item
              onClick={(): void => client.logout()}
              variant="supplementary"
              label={t('common:log-out')}
              href="/logout"
              className={styles.navigationButton}
              icon={<IconSignout aria-hidden />}
            />
          </Navigation.User>
        )}
        <Navigation.LanguageSelector label={i18n.language.toUpperCase()}>
          <Navigation.Item
            onClick={() => changeLanguage('fi')}
            label="Suomi"
            lang="fi"
          />
          <Navigation.Item
            onClick={() => changeLanguage('en')}
            label="English"
            lang="en"
          />
          <Navigation.Item
            onClick={() => changeLanguage('sv')}
            label="Svenska"
            lang="sv"
          />
        </Navigation.LanguageSelector>
      </Navigation.Actions>
    </Navigation>
  );
};

export default Header;
