import { useCallback, useState } from 'react';

export enum RequestStateType {
  NotAsked = 'NOT_ASKED',
  Loading = 'LOADING',
  Failure = 'FAILURE',
  Success = 'SUCCESS'
}

export type RequestState<Data, Error> =
  | { type: RequestStateType.NotAsked }
  | { type: RequestStateType.Loading }
  | { type: RequestStateType.Failure; error: Error }
  | { type: RequestStateType.Success; data: Data };

export const useRequestState = <Data = unknown, Error = unknown>(
  initialState?: RequestState<Data, Error>
): [
  RequestState<Data, Error>,
  () => void,
  () => void,
  (error: Error) => void,
  (data: Data) => void
] => {
  const [state, setState] = useState<RequestState<Data, Error>>(
    initialState || { type: RequestStateType.NotAsked }
  );

  const setNotAsked = useCallback(() => {
    setState({ type: RequestStateType.NotAsked });
  }, [setState]);

  const setLoading = useCallback(() => {
    setState({ type: RequestStateType.Loading });
  }, [setState]);

  const setFailure = useCallback(
    (error: Error) => {
      setState({ type: RequestStateType.Failure, error: error });
    },
    [setState]
  );

  const setSuccess = useCallback(
    (data: Data) => {
      setState({ type: RequestStateType.Success, data: data });
    },
    [setState]
  );

  return [state, setNotAsked, setLoading, setFailure, setSuccess];
};

export const isRequestNotAsked = <Data = unknown, Error = unknown>(
  requestState: RequestState<Data, Error>
) => requestState.type === RequestStateType.NotAsked;

export const isRequestLoading = <Data = unknown, Error = unknown>(
  requestState: RequestState<Data, Error>
) => requestState.type === RequestStateType.Loading;

export const isRequestFailure = <Data = unknown, Error = unknown>(
  requestState: RequestState<Data, Error>
) => requestState.type === RequestStateType.Failure && requestState;

export const isRequestSuccess = <Data = unknown, Error = unknown>(
  requestState: RequestState<Data, Error>
) => requestState.type === RequestStateType.Success && requestState;

export const getRequestError = <Data = unknown, Error = unknown>(
  requestState: RequestState<Data, Error>
) => requestState.type === RequestStateType.Failure && requestState.error;

export const getRequestData = <Data = unknown, Error = unknown>(
  requestState: RequestState<Data, Error>
) => requestState.type === RequestStateType.Success && requestState.data;
