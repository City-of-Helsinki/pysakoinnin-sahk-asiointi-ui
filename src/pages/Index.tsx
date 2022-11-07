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
          <h1>Pysäköinnin Sähköinen Asiointi</h1>
          {user && (
            <div>
              <h2>Hakemukset ja päätökset</h2>
              <p>Sinulla ei ole hakemuksia tai päätöksiä.</p>
              <h2>Lomakkeet</h2>
              <ul>
                <li>
                  <Link href="/oikaisuvaatimus">Tee oikaisuvaatimus</Link>
                </li>
                <li>
                  <Link href="/erapaivansiirto">Siirrä eräpäivää</Link>
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
