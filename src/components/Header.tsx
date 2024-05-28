import React, { useState } from 'react';
import {
  IconSignout,
  Logo,
  logoFi,
  logoSv,
  Header as HDSHeader,
  IconUser,
  IconCross,
  Link
} from 'hds-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClient } from '../client/hooks';
import styles from './styles.module.css';
import config from '../config';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';
import { Language, changeLanguage } from '../common';

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

  const languageOptions = React.useMemo(() => {
    const languageLabels = {
      fi: 'Suomi',
      en: 'English',
      sv: 'Svenska'
    };

    return Object.values(Language).map(language => ({
      label: languageLabels[language],
      value: language
    }));
  }, []);

  return (
    <HDSHeader
      className="hide-on-print"
      theme={'light'}
      onDidChangeLanguage={lang => changeLanguage(lang as Language)}
      languages={languageOptions}
      defaultLanguage={i18n.language}>
      <HDSHeader.SkipLink
        skipTo="#content"
        label={t('common:skip-to-content-label')}
      />
      <HDSHeader.ActionBar
        title={title}
        titleHref="/"
        logoHref="/"
        frontPageLabel={t('common:frontpage')}
        logo={
          <Logo
            src={i18n.language === 'sv' ? logoSv : logoFi}
            alt={t('navigation.logo')}
            size="full"
          />
        }
        menuButtonAriaLabel={t('navigation.menuToggleAriaLabel')}>
        <HDSHeader.LanguageSelector ariaLabel={i18n.language.toUpperCase()} />
        {initialized && authenticated && (
          <HDSHeader.ActionBarItem
            fixedRightPosition
            id="action-bar-user"
            icon={<IconUser ariaHidden />}
            closeIcon={<IconCross ariaHidden />}
            closeLabel={t('common:close')}
            label={userName}>
            <div className={styles['action-bar-item-list']}>
              <Link
                external
                href={`${config.ui.profileUIUrl}/loginsso`}
                className={styles['link-to-profile']}>
                Helsinki-profiili
              </Link>
              <Link
                href="/logout"
                onClick={(): void => client.logout()}
                className={styles.navigationButton}
                iconLeft={<IconSignout ariaHidden />}>
                {t('common:log-out')}
              </Link>
            </div>
          </HDSHeader.ActionBarItem>
        )}
      </HDSHeader.ActionBar>
      <HDSHeader.NavigationMenu>
        <HDSHeader.Link
          key="frontpage"
          active={active === 'frontpage'}
          label={t('common:frontpage')}
          tabIndex={0}
          onClick={(): void => {
            setActive('frontpage');
            navigate('/');
          }}
          data-test-id="header-link-frontpage"
        />
      </HDSHeader.NavigationMenu>
    </HDSHeader>
  );
};

export default Header;
