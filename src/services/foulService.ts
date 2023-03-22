import { FoulData, FoulRequest } from '../interfaces/foulInterfaces';
import axios, { AxiosError } from 'axios';

const api_url = window._env_.REACT_APP_API_URL;

export const getFoulData = async (params: FoulRequest): Promise<FoulData> =>
  axios
    .get(`${api_url}/getFoulData`, { params })
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
