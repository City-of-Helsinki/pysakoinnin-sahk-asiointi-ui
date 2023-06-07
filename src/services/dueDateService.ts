import {
  DueDateResponse,
  DueDateRequest
} from '../interfaces/dueDateInterfaces';
import axios, { AxiosError } from 'axios';

const api_url = window._env_.REACT_APP_API_URL;

export const extendDueDate = async (
  data: DueDateRequest
): Promise<DueDateResponse> =>
  axios
    .post(`${api_url}/extendDueDate`, data)
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
