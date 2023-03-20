import { FoulData } from '../interfaces/foulInterfaces';
import { Error } from '../interfaces/common';
import axios from 'axios';

const api_url = window._env_.REACT_APP_API_URL;

export const getFoulData = async (
  foul_number: number,
  register_number: string
): Promise<Array<FoulData>> =>
  axios
    .get(`${api_url}/getFoulData`, {
      params: { foul_number, register_number }
    })
    .then(res => res.data)
    .catch((err: Error) => Promise.reject(err));
