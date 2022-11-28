import React, { useContext } from 'react';
import { Link } from 'hds-react';
import { ClientContext } from '../client/ClientProvider';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
import { useClient } from '../client/hooks';

const Index = (): React.ReactElement => {
  const clientContext = useContext(ClientContext);
  const { getUser } = useClient();
  const user = getUser();

  return (
    <PageContent>
      {!!clientContext && clientContext.client ? (
        <>
          <h1>Pysäköinnin asiointi</h1>
          {user && (
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
