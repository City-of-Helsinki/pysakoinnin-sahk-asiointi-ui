import {
  ObjectionDocumentResponse,
  ObjectionForm,
  ObjectionResponse
} from '../interfaces/objectionInterfaces';
import axios, { AxiosError } from 'axios';

const api_url = window._env_.REACT_APP_API_URL;

export const getDocuments = async (): Promise<ObjectionDocumentResponse> =>
  axios
    .get(`${api_url}/getDocuments/`)
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));

export const saveObjection = async (
  data: ObjectionForm
): Promise<ObjectionResponse> =>
  axios
    .post(`${api_url}/saveObjection`, data)
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
