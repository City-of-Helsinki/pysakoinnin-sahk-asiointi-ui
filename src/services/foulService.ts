import { FoulData, FoulRequest } from '../interfaces/foulInterfaces';
import axios, { AxiosError } from 'axios';
import { waitForApiToken } from './common';

const api_url = window._env_.REACT_APP_API_URL;

export const getFoulData = async (params: FoulRequest): Promise<FoulData> =>
  waitForApiToken().then(async apiToken =>
    axios
      .get(`${api_url}/getFoulData`, {
        params,
        headers: { Authorization: `Bearer ${apiToken}` }
      })
      .then(res => res.data)
      .catch((err: AxiosError) => Promise.reject(err))
  );
