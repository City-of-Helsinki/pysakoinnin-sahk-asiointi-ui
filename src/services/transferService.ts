import {
  TransferData,
  TransferRequest
} from '../interfaces/transferInterfaces';
import axios, { AxiosError } from 'axios';

const api_url = window._env_.REACT_APP_API_URL;

export const getTransferData = async (
  params: TransferRequest
): Promise<TransferData> =>
  axios
    .get(`${api_url}/getTransferData`, { params })
    .then(res => res.data)
    .catch((err: AxiosError) => Promise.reject(err));
