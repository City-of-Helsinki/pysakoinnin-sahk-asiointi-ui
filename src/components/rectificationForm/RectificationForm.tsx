/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-magic-numbers */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Controller, UseFormGetValues } from 'react-hook-form';
import {
  Checkbox,
  FileInput,
  IconCheckCircle,
  Link,
  RadioButton,
  TextArea,
  TextInput
} from 'hds-react';
import { extractIBAN } from 'ibantools';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import {
  ObjectionForm,
  ObjectionFormFiles,
  ObjectionControlType,
  AuthorRole
} from '../../interfaces/objectionInterfaces';
import { selectUserProfile } from '../user/userSlice';
import FieldLabel from '../fieldLabel/FieldLabel';
import ErrorLabel from '../errorLabel/ErrorLabel';
import './RectificationForm.css';
import { useMediaQueryLessThan } from '../../hooks/useMediaQuery';

type Language = 'fi' | 'en' | 'sv';

interface Props {
  control: ObjectionControlType;
  values: UseFormGetValues<ObjectionForm>;
  onSubmitPoaFile: (files: File[]) => void;
  onSubmitAttachmentFiles: (files: File[]) => void;
  formFiles: ObjectionFormFiles;
}

const RectificationForm: FC<Props> = ({
  control,
  values,
  onSubmitPoaFile,
  onSubmitAttachmentFiles,
  formFiles
}) => {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUserProfile);
  const selectedForm = useSelector(selectFormContent).selectedForm;
  const movedCarFormSelected = selectedForm === FormId.MOVEDCAR;
  const isMobileWidth = useMediaQueryLessThan('m');
  const rectificationMaxLength =
    window._env_.REACT_APP_RECTIFICATION_CHAR_LIMIT;

  const relations = movedCarFormSelected
    ? [AuthorRole.Owner, AuthorRole.Possessor]
    : [AuthorRole.Driver, AuthorRole.Owner, AuthorRole.Possessor];

  // Author role has to be selected
  const isValidAuthorRole = (field?: string | number) =>
    field && typeof field === 'string' ? field !== AuthorRole.Undefined : true;

  // Required if POA holder selected as the author role
  const isValidPOAFile = () =>
    values().authorRole !== AuthorRole.Possessor ||
    formFiles.poaFile.length > 0;

  // Required if toSeparateEmail checkbox selected
  const isValidEmail = (field?: string) =>
    !values().toSeparateEmail || field !== '';

  // Required if email field is not empty, and if so, emails have to match
  const isValidEmailConfirmation = (field?: string) =>
    values().newEmail === '' || field === values().newEmail;

  const numberOfAttachmentsIsValid = () => formFiles.attachments.length <= 3;

  const isValidIBAN = (field?: string) => {
    if (field) {
      const iban = extractIBAN(field);
      return iban.valid && iban.countryCode === 'FI';
    }
    return true;
  };

  return (
    <>
      <p>{t('common:required-fields')}</p>
      <div>
        <div className="rectification-info-container">
          <Controller
            name="authorRole"
            control={control}
            rules={{ validate: isValidAuthorRole }}
            render={({ field, fieldState }) => (
              <>
                <div className="radio-group-section">
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
                      <ErrorLabel text={t<string>('common:required-field')} />
                    )}
                  </div>
                </div>
                <div className="rectification-form-user-details">
                  <div>
                    <div>
                      <FieldLabel text={t('common:name')} required={true} />
                      <IconCheckCircle
                        aria-label={t<string>(
                          'common:fetched-from-profile-aria'
                        )}
                        color={'var(--color-info)'}
                      />
                    </div>
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                    <div>
                      <FieldLabel text={t('common:ssn')} required={true} />
                      <IconCheckCircle
                        aria-label={t<string>(
                          'common:fetched-from-profile-aria'
                        )}
                        color={'var(--color-info)'}
                      />
                    </div>
                    <p>{user?.ssn}</p>
                    <div>
                      <FieldLabel text={t('common:email')} required={true} />
                      <IconCheckCircle
                        aria-label={t<string>(
                          'common:fetched-from-profile-aria'
                        )}
                        color={'var(--color-info)'}
                      />
                    </div>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <div className="rectification-poa-fileinput">
                  <Controller
                    name="poaFile"
                    control={control}
                    rules={{
                      validate: isValidPOAFile
                    }}
                    render={({ field }) => (
                      <>
                        {/*
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore */}
                        <FileInput
                          language={i18n.language as Language}
                          label={t('rectificationForm:attach-poa:label')}
                          id="rectificationPOAFile"
                          onChange={e => field.onChange(onSubmitPoaFile(e))}
                          dragAndDrop={!isMobileWidth}
                          accept={'.jpg, .pdf'}
                          maxSize={5 * 1024 * 1024}
                          helperText={t<string>(
                            'rectificationForm:attach-poa:helper-text'
                          )}
                          {...(formFiles.poaFile.length > 0 && {
                            defaultValue: formFiles.poaFile
                          })}
                        />
                        {values().authorRole === AuthorRole.Possessor &&
                          formFiles.poaFile.length === 0 && (
                            <ErrorLabel
                              text={t<string>(
                                'rectificationForm:errors:poa-required'
                              )}
                            />
                          )}
                      </>
                    )}
                  />
                </div>
              </>
            )}
          />
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
            openInExternalDomainAriaLabel={t<string>(
              'common:aria:open-external'
            )}
            openInNewTabAriaLabel={t<string>('common:aria:open-new-tab')}>
            {t('common:helsinki-profile-link')}
          </Link>
        </div>

        <div className="rectification-form-container">
          <Controller
            name="toSeparateEmail"
            control={control}
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
                    name="newEmail"
                    control={control}
                    rules={{
                      validate: isValidEmail,
                      pattern: {
                        /* has to contain @ character and no spaces */
                        value: /^\S+@\S+$/i,
                        message: t('rectificationForm:errors:invalid-email')
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <TextInput
                        {...field}
                        id="newEmailAddress"
                        disabled={!checkboxField.value}
                        label={t('common:email')}
                        required={checkboxField.value}
                        invalid={checkboxField.value && !!fieldState.error}
                        errorText={
                          checkboxField.value &&
                          fieldState.error?.type === 'validate'
                            ? t<string>('common:required-field')
                            : fieldState.error
                            ? fieldState.error?.message
                            : undefined
                        }
                      />
                    )}
                  />
                  <Controller
                    name="newEmailConfirm"
                    control={control}
                    rules={{
                      validate: isValidEmailConfirmation,
                      pattern: /^\S+@\S+$/i
                    }}
                    render={({ field, fieldState }) => (
                      <TextInput
                        {...field}
                        id="newEmailConfirm"
                        disabled={!checkboxField.value}
                        label={t('common:verify-email')}
                        required={checkboxField.value}
                        invalid={checkboxField.value && !!fieldState.error}
                        errorText={
                          checkboxField.value && fieldState.error
                            ? t<string>(
                                'rectificationForm:errors:invalid-email'
                              )
                            : undefined
                        }
                      />
                    )}
                  />
                </>
              );
            }}
          />

          <Controller
            name="address.streetAddress"
            control={control}
            rules={{ required: t('common:required-field') as string }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                id="address"
                label={t('rectificationForm:address')}
                placeholder="Esim. Elimäenkatu 5"
                required
                invalid={!!fieldState.error}
                errorText={fieldState.error?.message}
              />
            )}
          />
          <div className="rectification-subgrid">
            <Controller
              name="address.postCode"
              control={control}
              rules={{ required: t('common:required-field') as string }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  id="zipCode"
                  label={t('rectificationForm:zipcode')}
                  placeholder="Esim. 00100"
                  required
                  invalid={!!fieldState.error}
                  errorText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="address.postOffice"
              control={control}
              rules={{ required: t('common:required-field') as string }}
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  id="city"
                  label={t('rectificationForm:city')}
                  placeholder="Esim. Helsinki"
                  required
                  invalid={!!fieldState.error}
                  errorText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <Controller
            name="mobilePhone"
            control={control}
            rules={{
              required: t('common:required-field') as string,
              pattern: {
                /* only numbers, + character (at the start) and spaces allowed */
                value: /^[ ]*[+]?[ ]*[0-9]+[0-9 ]*$/i,
                message: t('rectificationForm:errors:invalid-phone')
              }
            }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                id="phone"
                label={t('rectificationForm:phone')}
                placeholder="Esim. +358401234567"
                required
                invalid={!!fieldState.error}
                errorText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="iban"
            control={control}
            rules={{
              required: t('common:required-field') as string,
              validate: isValidIBAN
            }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                id="IBAN"
                label={t('rectificationForm:IBAN')}
                required
                placeholder="Esim. FI97 8000 1700 9033 30"
                invalid={!!fieldState.error}
                errorText={
                  fieldState.error?.type === 'required'
                    ? fieldState.error?.message
                    : fieldState.error
                    ? t<string>('rectificationForm:errors:invalid-iban')
                    : undefined
                }
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              required: t('common:required-field') as string,
              maxLength: rectificationMaxLength
            }}
            render={({ field, fieldState }) => (
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
                  field.value && field.value.length > rectificationMaxLength
                    ? t<string>(
                        'rectificationForm:errors:description-over-limit'
                      )
                    : fieldState.error
                    ? t<string>('common:required-field')
                    : ''
                }
                invalid={
                  !!fieldState.error ||
                  (field.value
                    ? field.value.length > rectificationMaxLength
                    : false)
                }
              />
            )}
          />

          <div className="rectification-attachments">
            <Controller
              name="attachments"
              control={control}
              rules={{
                validate: numberOfAttachmentsIsValid
              }}
              render={({ field }) => (
                <>
                  {/*
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore */}
                  <FileInput
                    language={i18n.language as Language}
                    multiple
                    className="rectification-fileinput"
                    label={t('rectificationForm:attachments:label')}
                    id="rectificationAttachments"
                    onChange={e => field.onChange(onSubmitAttachmentFiles(e))}
                    {...(formFiles.attachments.length > 0 && {
                      defaultValue: formFiles.attachments
                    })}
                    dragAndDrop={!isMobileWidth}
                    accept={'.jpg, .pdf'}
                    maxSize={5 * 1024 * 1024}
                    helperText={t<string>(
                      'rectificationForm:attachments:helper-text'
                    )}
                  />
                  {formFiles.attachments.length > 3 && (
                    <div className="rectification-attachments-error">
                      <ErrorLabel
                        text={t<string>(
                          'rectificationForm:errors:too-many-attachments'
                        )}
                      />
                    </div>
                  )}
                </>
              )}
            />
          </div>

          <Controller
            name="deliveryDecision"
            control={control}
            rules={{ required: t('common:required-field') as string }}
            render={({ field, fieldState }) => (
              <div className="rectification-delivery-decision radio-group-section">
                <FieldLabel
                  text={t(`rectificationForm:delivery-decision`)}
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
