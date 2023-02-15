import React, { useContext } from 'react';
import { ClientContext } from '../client/ClientProvider';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
import LandingPage from '../components/landingPage/LandingPage';
import useUserProfile from '../hooks/useUserProfile';
import { UserProfile } from '../common';
import { GraphQLClientError } from '../graphql/graphqlClient';

const Index = (): React.ReactElement => {
  const clientContext = useContext(ClientContext);
  // No need to add the user to redux here, since all the links will redirect the user
  // to a new page, thus refreshing the store. The user is re-fetched and added to redux in FormStepper.tsx
  const userProfile = useUserProfile() as UserProfile | GraphQLClientError;

  const isUser: boolean =
    userProfile &&
    Object.prototype.hasOwnProperty.call(userProfile, 'firstName');

  return (
    <PageContent>
      {!!clientContext && clientContext.client ? (
        <>
          <h1>Pysäköinnin asiointi</h1>
          {isUser ? <LandingPage /> : <LoginComponent />}
        </>
      ) : (
        <div>Error:Clientia ei löydy contextista</div>
      )}
    </PageContent>
  );
};

export default Index;
