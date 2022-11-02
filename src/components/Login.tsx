import React from 'react';
import LoginInfo from './LoginInfo';
import LogoutInfo from './LogoutInfo';
import WithAuth from '../client/WithAuth';

const Login = (): React.ReactElement => (
  <div>{WithAuth(LogoutInfo, LoginInfo)}</div>
);

export default Login;
