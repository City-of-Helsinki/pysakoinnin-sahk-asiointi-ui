import React from 'react';
import { LoginCallbackHandler, OidcClientError } from 'hds-react';
import { useNavigate } from 'react-router-dom';
import Loader from './loader/Loader';
import { captureException } from '@sentry/react';

const LoginCallbackHandlerWrapper = (): React.ReactElement => {
  const navigate = useNavigate();
  const success = async () => {
    navigate('/');
  };
  const error = async (e: OidcClientError | undefined) => {
    captureException(e);
    navigate('/authError');
  };
  return (
    <LoginCallbackHandler onSuccess={success} onError={error}>
      <Loader />
    </LoginCallbackHandler>
  );
};

export default LoginCallbackHandlerWrapper;
