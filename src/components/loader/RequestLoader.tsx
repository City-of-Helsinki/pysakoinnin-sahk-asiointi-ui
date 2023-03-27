import React, { FC } from 'react';
import { selectIsLoading } from './loadingSlice';
import { useSelector } from 'react-redux';
import Loader from './Loader';

/**
 * An overlay component for App.tsx that becomes visible when redux loading.isLoading = true.
 * The loading state is triggered in the axios interceptor.
 */
const RequestLoader: FC = () => {
  const isLoading = useSelector(selectIsLoading);

  return <>{isLoading && <Loader />}</>;
};

export default RequestLoader;
