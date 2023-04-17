import { ObjectionDocumentResponse } from '../interfaces/objectionInterfaces';
import axios, { AxiosError } from 'axios';
import { getClient } from '../client/oidc-react';
import { JWTPayload } from '../client';

const api_url = window._env_.REACT_APP_API_URL;
const client = getClient();

export const getDocuments = async (): Promise<ObjectionDocumentResponse> => {
  let token = '';

  if (window._env_.NODE_ENV !== 'test') {
    const apiAccessToken = (await client.getApiAccessToken({
      audience: window._env_.REACT_APP_PROFILE_AUDIENCE,
      permission: window._env_.REACT_APP_API_BACKEND_PERMISSION,
      grantType: window._env_.REACT_APP_API_BACKEND_GRANT_TYPE
    })) as JWTPayload;
    token = apiAccessToken[window._env_.REACT_APP_API_BACKEND_TOKEN_URL];
  }

  return axios
    .get(`${api_url}/getDocuments/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
};
