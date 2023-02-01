import React, { useContext } from 'react';
import { Link } from 'hds-react';
import { ClientContext } from '../client/ClientProvider';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
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
          {isUser && (
            <div>
              <h2>Lähetetyt oikaisuvaatimukset</h2>
              <p>Et ole lähettänyt yhtään oikaisuvaatimusta.</p>
              <h2>Asiointilomakkeet</h2>
              <ul>
                <li>
                  <Link href="/virhemaksu">
                    Tee oikaisuvaatimus pysäköintivirhemaksuun
                  </Link>
                </li>
                <li>
                  <Link href="/ajoneuvonsiirto">
                    Tee ajoneuvon siirron oikaisuvaatimus
                  </Link>
                </li>
                <li>
                  <Link href="/erapaivansiirto">
                    Siirrä pysäköintivirhemaksun eräpäivää 30 päivällä
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <LoginComponent />
        </>
      ) : (
        <div>Error:Clientia ei löydy contextista</div>
      )}
    </PageContent>
  );
};

export default Index;
