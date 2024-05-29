import React, { useEffect, useRef, useState } from 'react';
import {
  Log,
  User,
  UserManager,
  UserManagerSettings,
  WebStorageStateStore
} from 'oidc-client-ts';
import config from '../config';

import {
  Client,
  ClientError,
  ClientEvent,
  ClientFactory,
  ClientStatus,
  ClientStatusId,
  createClient,
  createClientGetOrLoadUserFunction,
  getLocationBasedUri,
  getTokenUri,
  hasValidClientConfig,
  User as ClientUser
} from './index';
import { AnyObject } from '../common';

let client: Client | null = null;

function oidcUserToClientUser(user: User): ClientUser {
  return (user as unknown) as ClientUser;
}

function bindEvents(
  manager: UserManager,
  eventFunctions: {
    onAuthChange: Client['onAuthChange'];
    setError: ClientFactory['setError'];
    eventTrigger: ClientFactory['eventTrigger'];
  }
): void {
  const { onAuthChange, setError, eventTrigger } = eventFunctions;
  manager.events.addUserLoaded((): void =>
    eventTrigger(ClientEvent.CLIENT_AUTH_SUCCESS)
  );
  manager.events.addUserUnloaded(() => {
    onAuthChange(false);
  });
  manager.events.addUserSignedOut(() => {
    onAuthChange(false);
  });
  manager.events.addUserSessionChanged(() => {
    onAuthChange(false);
  });
  manager.events.addSilentRenewError((renewError?: Error): void => {
    const errorObj = renewError || undefined;
    const message = errorObj ? errorObj.message : '';
    setError({
      type: ClientError.AUTH_REFRESH_ERROR,
      message
    });
  });
  manager.events.addAccessTokenExpired((): void =>
    eventTrigger(ClientEvent.TOKEN_EXPIRED)
  );
  manager.events.addAccessTokenExpiring((): void =>
    eventTrigger(ClientEvent.TOKEN_EXPIRING)
  );
}

export function getSessionStorageKey(): string {
  return `oidc.user:${config.config.authority}:${config.config.clientId}`;
}

