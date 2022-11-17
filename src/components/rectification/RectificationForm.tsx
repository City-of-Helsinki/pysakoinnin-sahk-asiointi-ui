import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FileInput,
  IconCheckCircle,
  Link,
  RadioButton,
  Select,
  SelectionGroup,
  TextInput
} from 'hds-react';
import { useClient } from '../../client/hooks';

const RectificationForm = () => {
  const { t } = useTranslation();

  const { getUser } = useClient();
  const user = getUser();

  const [checked, setChecked] = useState(false);
  const [newEmailSelected, setNewEmailSelected] = useState(false);
  const [vehicleRelation, setVehicleRelation] = useState('driver');

  const [decision, setDecision] = useState('toParkingService');

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setNewEmailSelected(e.target.checked);
  };

  const handleVehicleRelation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleRelation(e.target.value);
  };

  const handleDecision = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecision(e.target.value);
  };

  const relations = ['driver', 'owner', 'holder'];
  return (
    <>
      <p>{t('common:required-fields')}</p>
      <div className="userDetails">
        <SelectionGroup label="Olen ajoneuvon *">
          {relations.map(relation => (
            <RadioButton
              key={relation}
              label={t(`rectification:${relation}`)}
              id={relation}
              value={relation}
              checked={vehicleRelation === relation}
              onChange={handleVehicleRelation}
            />
          ))}
        </SelectionGroup>

        <TextInput
          id="fullName"
          readOnly
          label={t('common:name')}
          defaultValue={user?.name as string}
        />
        <IconCheckCircle />
        <TextInput
          id="ssn"
          readOnly
          label={t('common:ssn')}
          defaultValue="123456-789A"
        />
        <IconCheckCircle />
        <TextInput
          id="email"
          readOnly
          label={t('common:email')}
          defaultValue={user?.email as string}
        />
        <IconCheckCircle />

        <hr />
        <p>
          <IconCheckCircle />
          {t('common:fetched-from-profile')}
          <Link
            href={window._env_.REACT_APP_PROFILE_UI_URL}
            size="M"
            external
            openInNewTab
            openInExternalDomainAriaLabel={t('common:aria:open-external')}
            openInNewTabAriaLabel={t('common:aria:open-new-tab')}>
            {t('common:helsinki-profile-link')}
          </Link>
        </p>

        <Checkbox
          label="Haluan ilmoitukset asian käsittelystä eri sähköpostiosoitteeseen"
          id="newEmail"
          onChange={handleCheckbox}
          checked={checked}
        />
        <TextInput
          id="newEmailAddress"
          disabled={!newEmailSelected}
          label="Sähköpostiosoite"
        />
        <TextInput
          id="newEmailConfirm"
          disabled={!newEmailSelected}
          label="Kirjoita sähköpostiosoite uudelleen"
        />

        <TextInput
          id="address"
          label="Osoite *"
          placeholder="Esim. Elimäenkatu 5"
        />
        <TextInput
          id="zipCode"
          label="Postinumero *"
          placeholder="Esim. 00100"
        />
        <TextInput
          id="city"
          label="Postitoimipaikka *"
          placeholder="Esim. Helsinki"
        />

        <Select
          label="Maakoodi *"
          options={[{ label: 'Suomi (+358)' }]}
          defaultValue={{ label: 'Suomi (+358)' }}
        />
        <TextInput
          id="phone"
          label="Puhelinnumero *"
          placeholder="Esim. 401234567"
        />

        <TextInput
          id="IBAN"
          label="Pankkitilinumero (IBAN) *"
          placeholder="Esim. FI9780001700903330"
        />

        <SelectionGroup label="Haluan päätöksen *">
          <RadioButton
            label="Pysäköinnin asiointikansiooni"
            id="toParkingService"
            value="toParkingService"
            onChange={handleDecision}
            checked={decision === 'toParkingService'}
          />
          <RadioButton
            label="Kirjeitse antamaani osoitteeseen"
            id="byMail"
            value="byMail"
            onChange={handleDecision}
            checked={decision === 'byMail'}
          />
        </SelectionGroup>

        <FileInput label="test" id="test" onChange={() => null} />
      </div>
    </>
  );
};

export default RectificationForm;
