import {
  TransferData,
  TransferRequest
} from '../interfaces/transferInterfaces';
import axios, { AxiosError } from 'axios';
import { waitForApiToken } from './common';
import config from '../config';

const api_url = window._env_.REACT_APP_API_URL;

export const getTransferData = async (
  params: TransferRequest
): Promise<TransferData> => {
  if (config.mockData.enabled) {
    const { default: mockTransferData } = await import(
      '../mocks/mockTransferData'
    );
    return mockTransferData;
  }

  return waitForApiToken()
    .then(async apiToken =>
      axios
        .get(`${api_url}/getTransferData`, {
          params,
          headers: { Authorization: `Bearer ${apiToken}` }
        })
        .then(res => res.data)
    )
    .catch((err: AxiosError) => Promise.reject(err));
};