export function createOidcClient(): Client {
  if (!hasValidClientConfig()) {
    const errorMessage = 'Invalid client config';
    // eslint-disable-next-line no-console
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  const oidcConfig: UserManagerSettings = {
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    authority: config.config.authority,
    automaticSilentRenew: config.config.automaticSilentRenew,
    validateSubOnSilentRenew: false,
    includeIdTokenInSilentRenew: false,
    monitorSession: true,
    client_id: config.config.clientId,
    redirect_uri: `${getLocationBasedUri(config.config.callbackPath)}`,
    response_type: config.config.responseType,
    scope: config.config.scope,
    silent_redirect_uri: getLocationBasedUri(config.config.silentAuthPath),
    post_logout_redirect_uri: getLocationBasedUri(config.config.logoutPath)
  };
  const manager = new UserManager(oidcConfig);
  const {
    eventTrigger,
    getStoredUser,
    setStoredUser,
    fetchApiToken,
    ...clientFunctions
  } = createClient();

  const {
    isAuthenticated,
    isInitialized,
    setStatus,
    getStatus,
    setError
  } = clientFunctions;
  if (config.config.enableLogging) {
    Log.setLogger(console);
    Log.setLevel(Log.DEBUG);
  }

  const getSessionStorageData = (): AnyObject | undefined => {
    const userKey = getSessionStorageKey();
    const storedString = sessionStorage.getItem(userKey);
    if (
      !storedString ||
      storedString.length < 2 ||
      storedString.charAt(0) !== '{'
    ) {
      return undefined;
    }
    try {
      return JSON.parse(storedString);
    } catch (e) {
      return undefined;
    }
  };

  const getUserData = (): AnyObject | undefined =>
    getStoredUser() || getSessionStorageData() || undefined;

  const getUser: Client['getUser'] = () => {
    if (isAuthenticated()) {
      const user = (getUserData() as unknown) as User;
      const userData = user && user.profile;
      if (
        userData &&
        userData.name &&
        (userData.session_state || userData.amr)
      ) {
        return ({
          name: userData.name,
          given_name: userData.given_name,
          family_name: userData.family_name,
          email: userData.email
        } as unknown) as ClientUser;
      }
    }
    return undefined;
  };

  const onAuthChange = (authenticated: boolean): boolean => {
    if (isInitialized() && authenticated === isAuthenticated()) {
      return false;
    }
    const statusChanged = setStatus(
      authenticated ? ClientStatus.AUTHORIZED : ClientStatus.UNAUTHORIZED
    );
    if (statusChanged) {
      eventTrigger(getStatus(), getUser());
    }
    return true;
  };

  let initPromise: Promise<ClientUser | undefined> | undefined;
  const init: Client['init'] = () => {
    if (initPromise) {
      return initPromise;
    }
    const initializer = config.config.autoSignIn
      ? manager.signinSilent
      : manager.getUser;
    setStatus(ClientStatus.INITIALIZING);
    initPromise = new Promise((resolve, reject) => {
      initializer
        .call(manager)
        .then((loadedUser: User | null) => {
          if (loadedUser && loadedUser.expired === false) {
            const oidcUserAsClientUser = oidcUserToClientUser(loadedUser);
            setStoredUser(oidcUserAsClientUser);
            onAuthChange(true);
            resolve(oidcUserAsClientUser);
            return;
          }
          onAuthChange(false);
          resolve(undefined);
        })
        .catch((errorData?: Error) => {
          const reason = errorData ? errorData.message : '';
          onAuthChange(false);
          if (reason !== 'login_required') {
            setError({
              type: ClientError.AUTH_ERROR,
              message: reason
            });

            if (errorData) {
              reject(errorData);
            }

            reject(new Error(reason));

            return;
          }
          resolve(undefined);
        });
    });
    return initPromise;
  };

  const getOrLoadUser = createClientGetOrLoadUserFunction({
    getUser,
    isInitialized,
    init
  });

  const login: Client['login'] = () => {
    manager.signinRedirect();
  };

  const logout: Client['logout'] = () => {
    eventTrigger(ClientEvent.LOGGING_OUT);
    setStoredUser(undefined);
    manager.signoutRedirect();
  };

  const clearSession: Client['clearSession'] = () => false;

  const handleCallback: Client['handleCallback'] = () => {
    if (initPromise) {
      return initPromise;
    }
    initPromise = new Promise((resolve, reject) => {
      setStatus(ClientStatus.INITIALIZING);
      manager
        .signinRedirectCallback()
        .then((loadedUser: User | undefined) => {
          const oidcUserAsClientUser = loadedUser
            ? oidcUserToClientUser(loadedUser)
            : undefined;
          setStoredUser(oidcUserAsClientUser);
          onAuthChange(true);
          resolve(oidcUserAsClientUser);
        })
        .catch((e: Error) => {
          setError({
            type: ClientError.AUTH_ERROR,
            message: e && e.toString()
          });
          onAuthChange(false);
          reject(e);
        });
    });
    return initPromise;
  };

  const loadUserProfile: Client['loadUserProfile'] = () =>
    new Promise((resolve, reject) => {
      manager
        .getUser()
        .then(loadedUser => {
          const oidcUserAsClientUser = loadedUser
            ? oidcUserToClientUser(loadedUser)
            : undefined;
          setStoredUser(oidcUserAsClientUser);
          resolve(oidcUserAsClientUser as ClientUser);
        })
        .catch((e: Error) => {
          setStoredUser(undefined);
          setError({
            type: ClientError.LOAD_ERROR,
            message: e && e.toString()
          });
          reject(e);
        });
    });

  const getUserProfile: Client['getUserProfile'] = () => getStoredUser();

  const getApiAccessToken: Client['getApiAccessToken'] = async options => {
    const user = getStoredUser();
    if (!user) {
      throw new Error('getApiAccessToken: no user with access token');
    }
    return fetchApiToken({
      uri: getTokenUri(config.config),
      accessToken: user.access_token as string,
      ...options
    });
  };

  const getUserTokens: Client['getUserTokens'] = () => {
    if (!isAuthenticated()) {
      return undefined;
    }
    const user = getStoredUser() as Record<string, string | undefined>;
    return {
      accessToken: user.access_token,
      idToken: user.id_token,
      refreshToken: user.refresh_token
    };
  };

  client = {
    init,
    login,
    logout,
    loadUserProfile,
    getUserProfile,
    getUser,
    clearSession,
    handleCallback,
    getOrLoadUser,
    onAuthChange,
    getApiAccessToken,
    getUserTokens,
    ...clientFunctions
  };
  bindEvents(manager, { onAuthChange, eventTrigger, setError });
  return client;
}

export function getClient(): Client {
  if (client) {
    return client;
  }
  client = createOidcClient();
  return client;
}

export const useOidcCallback = (): Client => {
  const clientRef: React.Ref<Client> = useRef(getClient());
  const clientFromRef: Client = clientRef.current as Client;
  const [, setStatus] = useState<ClientStatusId>(clientFromRef.getStatus());
  useEffect(() => {
    const initClient = async (): Promise<void> => {
      if (!clientFromRef.isInitialized()) {
        await clientFromRef.handleCallback().catch(e =>
          clientFromRef.setError({
            type: ClientError.INIT_ERROR,
            message: e && e.toString()
          })
        );
      }
    };
    const statusListenerDisposer = clientFromRef.addListener(
      ClientEvent.STATUS_CHANGE,
      status => {
        setStatus(status as ClientStatusId);
      }
    );

    initClient();
    return (): void => {
      statusListenerDisposer();
    };
  }, [clientFromRef]);
  return clientFromRef;
};
