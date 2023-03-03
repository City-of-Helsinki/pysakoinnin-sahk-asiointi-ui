import React from 'react';
import LoginInfo from './LoginInfo';
import Loader from './Loader';
import WithAuth from '../client/WithAuth';

const Login = (): React.ReactElement => (
  <div>{WithAuth(Loader, LoginInfo)}</div>
);

export default Login;
