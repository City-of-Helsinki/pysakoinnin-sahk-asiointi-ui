import React from 'react';
import {
  IconSignout,
  Logo,
  logoFi,
  logoSv,
  Header as HDSHeader,
  IconUser,
  IconCross,
  Link,
  IconSignin,
  useOidcClient,
  WithAuthentication,
  useOidcClientTracking,
  useGraphQL
} from 'hds-react';
import styles from './styles.module.css';
import config from '../config';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';
import { Language, changeLanguage, ProfileQueryResult } from '../common';
import { NormalizedCacheObject } from '@apollo/client';

const LoggedInActionBarItem = () => {
  const { t } = useTranslation();
  const client = useOidcClient();
  const [, { data }] = useGraphQL<NormalizedCacheObject, ProfileQueryResult>();
  const profile = data?.myProfile;
  const userName = profile ? `${profile.firstName} ${profile.lastName}` : '';

  return (
    <HDSHeader.ActionBarItem
      fixedRightPosition
      id="action-bar-user"
      icon={<IconUser aria-hidden />}
      closeIcon={<IconCross aria-hidden />}
      closeLabel={t<string>('common:close')}
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
          onClick={(e): void => {
            e.preventDefault();

            client.logout();
          }}
          className={styles.navigationButton}
          iconLeft={<IconSignout aria-hidden />}>
          {t('common:log-out')}
        </Link>
      </div>
    </HDSHeader.ActionBarItem>
  );
};

const UnauthorisedActionBarItem = () => {
  const { t } = useTranslation();
  const client = useOidcClient();
  return (
    <HDSHeader.ActionBarItem
      fixedRightPosition
      icon={<IconSignin aria-hidden />}
      label={t<string>('common:log-in')}
      closeIcon={<IconSignin aria-hidden />}
      closeLabel={t<string>('common:log-in')}
      id="action-bar-sign-in"
      onClick={() =>
        client.login({
          language: localStorage.getItem('lang') ?? i18n.language
        })
      }
    />
  );
};

const Header = (): React.ReactElement => {
  const { t } = useTranslation();

  const title = t('common:title');

  document.title = title;
  useOidcClientTracking();

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
        menuButtonAriaLabel={t<string>('navigation.menuToggleAriaLabel')}>
        <HDSHeader.LanguageSelector ariaLabel={i18n.language.toUpperCase()} />
        <hr aria-hidden="true" />
        <WithAuthentication
          AuthorisedComponent={LoggedInActionBarItem}
          UnauthorisedComponent={UnauthorisedActionBarItem}
        />
      </HDSHeader.ActionBar>
    </HDSHeader>
  );
};

export default Header;
