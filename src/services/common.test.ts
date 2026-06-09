import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getApiTokensFromStorage } from 'hds-react';
import { waitForApiToken } from './common';

vi.mock('hds-react', () => ({
  getApiTokensFromStorage: vi.fn()
}));

vi.mock('../config', () => ({
  default: { config: { apiClientId: 'test-client' } }
}));

const CLIENT_ID = 'test-client';
const TOKEN = 'api-token-value';
const ERROR_MESSAGE = 'Failed to get API token';

const tokensMock = vi.mocked(getApiTokensFromStorage);

describe('waitForApiToken', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    tokensMock.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the token immediately when it is already in storage', async () => {
    tokensMock.mockReturnValue({ [CLIENT_ID]: TOKEN } as never);

    await expect(waitForApiToken()).resolves.toBe(TOKEN);
  });

  it('retries and returns the token once it appears in storage', async () => {
    tokensMock
      .mockReturnValueOnce(null as never)
      .mockReturnValueOnce(null as never)
      .mockReturnValue({ [CLIENT_ID]: TOKEN } as never);

    const promise = waitForApiToken();
    await vi.runAllTimersAsync();

    await expect(promise).resolves.toBe(TOKEN);
  });

  it('throws after the maximum number of retries when no token appears', async () => {
    tokensMock.mockReturnValue(null as never);

    const promise = waitForApiToken();
    const assertion = expect(promise).rejects.toThrow(ERROR_MESSAGE);
    await vi.runAllTimersAsync();

    await assertion;
  });
});
