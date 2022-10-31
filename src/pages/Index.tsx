import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { ClientContext } from '../client/ClientProvider';
import FormStepper from '../components/formStepper/FormStepper';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
import ReduxConsumer from '../components/ReduxConsumer';
import WithAuthDemo from '../components/WithAuthDemo';
import ClientConsumer from '../components/ClientConsumer';
import { getClientConfig } from '../client';
import { StoreState } from '../client/redux/index';
import { Button } from 'hds-react';

const Index = (): React.ReactElement => {
  const currentConfig = getClientConfig();
  const clientContext = useContext(ClientContext);
  const state: StoreState = useSelector((storeState: StoreState) => storeState);
  const user = state?.user;
  const [showForm, setShowForm] = useState(false);

  return (
    <PageContent>
      {!!clientContext && clientContext.client ? (
        <>
          <h1>Client-demo </h1>
          <p>
            Kirjautumistapasi on <strong>{currentConfig.label}.</strong>
          </p>
          <p>
            Tässä demossa näytetään kirjautumisikkuna ja komponentteja, jotka
            kuuntelevat muutoksia kirjautumisessa.
          </p>
          <p>
            Voit kirjautua sisään / ulos alla olevasta komponentista tai
            headerista.
          </p>
          <p>Voit myös kirjatua ulos toisessa ikkunassa.</p>
          {user && (
            <div>
              <Button onClick={() => setShowForm(!showForm)} variant="primary">
                {showForm ? 'Sulje lomake' : 'Avaa lomake'}
              </Button>
              {showForm && <FormStepper />}
            </div>
          )}
          <LoginComponent />
          <ReduxConsumer />
          <WithAuthDemo />
          <ClientConsumer />
        </>
      ) : (
        <div>Error:Clientia ei löydy contextista</div>
      )}
    </PageContent>
  );
};

export default Index;
