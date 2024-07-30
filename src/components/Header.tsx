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
  IconSignin
} from 'hds-react';
import { useClient } from '../client/hooks';
import styles from './styles.module.css';
import config from '../config';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';
import { Language, changeLanguage } from '../common';

const Header = (): React.ReactElement => {
  const client = useClient();
  const authenticated = client.isAuthenticated();
  const initialized = client.isInitialized();
  const user = client.getUser();

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
        menuButtonAriaLabel={t<string>('navigation.menuToggleAriaLabel')}>
        <HDSHeader.LanguageSelector ariaLabel={i18n.language.toUpperCase()} />
        {initialized && authenticated ? (
          <HDSHeader.ActionBarItem
            fixedRightPosition
            id="action-bar-user"
            icon={<IconUser ariaHidden />}
            closeIcon={<IconCross ariaHidden />}
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
                iconLeft={<IconSignout ariaHidden />}>
                {t('common:log-out')}
              </Link>
            </div>
          </HDSHeader.ActionBarItem>
        ) : (
          <HDSHeader.ActionBarItem
            fixedRightPosition
            icon={<IconSignin ariaHidden />}
            label={t<string>('common:log-in')}
            closeIcon={<IconSignin ariaHidden />}
            closeLabel={t<string>('common:log-in')}
            id="action-bar-sign-in"
            onClick={(): void => client.login()}
          />
        )}
      </HDSHeader.ActionBar>
    </HDSHeader>
  );
};

export default Header;
