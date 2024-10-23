/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-namespace */
import React from 'react';
import * as hdsReact from 'hds-react';
import merge from 'lodash/merge';
import { User, UserProfile } from 'oidc-client-ts';
import { Mock } from 'vitest';
import config from '../config';

const TEST_USER_ID = 'a0fe844d-ec11-475a-aa1d-39d15fa019cd';

export const fakeOidcUserProfileState = (
  overrides?: Partial<UserProfile>
): UserProfile =>
  merge<UserProfile, typeof overrides>(
    {
      aud: '',
      exp: 0,
      iat: 0,
      iss: '',
      name: 'Test user',
      sub: TEST_USER_ID
    },
    overrides
  );

export const fakeOidcUserState = (overrides?: Partial<User>): User =>
  merge<User, typeof overrides>(
    {
      access_token: '',
      expires_at: 0,
      expires_in: 0,
      expired: false,
      id_token: '',
      profile: fakeOidcUserProfileState(),
      toStorageString: vi.fn(),
      scope: '',
      scopes: [],
      session_state: null,
      state: null,
      token_type: ''
    },
    overrides
  );

type LoginStateOptions = {
  authenticated: boolean;
  apiToken: string | null;
  profileApiToken: string | null;
  login: Mock<any>;
  logout: Mock<any>;
  user: User | null;
};

const mockLoginState = ({
  apiToken,
  profileApiToken,
  authenticated,
  login,
  logout,
  user
}: Partial<LoginStateOptions>) => {
  const oidcClient = {
    isAuthenticated: () => authenticated,
    getUser: () => user,
    login: login ?? vi.fn(),
    logout: logout ?? vi.fn()
  };
  const useOidcClient = vi
    .spyOn(hdsReact, 'useOidcClient')
    .mockReturnValue(oidcClient as any);

  const useOidcClientTracking = vi
    .spyOn(hdsReact, 'useOidcClientTracking')
    .mockReturnValue([undefined, undefined as any, oidcClient as any]);

  const tokenMap: any = {};
  if (apiToken) {
    tokenMap[config.config.apiClientId] = apiToken;
  }
  if (profileApiToken) {
    tokenMap[config.config.profileApiClientId] = profileApiToken;
  }
  const tokens = Object.keys(tokenMap).length ? tokenMap : null;

  const useApiTokens = vi.spyOn(hdsReact, 'useApiTokens').mockReturnValue({
    getStoredApiTokens: () => [null, tokens],
    isRenewing: () => false
  } as any);

  const getApiTokensFromStorage = vi
    .spyOn(hdsReact, 'getApiTokensFromStorage')
    .mockReturnValue(tokens);
  const useGraphQL = vi.spyOn(hdsReact, 'useGraphQL').mockReturnValue([
    null,
    {
      data: {
        myProfile: {
          firstName: 'TestFirstName',
          lastName: 'TestLastName',
          primaryEmail: { email: 'test_email@localhost.local' },
          verifiedPersonalInformation: {
            nationalIdentificationNumber: '010106A9067'
          }
        }
      },
      error: null,
      loading: null,
      refetch: null
    }
  ] as any);

  const SessionEndedHandler = vi
    .spyOn(hdsReact, 'SessionEndedHandler')
    .mockReturnValue(null);

  const WithAuthentication = vi
    .spyOn(hdsReact, 'WithAuthentication')
    .mockImplementation((({
      AuthorisedComponent,
      UnauthorisedComponent
    }: {
      AuthorisedComponent: any;
      UnauthorisedComponent: any;
    }) =>
      authenticated ? (
        <AuthorisedComponent user={user} />
      ) : (
        <UnauthorisedComponent />
      )) as any);

  const useSignalListener = vi
    .spyOn(hdsReact, 'useSignalListener')
    .mockReturnValue([null, null] as any);

  return {
    useApiTokens,
    getApiTokensFromStorage,
    useOidcClient,
    useOidcClientTracking,
    useGraphQL,
    SessionEndedHandler,
    WithAuthentication,
    useSignalListener
  };
};

export const mockAuthenticatedLoginState = (
  options?: Partial<LoginStateOptions>
) => {
  const apiToken = 'api-token';
  const profileApiToken = 'profile-api-token';

  return mockLoginState({
    apiToken,
    profileApiToken,
    authenticated: true,
    user: fakeOidcUserState(),
    ...options
  });
};

export const mockUnauthenticatedLoginState = (
  options?: Partial<LoginStateOptions>
) =>
  mockLoginState({
    authenticated: false,
    user: null,
    ...options
  });
