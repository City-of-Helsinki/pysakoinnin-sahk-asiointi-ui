import React, { useState } from 'react';
import { IconSignout, Navigation } from 'hds-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClient } from '../client/hooks';
import styles from './styles.module.css';
import config from '../config';

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

  const title = 'Pysäköinnin asiointi';
  const userName = user ? `${user.given_name} ${user.family_name}` : '';

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
          label="Etusivu"
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
              label="Kirjaudu ulos"
              href="/logout"
              className={styles.navigationButton}
              icon={<IconSignout aria-hidden />}
            />
          </Navigation.User>
        )}
      </Navigation.Actions>
    </Navigation>
  );
};

export default Header;
