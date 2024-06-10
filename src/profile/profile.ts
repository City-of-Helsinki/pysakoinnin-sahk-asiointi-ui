import to from 'await-to-js';
import { GraphQLError } from 'graphql';
import { useCallback } from 'react';
import { ApolloError } from '@apollo/client';
import {
  createGraphQLClient,
  GraphQLClient,
  GraphQLClientError,
  resetClient
} from '../graphql/graphqlClient';
import { AnyObject, UserProfile } from '../common';

import useAuthorizedApiRequests, {
  AuthorizedApiActions,
  AuthorizedRequest
} from '../apiAccessTokens/useAuthorizedApiRequests';
import { JWTPayload } from '../client';

import { MY_PROFILE_QUERY } from '../graphql/MyProfileQuery';

let profileGqlClient: GraphQLClient;

export type ProfileDataType = string | AnyObject | undefined;
export type ProfileErrorType = Error | GraphQLClientError | string | undefined;
export type ProfileData = Record<string, ProfileDataType>;
export type ProfileQueryResult = {
  data: {
    myProfile: UserProfile;
  };
  errors?: readonly GraphQLError[];
};
export type GraphQLProfile =
  | Record<string, { edges: { node: { email: string } }[] }>
  | undefined;

type ReturnData = ProfileData;
type FetchProps = { autoFetch: boolean } | undefined;
type Request = AuthorizedRequest<ReturnData, FetchProps>;
export type ProfileActions = AuthorizedApiActions<ReturnData, FetchProps>;

export function getProfileGqlClient(token?: string): GraphQLClient | undefined {
  if (!profileGqlClient) {
    const uri = window._env_.REACT_APP_PROFILE_BACKEND_URL;
    if (!token || !uri) {
      return undefined;
    }
    profileGqlClient = createGraphQLClient(uri, token);
  }
  return profileGqlClient;
}

export function convertQueryToData(
  queryResult: ProfileQueryResult
): ProfileData | undefined {
  const profile = queryResult && queryResult.data && queryResult.data.myProfile;
  if (!profile) {
    return undefined;
  }
  const { id, firstName, lastName, nickname, language } = profile;
  return {
    id,
    firstName,
    lastName,
    nickname,
    language
  };
}

export async function getProfileData(
  token?: string
): Promise<ProfileQueryResult | GraphQLClientError> {
  const client = getProfileGqlClient(token);
  if (!client) {
    return {
      error: new Error(
        'getProfileGqlClient returned undefined. Missing ApiToken for env.REACT_APP_PROFILE_AUDIENCE or missing env.REACT_APP_PROFILE_BACKEND_URL '
      )
    };
  }
  const [error, result]: [
    Error | ApolloError | null,
    ProfileQueryResult | undefined
  ] = await to(
    client.query({
      errorPolicy: 'all',
      query: MY_PROFILE_QUERY,
      fetchPolicy: 'no-cache'
    })
  );
  if (error || !result) {
    return {
      error: error || undefined,
      message: 'Query error'
    };
  }
  const data = convertQueryToData(result);
  if (!data) {
    return {
      error: result.errors
        ? result.errors[0]
        : new Error('Query result is missing data.myProfile')
    };
  }
  return result;
}

export function getProfileApiToken(apiTokens: JWTPayload): string | undefined {
  const tokenKey = window._env_.REACT_APP_PROFILE_AUDIENCE;
  if (!tokenKey) {
    return undefined;
  }
  return apiTokens && apiTokens[tokenKey];
}

export async function clearGraphQlClient(): Promise<void> {
  const client = getProfileGqlClient();
  if (client) {
    await resetClient(client);
  }
  return Promise.resolve();
}

const executeAPIAction: Request = async options => {
  const result = await getProfileData(getProfileApiToken(options.apiTokens));
  const resultAsError = result as GraphQLClientError;
  if (resultAsError.error) {
    throw resultAsError.error;
  } else if (resultAsError.message) {
    throw new Error(resultAsError.message);
  }
  return (result as ProfileQueryResult).data.myProfile as ProfileData;
};

export function useProfileWithApiTokens(): ProfileActions {
  const req: Request = useCallback(async props => executeAPIAction(props), []);
  return useAuthorizedApiRequests(req, {});
}
