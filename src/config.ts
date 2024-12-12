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

export interface ClientConfig {
  /**
   * realm for the OIDC/OAuth2 endpoint
   */
  realm: string;
  /**
   * The URL of the OIDC/OAuth2 endpoint
   */
  url: string;
  /**
   * authority for the OIDC/OAuth2. Not configurable, value is props.url+'/realms/'+props.realm
   */
  authority: string;
  /**
   * Your client application's identifier as registered with the OIDC/OAuth2 provider.
   */
  clientId: string;
  /**
   * The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
   */
  callbackPath: string;
  /**
   * The redirect URI of your client application after logout
   * Default: '/'
   */
  logoutPath?: string;
  /**
   * The path for silent authentication checks
   * Default '/silent-renew.html'
   */
  silentAuthPath?: string;
  /**
   * The type of response desired from the OIDC/OAuth2 provider.
   */
  responseType?: string;
  /**
   * The scope being requested from the OIDC/OAuth2 provider.
   */
  scope?: string;
  /**
   * Default: true
   */
  autoSignIn?: boolean;
  /**
   * Default: true
   */
  automaticSilentRenew?: boolean;
  /**
   * Default: false
   */
  enableLogging?: boolean;
  /**
   * Path for exchanging tokens. Leave blank to use default keycloak path realms/<realm>/protocol/openid-connect/token
   */
  tokenExchangePath?: string;
  /**
   * path prefix for this config type
   */
  path: string;
  /**
   * does the server, this config is for, provide api tokens
   */
  hasApiTokenSupport: boolean;
  /**
   * label of this config shown in the UI
   */
  label: string;
  /**
   * Where HDS can get api tokens
   */
  apiTokensUrl: string;
  /**
   * API Client ID for backend
   */
  apiClientId: string;
  /**
   * API Client ID for Profile backend
   */
  profileApiClientId: string;

  /**
   * Profile GraphQL API url
   */
  profileApiUrl: string;
}

const config = {
  authority: String(window._env_[`REACT_APP_OIDC_AUTHORITY`]),
  clientId: String(window._env_[`REACT_APP_OIDC_CLIENT_ID`]),
  callbackPath: String(window._env_[`REACT_APP_OIDC_CALLBACK_PATH`]),
  logoutPath: window._env_[`REACT_APP_OIDC_LOGOUT_PATH`] || '/',
  silentAuthPath: window._env_[`REACT_APP_OIDC_SILENT_AUTH_PATH`],
  responseType: window._env_[`REACT_APP_OIDC_RESPONSE_TYPE`],
  scope: window._env_[`REACT_APP_OIDC_SCOPE`],
  enableLogging: envValueToBoolean(
    window._env_[`REACT_APP_OIDC_LOGGING`],
    false
  ),
  apiTokensUrl: window._env_[`REACT_APP_OIDC_TOKEN_EXCHANGE_PATH`],
  apiClientId: window._env_[`REACT_APP_API_CLIENT_ID`],
  profileApiClientId: window._env_[`REACT_APP_PROFILE_API_CLIENT_ID`],
  profileApiUrl: window._env_[`REACT_APP_PROFILE_API_URL`],
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
