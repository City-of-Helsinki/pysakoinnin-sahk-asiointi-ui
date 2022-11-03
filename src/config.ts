import { ClientConfig } from './client/index';

function envValueToBoolean(
  value: string | undefined | boolean,
  defaultValue: boolean
): boolean {
  const strValue = String(value).toLowerCase();
  if (
    value === false ||
    strValue === '' ||
    strValue === 'false' ||
    strValue === '0'
  ) {
    return false;
  }
  if (value === true || strValue === 'true' || strValue === '1') {
    return true;
  }
  return defaultValue;
}

function createConfigFromEnv(source: 'OIDC'): Partial<ClientConfig> {
  const url = String(window._env_[`REACT_APP_${source}_URL`]);
  const realm = String(window._env_[`REACT_APP_${source}_REALM`]);
  const tokenExchangePath =
    window._env_[`REACT_APP_${source}_TOKEN_EXCHANGE_PATH`];
  return {
    realm,
    url,
    authority: realm ? `${url}/realms/${realm}` : url,
    clientId: String(window._env_[`REACT_APP_OIDC_CLIENT_ID`]),
    callbackPath: String(window._env_[`REACT_APP_OIDC_CALLBACK_PATH`]),
    logoutPath: window._env_[`REACT_APP_OIDC_LOGOUT_PATH`] || '/',
    silentAuthPath: window._env_[`REACT_APP_OIDC_SILENT_AUTH_PATH`],
    responseType: window._env_[`REACT_APP_OIDC_RESPONSE_TYPE`],
    scope: window._env_[`REACT_APP_OIDC_SCOPE`],
    autoSignIn: envValueToBoolean(
      window._env_[`REACT_APP_OIDC_AUTO_SIGN_IN`],
      true
    ),
    automaticSilentRenew: envValueToBoolean(
      window._env_[`REACT_APP_OIDC_AUTO_SILENT_RENEW`],
      true
    ),
    enableLogging: envValueToBoolean(
      window._env_[`REACT_APP_OIDC_LOGGING`],
      false
    ),
    tokenExchangePath,
    hasApiTokenSupport: Boolean(tokenExchangePath)
  };
}

const config = {
  ...createConfigFromEnv('OIDC'),
  path: '/callback',
  label: 'Helsinki-profiili MVP'
} as ClientConfig;

const uiConfig: { profileUIUrl: string } = {
  profileUIUrl: String(window._env_.REACT_APP_PROFILE_UI_URL)
};

const isCallbackUrl = (route: string): boolean => route === config.callbackPath;

export default {
  config,
  ui: uiConfig,
  isCallbackUrl
};
