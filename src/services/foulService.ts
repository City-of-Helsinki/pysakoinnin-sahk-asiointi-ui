import { FoulData, FoulRequest } from '../interfaces/foulInterfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { waitForApiToken } from './common';
import { DueDateExtendableReason } from '../interfaces/dueDateInterfaces';
import {
  MOCK_FOUL_NUMBER,
  MOCK_FOUL_NUMBER_WITH_DECISION
} from '../mocks/mockConstants';
import config from '../config';

const api_url = window._env_.REACT_APP_API_URL;
const DUE_DATE_PATH = '/erapaivansiirto';

type MockFoulDataLoader = () => Promise<{ default: FoulData }>;

const mockFoulDataLoaders: Partial<Record<number, MockFoulDataLoader>> = {
  [MOCK_FOUL_NUMBER_WITH_DECISION]: () =>
    import('../mocks/mockFoulDataWithDecision'),
  [MOCK_FOUL_NUMBER]: () => import('../mocks/mockFoulData')
};

const getMockFoulData = async (params: FoulRequest): Promise<FoulData> => {
  const foulNumber = Number(params.foul_number?.trim());
  const loadMockFoulData = mockFoulDataLoaders[foulNumber];

  if (loadMockFoulData) {
    const { default: mockFoulData } = await loadMockFoulData();
    return mockFoulData;
  }

  const response = {
    status: 404,
    data: {
      detail: 'Resource not found'
    }
  } as AxiosResponse;

  throw new AxiosError(undefined, undefined, undefined, undefined, response);
};

export const getFoulData = async (params: FoulRequest): Promise<FoulData> => {
  if (config.mockData.enabled) {
    return getMockFoulData(params).then(mockFoulData =>
      window.location.pathname === DUE_DATE_PATH
        ? {
            ...mockFoulData,
            dueDateExtendable: true,
            dueDateExtendableReason: DueDateExtendableReason.Success
          }
        : mockFoulData
    );
  }

  return waitForApiToken().then(async apiToken =>
    axios
      .get(`${api_url}/getFoulData`, {
        params,
        headers: { Authorization: `Bearer ${apiToken}` }
      })
      .then(res => res.data)
      .catch((err: AxiosError) => Promise.reject(err))
  );
};
