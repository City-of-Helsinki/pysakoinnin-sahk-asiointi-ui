import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const getTokenFromStorage = Object.entries(sessionStorage).filter(entry =>
  entry[0].includes('oidc.user:')
);

const tokenParsed =
  getTokenFromStorage[0] &&
  JSON.parse(sessionStorage.getItem(getTokenFromStorage[0][0]) as string);

const ProtectedRoute = () => {
  if (!tokenParsed || !tokenParsed.id_token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
