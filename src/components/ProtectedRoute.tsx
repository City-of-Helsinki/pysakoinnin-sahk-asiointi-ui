import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticatedUser, useOidcClientTracking } from 'hds-react';

const ProtectedRoute = () => {
  useOidcClientTracking();
  const user = useAuthenticatedUser();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
