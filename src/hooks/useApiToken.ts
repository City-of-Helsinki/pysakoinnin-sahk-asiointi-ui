import {
  isApiTokensRemovedSignal,
  isApiTokensUpdatedSignal,
  useApiTokens,
  useSignalListener
} from 'hds-react';
import { useCallback } from 'react';
import config from '../config';

const useApiToken = () => {
  const signalListener = useCallback(
    signal =>
      isApiTokensUpdatedSignal(signal) || isApiTokensRemovedSignal(signal),
    []
  );
  useSignalListener(signalListener);

  const { isRenewing, getStoredApiTokens } = useApiTokens();
  const [error, tokens] = getStoredApiTokens();
  if (error || isRenewing()) {
    return undefined;
  }

  return tokens ? tokens[config.config.apiClientId] : undefined;
};

export default useApiToken;
