/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef } from 'react';
import {
  useGraphQL,
  useApiTokensClient,
  useAuthenticatedUser
} from 'hds-react';
import { NormalizedCacheObject } from '@apollo/client';
import { ProfileQueryResult } from '../common';
import { useAppDispatch } from '../store';
import { setUserProfile } from '../components/user/userSlice';

const PROFILE_REFETCH_INTERVAL_MS = 10000;

/**
 * Polls the Helsinki profile at a fixed interval and re-fetches API tokens
 * whenever the profile email changes. Keeps the Redux user profile in sync.
 *
 * Returns the raw GraphQL state so callers can gate rendering on first load.
 */
const useProfileSync = () => {
  const dispatch = useAppDispatch();

  const [, { data, error, loading, refetch }] = useGraphQL<
    NormalizedCacheObject,
    ProfileQueryResult
  >();

  // Store the user in a ref to avoid having to add it to the dependency array
  // of the effects below, which would cause them to run on every auth state change.
  // We only want them to run when the profile email changes or at the fixed interval,
  // not on every auth state change.
  const user = useAuthenticatedUser();
  const userRef = useRef(user);
  userRef.current = user;

  const { fetch: fetchApiTokens } = useApiTokensClient();

  const userProfile = data?.myProfile;
  const email = useMemo(() => userProfile?.primaryEmail?.email, [userProfile]);
  const previousEmailRef = useRef<string | undefined>(undefined);

  // Re-fetch API tokens when profile email changes after first load
  useEffect(() => {
    const previousEmail = previousEmailRef.current;
    previousEmailRef.current = email;

    if (
      !userRef.current ||
      !email ||
      previousEmail === undefined ||
      previousEmail === email
    ) {
      return;
    }

    fetchApiTokens(userRef.current);
  }, [email, fetchApiTokens]);

  // Poll the profile at a fixed interval;
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, PROFILE_REFETCH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refetch]);

  // Keep Redux user profile slice up to date
  useEffect(() => {
    userProfile && dispatch(setUserProfile(userProfile));
  }, [userProfile]);

  return { data, error, loading, userProfile };
};

export default useProfileSync;
