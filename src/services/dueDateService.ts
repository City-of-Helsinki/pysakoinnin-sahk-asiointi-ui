import {
  DueDateResponse,
  DueDateRequest
} from '../interfaces/dueDateInterfaces';
import axios, { AxiosError } from 'axios';
import { waitForApiToken } from './common';

const api_url = window._env_.REACT_APP_API_URL;

export const extendDueDate = async (
  data: DueDateRequest
): Promise<DueDateResponse> =>
  waitForApiToken().then(async apiToken =>
    axios
      .post(`${api_url}/extendDueDate`, data, {
        headers: { Authorization: `Bearer ${apiToken}` }
      })
      .then(res => res.data)
      .catch((err: AxiosError) => Promise.reject(err))
  );
