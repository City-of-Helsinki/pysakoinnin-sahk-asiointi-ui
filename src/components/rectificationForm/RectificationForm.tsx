/* eslint-disable sonarjs/no-duplicate-string */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  FileInput,
  IconCheckCircle,
  Link,
  RadioButton,
  Select,
  SelectionGroup,
  TextArea,
  TextInput
} from 'hds-react';
import { useClient } from '../../client/hooks';
import useMobileWidth from '../../hooks/useMobileWidth';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import { FileItem, setAttachments, setPOAFile } from './rectificationFormSlice';
import './RectificationForm.css';

type Language = 'fi' | 'en' | 'sv';

const RectificationForm = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { getUser } = useClient();
  const user = getUser();
  const selectedForm = useSelector(selectFormContent).selectedForm;
  const movedCarFormSelected = selectedForm === FormId.MOVEDCAR;

  const relations = movedCarFormSelected
    ? ['owner', 'poa-holder']
    : ['driver', 'owner', 'poa-holder'];

  const [checked, setChecked] = useState(false);
  const [newEmailSelected, setNewEmailSelected] = useState(false);
  const [vehicleRelation, setVehicleRelation] = useState(relations[0]);
  const [currentCharacters, setCurrentCharacters] = useState(0);

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

  const setFiles = (files: File[], type: string) => {
    const fileList: FileItem[] = [];
    for (const file of files) {
      const fileItem = {
        name: file.name,
        size: file.size,
        type: file.type
      };
      fileList.push(fileItem);
    }
    switch (type) {
      case 'poa':
        return dispatch(setPOAFile(fileList[0]));
      case 'attachments':
        return dispatch(setAttachments(fileList));
    }
  };

  return (
    <>
      <p>{t('common:required-fields')}</p>
      <div>
        <div className="rectification-info-container">
          <div className="rectification-user-section">
            <SelectionGroup
              label={t(`rectificationForm:relation-info:relation`)}
              required>
              {relations.map(relation => (
                <RadioButton
                  key={relation}
                  label={t(`rectificationForm:relation-info:${relation}`)}
                  id={relation}
                  value={relation}
                  checked={vehicleRelation === relation}
                  onChange={handleVehicleRelation}
                />
              ))}
            </SelectionGroup>

            <div
              className={`rectification-form-user-details ${
                movedCarFormSelected ? 'small' : ''
              }`}>
              <TextInput
                required
                id="fullName"
                readOnly
                label={t('common:name')}
                defaultValue={user?.name as string}
              />
              <IconCheckCircle
                className="rectification-form-checkmark"
                aria-label={t('common:fetched-from-profile-aria')}
              />
              <TextInput
                required
                id="ssn"
                readOnly
                label={t('common:ssn')}
                defaultValue="123456-789A"
              />
              <IconCheckCircle
                className="rectification-form-checkmark"
                aria-label={t('common:fetched-from-profile-aria')}
              />
              <TextInput
                required
                id="email"
                readOnly
                label={t('common:email')}
                defaultValue={user?.email as string}
              />
              <IconCheckCircle
                className="rectification-form-checkmark"
                aria-label={t('common:fetched-from-profile-aria')}
              />
            </div>
          </div>
          <div className="rectification-poa-fileinput">
            <FileInput
              language={i18n.language as Language}
              label={t('rectificationForm:attach-poa')}
              id="rectificationPOAFile"
              onChange={e => setFiles(e, 'poa')}
              dragAndDrop={!useMobileWidth()}
              accept={'.png, .jpg, .pdf'}
            />
          </div>
        </div>
        <hr />
        <div className="rectification-link-to-profile">
          <IconCheckCircle aria-hidden="true" />

          <span>{t('common:fetched-from-profile')}</span>
          <Link
            href={window._env_.REACT_APP_PROFILE_UI_URL}
            size="M"
            external
            openInNewTab
            openInExternalDomainAriaLabel={t('common:aria:open-external')}
            openInNewTabAriaLabel={t('common:aria:open-new-tab')}>
            {t('common:helsinki-profile-link')}
          </Link>
        </div>

        <div className="rectification-form-container">
          <Checkbox
            label={t('rectificationForm:to-separate-email')}
            id="newEmail"
            onChange={handleCheckbox}
            checked={checked}
          />
          <TextInput
            id="newEmailAddress"
            disabled={!newEmailSelected}
            label={t('common:email')}
            required
          />
          <TextInput
            id="newEmailConfirm"
            disabled={!newEmailSelected}
            label={t('common:verify-email')}
            required
          />

          <TextInput
            id="address"
            label={t('rectificationForm:address')}
            placeholder="Esim. Elim??enkatu 5"
            required
          />
          <div className="rectification-subgrid">
            <TextInput
              id="zipCode"
              label={t('rectificationForm:zipcode')}
              placeholder="Esim. 00100"
              required
            />
            <TextInput
              id="city"
              label={t('rectificationForm:city')}
              placeholder="Esim. Helsinki"
              required
            />

            <Select
              label={t('rectificationForm:area-code')}
              options={[{ label: '(+358)' }]}
              defaultValue={{ label: '(+358)' }}
              required
            />
            <TextInput
              id="phone"
              label={t('rectificationForm:phone')}
              placeholder="Esim. 401234567"
              required
            />
          </div>

          <TextInput
            id="IBAN"
            label={t('rectificationForm:IBAN')}
            required
            placeholder="Esim. FI9780001700903330"
          />

          <TextArea
            label={t('rectificationForm:rectification-content')}
            required
            id="rectification-content"
            className="rectification-textarea"
            helperText={`${currentCharacters}/${
              window._env_.REACT_APP_RECTIFICATION_CHAR_LIMIT
            } ${t('common:characters')}`}
            onChange={e => setCurrentCharacters(e.target.value.length)}
            errorText={
              currentCharacters >=
              window._env_.REACT_APP_RECTIFICATION_CHAR_LIMIT
                ? t('rectificationForm:description-over-limit')
                : ''
            }
            invalid={
              currentCharacters >=
              window._env_.REACT_APP_RECTIFICATION_CHAR_LIMIT
            }
          />

          <FileInput
            language={i18n.language as Language}
            multiple
            className="rectification-fileinput"
            label={t('rectificationForm:attachments')}
            id="rectificationAttachments"
            onChange={e => setFiles(e, 'attachments')}
            dragAndDrop={!useMobileWidth()}
            accept={'.png, .jpg, .pdf'}
          />

          <SelectionGroup
            label={t('rectificationForm:decision-choice')}
            required
            className="rectification-decision-choice">
            <RadioButton
              label={t('rectificationForm:toParkingService')}
              id="toParkingService"
              value="toParkingService"
              onChange={handleDecision}
              checked={decision === 'toParkingService'}
            />
            <RadioButton
              label={t('rectificationForm:byMail')}
              id="byMail"
              value="byMail"
              onChange={handleDecision}
              checked={decision === 'byMail'}
            />
          </SelectionGroup>
        </div>
      </div>
    </>
  );
};

export default RectificationForm;
