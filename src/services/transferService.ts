import {
  TransferData,
  TransferRequest
} from '../interfaces/transferInterfaces';
import axios, { AxiosError } from 'axios';
import { waitForApiToken } from './common';

const api_url = window._env_.REACT_APP_API_URL;

export const getTransferData = async (
  params: TransferRequest
): Promise<TransferData> =>
  waitForApiToken()
    .then(async apiToken =>
      axios
        .get(`${api_url}/getTransferData`, {
          params,
          headers: { Authorization: `Bearer ${apiToken}` }
        })
        .then(res => res.data)
    )
    .catch((err: AxiosError) => Promise.reject(err));
