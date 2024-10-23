import {
  ObjectionDocumentResponse,
  ObjectionForm,
  ObjectionResponse
} from '../interfaces/objectionInterfaces';
import axios, { AxiosError } from 'axios';
import { waitForApiToken } from './common';

const api_url = window._env_.REACT_APP_API_URL;

export const getDocuments = async (): Promise<ObjectionDocumentResponse> =>
  waitForApiToken().then(async apiToken =>
    axios
      .get(`${api_url}/getDocuments/`, {
        headers: { Authorization: `Bearer ${apiToken}` }
      })
      .then(res => res.data)
      .catch((err: AxiosError) => Promise.reject(err))
  );

export const saveObjection = async (
  data: ObjectionForm
): Promise<ObjectionResponse> =>
  waitForApiToken().then(async apiToken =>
    axios
      .post(`${api_url}/saveObjection`, data, {
        headers: { Authorization: `Bearer ${apiToken}` }
      })
      .then(res => res.data)
      .catch((err: AxiosError) => Promise.reject(err))
  );
