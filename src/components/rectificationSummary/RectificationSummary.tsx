import React from 'react';
import { useSelector } from 'react-redux';
import { Accordion, TextArea, TextInput } from 'hds-react';

import './RectificationSummary.css';
import { useTranslation } from 'react-i18next';
import InfoContainer from '../infoContainer/InfoContainer';
import { selectFormContent } from '../formContent/formContentSlice';

const RectificationSummary = () => {
  const { t } = useTranslation();
  const selectedForm = useSelector(selectFormContent).selectedForm;

  return (
    <>
      <h2 className="rectification-summary-header">
        {t('rectification:rectification-info')}
      </h2>
      <div className="rectification-summary-container">
        <div className="rectification-summary-details">
          <TextInput
            id="relation"
            label={t(`rectification:relation-info:${selectedForm}:relation`)}
            value={t(`rectification:relation-info:${selectedForm}:driver`)}
            readOnly
          />
          <TextInput
            id="name"
            label={t('common:name')}
            value="Etunimi Sukunimi"
            readOnly
          />
          <TextInput
            id="ssn"
            label={t('common:ssn')}
            value="123456-123A"
            readOnly
          />
          <TextInput
            id="rectification-address"
            label={t('rectification:address')}
            value="Elimäenkatu 5"
            readOnly
          />
          <div className="rectification-summary-subgrid">
            <TextInput
              id="zipcode"
              label={t('rectification:zipcode')}
              value="00100"
              readOnly
            />
            <TextInput
              id="city"
              label={t('rectification:city')}
              value="Helsinki"
              readOnly
            />
          </div>
          <TextInput
            id="email"
            label={t('common:email')}
            value="etunimi@email.com"
            readOnly
          />
          <TextInput
            id="phone"
            label={t('common:phone')}
            value="+358401234567"
            readOnly
          />
          <TextInput
            id="IBAN"
            label={t('rectification:IBAN')}
            value="FI9780001700903330"
            readOnly
          />
          <TextInput
            id="decision"
            label={t('rectification:decision-choice')}
            value="Pysäköinnin asiointikansiooni"
            readOnly
          />
        </div>
        <div className="rectification-summary-content">
          <TextArea
            readOnly
            id="rectification-content"
            label={t('rectification:rectification-content')}
            value="Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, kielelleni kerkiävät, hampahilleni hajoovat.Veli kulta, veikkoseni, kaunis kasvinkumppalini! Lähe nyt kanssa laulamahan, saa kera sanelemahan yhtehen yhyttyämme, kahta'alta käytyämme! Harvoin yhtehen yhymme, saamme toinen toisihimme näillä raukoilla rajoilla, poloisilla Pohjan mailla.Lyökämme käsi kätehen, sormet sormien lomahan, lauloaksemme hyviä, parahia pannaksemme, kuulla noien kultaisien, tietä mielitehtoisien, nuorisossa nousevassa, kansassa kasuavassa: noita saamia sanoja, virsiä virittämiä vyöltä vanhan Väinämöisen, alta ahjon Ilmarisen, päästä kalvan Kaukomielen, Joukahaisen jousen tiestä, Pohjan peltojen periltä, Kalevalan kankahilta.Niit' ennen isoni lauloi kirvesvartta vuollessansa; niitä äitini opetti väätessänsä värttinätä, minun lasna lattialla eessä polven pyöriessä, maitopartana pahaisna, piimäsuuna pikkaraisna. Sampo ei puuttunut sanoja eikä Louhi luottehia: vanheni sanoihin sampo, katoi Louhi luottehisin, virsihin Vipunen kuoli, Lemminkäinen leikkilöihin.Viel' on muitaki sanoja, ongelmoita oppimia: tieohesta tempomia, kanervoista katkomia, risukoista riipomia, vesoista vetelemiä, päästä heinän hieromia, raitiolta ratkomia, paimenessa käyessäni, lasna karjanlaitumilla, metisillä mättähillä, kultaisilla kunnahilla, mustan Muurikin jälessä, Kimmon kirjavan keralla.Vilu mulle virttä virkkoi, sae saatteli runoja. Virttä toista tuulet toivat, meren aaltoset ajoivat. Linnut liitteli sanoja, puien latvat lausehia. Mieleni minun tekevi, aivoni ajattelevi lähteäni laulamahan, saa'ani sanelemahan, sukuvirttä suoltamahan, lajivirttä laulamahan. Sanat suussani sulavat, puhe'et putoelevat, kielelleni kerkiävät, hampahilleni hajoovat.Veli kulta, veikkoseni, kaunis kasvinkumppalini! Lähe nyt kanssa laulamahan, saa kera sanelemahan yhtehen yhyttyämme, kahta'alta käytyämme! Harvoin yhtehen yhymme, saamme toinen toisihimme näillä raukoilla rajoilla, poloisilla Pohjan mailla.Lyökämme käsi kätehen, sormet sormien lomahan, lauloaksemme hyviä, parahia pannaksemme, kuulla noien kultaisien, tietä mielitehtoisien, nuorisossa nousevassa, kansassa kasuavassa: noita saamia sanoja, virsiä virittämiä vyöltä vanhan Väinämöisen, alta ahjon Ilmarisen, päästä kalvan Kaukomielen 2374 merkkiä"
          />
        </div>

        <Accordion
          id="summary"
          heading={t(`${selectedForm}:stepper:step2`)}
          className="rectification-summary-fine-details">
          <InfoContainer />
        </Accordion>
      </div>
    </>
  );
};

export default RectificationSummary;
