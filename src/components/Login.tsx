import React from 'react';
import LoginInfo from './LoginInfo';
import Loader from './loader/Loader';
import WithAuth from '../client/WithAuth';

const Login = (): React.ReactElement => (
  <div>{WithAuth(Loader, LoginInfo)}</div>
);

export default Login;
