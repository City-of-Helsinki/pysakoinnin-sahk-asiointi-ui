import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ClientContext } from '../client/ClientProvider';
import ParkingFineAppeal from '../components/parkingFineAppeal/ParkingFineAppeal';
import LoginComponent from '../components/Login';
import PageContent from '../components/PageContent';
import { StoreState } from '../client/redux/index';

const Index = (): React.ReactElement => {
  const clientContext = useContext(ClientContext);
  const state: StoreState = useSelector((storeState: StoreState) => storeState);
  const user = state?.user;

  return (
    <PageContent>
      {!!clientContext && clientContext.client ? (
        <>
          <h1>Pysäköinnin Sähköinen Asiointi</h1>
          {user && (
            <div>
              <ParkingFineAppeal />
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
