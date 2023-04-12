import { AppStore } from '../store';
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { clearLoading, setLoading } from '../components/loader/loadingSlice';
import { ResponseCode } from '../interfaces/foulInterfaces';
import { getClient } from '../client/oidc-react';
import { setPromptLogin } from '../components/user/userSlice';

let store: AppStore;

export const injectStore = (_store: AppStore) => {
  store = _store;
};

/**
 * Intercepts axios requests and responses before they are handled by the services.
 * It is used for displaying a loading spinner when requests are being processed
 * for now, but can also be used to handle errors etc.
 * This interceptor is imported directly into BrowserApp.
 */

// Request interceptor
axios.interceptors.request.use(
  request => handleRequest(request),
  error => handleError(error)
);

// Response interceptor
axios.interceptors.response.use(
  response => handleResponse(response),
  error => handleError(error)
);

const handleRequest = async (req: InternalAxiosRequestConfig) => {
  const client = getClient();

  if (!store.getState().loading.isLoading) {
    store.dispatch(setLoading());
  }

  // Check that api token is valid before sending the request
  const apiTokenExists = async () => {
    try {
      await client.getApiAccessToken({
        audience: window._env_.REACT_APP_PROFILE_AUDIENCE,
        permission: window._env_.REACT_APP_API_BACKEND_PERMISSION,
        grantType: window._env_.REACT_APP_API_BACKEND_GRANT_TYPE
      });
      return true;
    } catch (e) {
      store.dispatch(setPromptLogin(true));
      return false;
    }
  };
  return apiTokenExists().then(isSuccess =>
    isSuccess ? Promise.resolve(req) : Promise.reject(null)
  );
};

const handleResponse = (res: AxiosResponse) => {
  if (store.getState().loading.isLoading) {
    store.dispatch(clearLoading());
  }
  /* Check that the foul / transfer really exists,
   * it can be "not found" even though we get a response */
  if (
    [ResponseCode.FoulNotFound, ResponseCode.TransferNotFound].includes(
      res.data.responseCode
    )
  ) {
    const response: AxiosResponse = { ...res, status: 404 };
    return Promise.reject(
      new AxiosError(undefined, undefined, undefined, undefined, response)
    );
  } else {
    return res;
  }
};

const handleError = (error: AxiosError) => {
  store.dispatch(clearLoading());
  return Promise.reject(error);
};
