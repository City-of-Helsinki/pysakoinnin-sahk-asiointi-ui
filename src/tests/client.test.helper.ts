import { FetchMock } from 'jest-fetch-mock';
import { Client, FetchApiTokenOptions } from '../client';
import {
  MockMutator,
  requestDelayForStatusChangeDetectionInMs
} from '../client/__mocks__/index';
import { AnyFunction, AnyObject } from '../common';

type NodeJS = AnyObject;

export const mockApiTokenResponse = (
  options: {
    audience?: string;
    uri?: string;
    delay?: number;
    requestCallback?: AnyFunction;
    returnError?: boolean;
  } = {}
): AnyObject => {
  const { audience, uri, delay, requestCallback, returnError } = options;
  const fetchMock: FetchMock = global.fetch;
  const tokenKey =
    audience || window._env_.REACT_APP_PROFILE_AUDIENCE || 'unknown';
  const tokens = { [tokenKey]: 'apiToken' };
  const responseData = returnError
    ? { status: 401, body: JSON.stringify({ error: true }) }
    : {
        status: 200,
        body: JSON.stringify(tokens)
      };
  const endPointUri = uri as string;
  fetchMock.doMockOnceIf(endPointUri, req => {
    if (requestCallback) {
      requestCallback(req);
    }
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(responseData);
      }, delay || requestDelayForStatusChangeDetectionInMs)
    );
  });
  return tokens;
};

export const clearApiTokens = (client: Client): void => {
  const apiTokens = client.getApiTokens();
  if (apiTokens) {
    Object.keys(apiTokens).forEach(key => {
      client.removeApiToken(key);
    });
  }
};

export const logoutUser = (client: Client): void => {
  if (client.isAuthenticated()) {
    client.onAuthChange(false);
  }
};

export const setUpUser = async (
  user: AnyObject,
  mockMutator: MockMutator,
  client: Client
): Promise<void> => {
  mockMutator.setLoadProfilePayload(
    mockMutator.createValidUserData(user),
    undefined
  );
  await client.loadUserProfile();
  client.onAuthChange(true);
};

export const createApiTokenFetchPayload = (
  overrides?: FetchApiTokenOptions
): FetchApiTokenOptions => ({
  audience: 'audience',
  grantType: 'grantType',
  permission: 'permission',
  ...overrides
});

export const setEnv = (overrides: Partial<NodeJS.ProcessEnv>): (() => void) => {
  const source = window._env_;
  const oldValues = Object.keys(overrides).reduce((currentObj, currentKey) => {
    // eslint-disable-next-line no-param-reassign
    currentObj[currentKey] = source[currentKey];
    return currentObj;
  }, {} as AnyObject);
  window._env_ = {
    ...window._env_,
    ...overrides
  };
  return () => {
    window._env_ = {
      ...window._env_,
      ...oldValues
    };
  };
};
