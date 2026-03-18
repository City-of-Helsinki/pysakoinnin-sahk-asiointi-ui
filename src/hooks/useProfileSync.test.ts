/* eslint-disable no-magic-numbers */
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useProfileSync from './useProfileSync';
import { setUserProfile } from '../components/user/userSlice';

const dispatchMock = vi.fn();
const fetchApiTokensMock = vi.fn();
const refetchMock = vi.fn();

type MockProfile = {
  firstName: string;
  lastName: string;
  primaryEmail: { email: string };
};

type MockGraphQLData = {
  myProfile?: MockProfile;
};

type MockGraphQLState = {
  data: MockGraphQLData | undefined;
  error: Error | null;
  loading: boolean;
  refetch: typeof refetchMock;
};

type CreateGraphQLStateOptions = {
  email?: string;
  data?: MockGraphQLData | undefined;
  error?: Error | null;
  loading?: boolean;
};

const createMockProfile = (email = 'test.user@example.com'): MockProfile => ({
  firstName: 'Test',
  lastName: 'User',
  primaryEmail: {
    email
  }
});

const createGraphQLState = (
  options?: CreateGraphQLStateOptions
): MockGraphQLState => ({
  data:
    options && 'data' in options
      ? options.data
      : {
          myProfile: createMockProfile(options?.email)
        },
  error: options?.error ?? null,
  loading: options?.loading ?? false,
  refetch: refetchMock
});

let authenticatedUser: object | null = { sub: 'test-user' };
let graphQLState: MockGraphQLState;

vi.mock('hds-react', () => ({
  useGraphQL: vi.fn(() => [null, graphQLState]),
  useApiTokensClient: vi.fn(() => ({ fetch: fetchApiTokensMock })),
  useAuthenticatedUser: vi.fn(() => authenticatedUser)
}));

vi.mock('../store', () => ({
  useAppDispatch: vi.fn(() => dispatchMock)
}));

describe('useProfileSync', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();

    authenticatedUser = { sub: 'test-user' };
    graphQLState = createGraphQLState();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the current profile GraphQL state', () => {
    const { result } = renderHook(() => useProfileSync());

    expect(result.current).toEqual({
      data: graphQLState.data,
      error: null,
      loading: false,
      userProfile: graphQLState.data?.myProfile
    });
  });

  it('dispatches `setUserProfile` when profile data is available', () => {
    renderHook(() => useProfileSync());

    expect(dispatchMock).toHaveBeenCalledWith(
      setUserProfile(graphQLState.data?.myProfile)
    );
  });

  it('does not fetch on first received email, but fetches on later email change', () => {
    graphQLState = createGraphQLState({ data: undefined });
    const { rerender } = renderHook(() => useProfileSync());

    expect(fetchApiTokensMock).not.toHaveBeenCalled();

    graphQLState = createGraphQLState({ email: 'first.user@example.com' });
    rerender();

    expect(fetchApiTokensMock).not.toHaveBeenCalled();

    graphQLState = createGraphQLState({ email: 'updated.user@example.com' });
    rerender();

    expect(fetchApiTokensMock).toHaveBeenCalledTimes(1);
    expect(fetchApiTokensMock).toHaveBeenLastCalledWith(authenticatedUser);
  });

  it('does not fetch API tokens when there is no authenticated user', () => {
    authenticatedUser = null;

    renderHook(() => useProfileSync());

    expect(fetchApiTokensMock).not.toHaveBeenCalled();
  });

  it('refetches the profile on the polling interval and stops after unmount', () => {
    const { unmount } = renderHook(() => useProfileSync());

    expect(refetchMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(refetchMock).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(refetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not dispatch `setUserProfile` when profile data is missing', () => {
    graphQLState = createGraphQLState({ data: undefined });

    renderHook(() => useProfileSync());

    expect(dispatchMock).not.toHaveBeenCalledWith(
      expect.objectContaining({
        type: setUserProfile.type
      })
    );
  });
});
