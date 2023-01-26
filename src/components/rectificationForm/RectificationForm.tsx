/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, FieldValues } from 'react-hook-form';
import {
  Checkbox,
  FileInput,
  IconCheckCircle,
  Link,
  RadioButton,
  Select,
  TextArea,
  TextInput
} from 'hds-react';
import { useClient } from '../../client/hooks';
import useMobileWidth from '../../hooks/useMobileWidth';
import {
  FileItem,
  FormId,
  selectFormContent,
  RectificationControlType
} from '../formContent/formContentSlice';
import FieldLabel from '../fieldLabel/FieldLabel';
import ErrorLabel from '../errorLabel/ErrorLabel';
import './RectificationForm.css';

type Language = 'fi' | 'en' | 'sv';

interface Props {
  control: RectificationControlType;
}

const RectificationForm = (props: Props) => {
  const { t, i18n } = useTranslation();
  const { getUser } = useClient();
  const user = getUser();
  const selectedForm = useSelector(selectFormContent).selectedForm;
  const movedCarFormSelected = selectedForm === FormId.MOVEDCAR;
  const isMobileWidth = useMobileWidth();
  const rectificationMaxLength =
    window._env_.REACT_APP_RECTIFICATION_CHAR_LIMIT;

  const relations = movedCarFormSelected
    ? ['owner', 'poa-holder']
    : ['driver', 'owner', 'poa-holder'];

  const setFiles = (files: File[], type: string, field: FieldValues) => {
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
        return field.onChange(fileList[0]);
      case 'attachments':
        return field.onChange(fileList);
    }
  };

  return (
    <>
      <p>{t('common:required-fields')}</p>
      <div>
        <div className="rectification-info-container">
          <div className="rectification-user-section">
            <Controller
              name="relation"
              control={props.control}
              rules={{ required: t('common:required-field') as string }}
              render={({ field, fieldState }) => (
                <div>
                  <FieldLabel
                    text={t(`rectificationForm:relation-info:relation`)}
                    required={true}
                  />
                  <div className="radio-group-container">
                    {relations.map(relation => (
                      <RadioButton
                        key={relation}
                        label={t(`rectificationForm:relation-info:${relation}`)}
                        id={relation}
                        value={relation}
                        checked={relation === field.value}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    ))}
                    {fieldState.error && (
                      <ErrorLabel text={fieldState.error.message} />
                    )}
                  </div>
                </div>
              )}
            />

            <div className="rectification-form-user-details">
              <div>
                <FieldLabel text={t('common:name')} required={true} />
                <IconCheckCircle
                  aria-label={t('common:fetched-from-profile-aria')}
                  color={'var(--color-info)'}
                />
              </div>
              <p>{user?.name as string}</p>
              <div>
                <FieldLabel text={t('common:ssn')} required={true} />
                <IconCheckCircle
                  aria-label={t('common:fetched-from-profile-aria')}
                  color={'var(--color-info)'}
                />
              </div>
              <p>123456-789A</p>
              <div>
                <FieldLabel text={t('common:email')} required={true} />
                <IconCheckCircle
                  aria-label={t('common:fetched-from-profile-aria')}
                  color={'var(--color-info)'}
                />
              </div>
              <p>{user?.email as string}</p>
            </div>
          </div>

          <div className="rectification-poa-fileinput">
            <Controller
              name="poaFile"
              control={props.control}
              render={({ field }) => (
                <FileInput
                  language={i18n.language as Language}
                  label={t('rectificationForm:attach-poa')}
                  id="rectificationPOAFile"
                  onChange={e => setFiles(e, 'poa', field)}
                  dragAndDrop={!isMobileWidth}
                  accept={'.png, .jpg, .pdf'}
                />
              )}
            />
          </div>
        </div>
        <hr />
        <div className="rectification-link-to-profile">
          <IconCheckCircle aria-hidden="true" color={'var(--color-info)'} />

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
          <Controller
            name="toSeparateEmail"
            control={props.control}
            render={({ field }) => {
              const checkboxField = field;
              return (
                <>
                  <Checkbox
                    label={t('rectificationForm:to-separate-email')}
                    id="toSeparateEmail"
                    onChange={checkboxField.onChange}
                    checked={checkboxField.value}
                  />
                  <Controller
                    name="newEmailAddress"
                    control={props.control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="newEmailAddress"
                        disabled={!checkboxField.value}
                        label={t('common:email')}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="newEmailConfirm"
                    control={props.control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        id="newEmailConfirm"
                        disabled={!checkboxField.value}
                        label={t('common:verify-email')}
                        required
                      />
                    )}
                  />
                </>
              );
            }}
          />

          <Controller
            name="address"
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                id="address"
                label={t('rectificationForm:address')}
                placeholder="Esim. Elimäenkatu 5"
                required
              />
            )}
          />
          <div className="rectification-subgrid">
            <Controller
              name="zipCode"
              control={props.control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="zipCode"
                  label={t('rectificationForm:zipcode')}
                  placeholder="Esim. 00100"
                  required
                />
              )}
            />
            <Controller
              name="city"
              control={props.control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="city"
                  label={t('rectificationForm:city')}
                  placeholder="Esim. Helsinki"
                  required
                />
              )}
            />

            <Select
              label={t('rectificationForm:area-code')}
              options={[{ label: '(+358)' }]}
              defaultValue={{ label: '(+358)' }}
              required
            />
            <Controller
              name="phone"
              control={props.control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="phone"
                  label={t('rectificationForm:phone')}
                  placeholder="Esim. 401234567"
                  required
                />
              )}
            />
          </div>

          <Controller
            name="IBAN"
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                id="IBAN"
                label={t('rectificationForm:IBAN')}
                required
                placeholder="Esim. FI9780001700903330"
              />
            )}
          />

          <Controller
            name="rectificationContent"
            control={props.control}
            rules={{
              maxLength: rectificationMaxLength
            }}
            render={({ field }) => (
              <>
                <TextArea
                  {...field}
                  label={t('rectificationForm:rectification-content')}
                  required
                  id="rectification-content"
                  className="rectification-textarea"
                  helperText={`${
                    field.value?.length
                  }/${rectificationMaxLength} ${t('common:characters')}`}
                  errorText={
                    field.value?.length >= rectificationMaxLength
                      ? t('rectificationForm:description-over-limit')
                      : ''
                  }
                  invalid={field.value?.length >= rectificationMaxLength}
                />
              </>
            )}
          />

          <Controller
            name="attachments"
            control={props.control}
            render={({ field }) => (
              <FileInput
                language={i18n.language as Language}
                multiple
                className="rectification-fileinput"
                label={t('rectificationForm:attachments')}
                id="rectificationAttachments"
                onChange={e => setFiles(e, 'attachments', field)}
                dragAndDrop={!isMobileWidth}
                accept={'.png, .jpg, .pdf'}
              />
            )}
          />

          <Controller
            name="deliveryDecision"
            control={props.control}
            rules={{ required: t('common:required-field') as string }}
            render={({ field, fieldState }) => (
              <div className="rectification-delivery-decision">
                <FieldLabel
                  text={t(`rectificationForm:relation-info:relation`)}
                  required={true}
                />
                <div className="radio-group-container">
                  <RadioButton
                    label={t('rectificationForm:toParkingService')}
                    id="toParkingService"
                    value="toParkingService"
                    checked={field.value === 'toParkingService'}
                    onChange={e => field.onChange(e.target.value)}
                  />
                  <RadioButton
                    label={t('rectificationForm:byMail')}
                    id="byMail"
                    value="byMail"
                    checked={field.value === 'byMail'}
                    onChange={e => field.onChange(e.target.value)}
                  />
                  {fieldState.error && (
                    <ErrorLabel text={fieldState.error.message} />
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default RectificationForm;
