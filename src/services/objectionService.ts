import { ObjectionDocumentResponse } from '../interfaces/objectionInterfaces';
import axios, { AxiosError } from 'axios';

const api_url = window._env_.REACT_APP_API_URL;

export const getDocuments = async (): Promise<ObjectionDocumentResponse> =>
  axios
    .get(`${api_url}/getDocuments/`)
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
