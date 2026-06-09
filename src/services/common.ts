import { getApiTokensFromStorage } from 'hds-react';
import config from '../config';

const RETRY_TIME_MS = 200;
const MAX_RETRY_ATTEMPTS = 10;

const wait = (waitForMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(() => resolve(), waitForMs);
  });

const getApiToken = () => {
  const tokens = getApiTokensFromStorage();
  return tokens ? tokens[config.config.apiClientId] : undefined;
};

export const waitForApiToken = async () => {
  for (let attempt = 0; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
    const apiToken = getApiToken();
    if (apiToken) {
      return apiToken;
    }
    // only wait if another attempt will follow
    if (attempt < MAX_RETRY_ATTEMPTS) {
      await wait(RETRY_TIME_MS);
    }
  }
  throw new Error('Failed to get API token');
};
