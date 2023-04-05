import axios, { AxiosError } from 'axios';
import {
  Objection,
  ObjectionResponse
} from '../interfaces/objectionInterfaces';

const api_url = window._env_.REACT_APP_API_URL;

export const saveObjection = async (
  data: Objection
): Promise<ObjectionResponse> =>
  axios
    .post(`${api_url}/saveObjection`, data)
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
