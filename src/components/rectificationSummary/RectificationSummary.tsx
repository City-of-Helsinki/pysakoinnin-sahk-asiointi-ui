/* eslint-disable sonarjs/no-duplicate-string */
import React, { FC } from 'react';
import { IconDocument, IconPhoto, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatBytes } from '../../utils/helpers';
import InfoContainer from '../infoContainer/InfoContainer';
import CustomAccordion from '../customAccordion/CustomAccordion';
import {
  ObjectionForm,
  ObjectionFormFiles
} from '../../interfaces/objectionInterfaces';
import ExtendedTextField from '../extendedTextField/ExtendedTextField';
import useMobileWidth from '../../hooks/useMobileWidth';
import { FoulData } from '../../interfaces/foulInterfaces';
import { TransferData } from '../../interfaces/transferInterfaces';
import styles from '../styles.module.css';
import './RectificationSummary.css';

interface Props {
  form?: ObjectionForm;
  formType: string;
  foulData?: FoulData;
  transferData?: TransferData;
  formFiles?: ObjectionFormFiles;
  editMode: boolean;
}

const RectificationSummary: FC<Props> = ({
  form,
  formType,
  foulData,
  transferData,
  formFiles,
  editMode
}) => {
  const { t } = useTranslation();
  const formValues = form;
  const deliveryDecision = formValues?.deliveryDecision
    ? formValues.deliveryDecision
    : formValues?.sendDecisionViaEService
    ? 'toParkingService'
    : 'byMail';
  const poaFile = formFiles?.poaFile;
  const attachments = formFiles?.attachments;

  return (
    <>
      <h2 className="rectification-summary-title">
        {t('rectificationForm:rectification-info')}
      </h2>
      <div className="rectification-summary-container">
        <div className="rectification-summary-details">
          <TextInput
            id="relation"
            label={t(`rectificationForm:relation-info:relation`)}
            value={t(
              `rectificationForm:relation-info:${formValues?.authorRole}`
            )}
            readOnly
          />
          <TextInput
            id="name"
            label={t('common:name')}
            value={`${formValues?.firstName} ${formValues?.lastName}`}
            readOnly
          />
          <TextInput
            id="ssn"
            label={t('common:ssn')}
            value={formValues?.ssn}
            readOnly
          />
          <TextInput
            id="rectification-address"
            label={t('rectificationForm:address')}
            value={formValues?.address?.streetAddress}
            readOnly
          />
          <div className="rectification-summary-subgrid">
            <TextInput
              id="zipcode"
              label={t('rectificationForm:zipcode')}
              value={formValues?.address?.postCode}
              readOnly
            />
            <TextInput
              id="city"
              label={t('rectificationForm:city')}
              value={formValues?.address?.postOffice}
              readOnly
            />
          </div>
          <TextInput
            id="email"
            label={t('common:email')}
            value={
              formValues?.toSeparateEmail
                ? formValues?.newEmail
                : formValues?.email
            }
            readOnly
          />
          <TextInput
            id="phone"
            label={t('common:phone')}
            value={`${formValues?.mobilePhone}`}
            readOnly
          />
          <TextInput
            id="IBAN"
            label={t('rectificationForm:IBAN')}
            value={formValues?.iban}
            readOnly
          />
          <TextInput
            id="deliveryDecision"
            label={t('rectificationForm:delivery-decision')}
            value={t(`rectificationForm:${deliveryDecision}`)}
            readOnly
          />
        </div>
        <div className="rectification-summary-contents">
          <div className="rectification-summary-rectification-content">
            <label
              htmlFor="rectification-content"
              className={styles['text-label']}>
              {t('rectificationForm:rectification-content')}
            </label>
            {useMobileWidth() && formValues?.description ? (
              <ExtendedTextField content={formValues?.description} />
            ) : (
              <p>{formValues?.description}</p>
            )}
          </div>
          {attachments && attachments.length > 0 && (
            <div>
              <label className={styles['text-label']}>
                {t('rectificationForm:attachments:label')}
              </label>
              <ul className="file-list">
                {attachments.map((item: File, i: number) => (
                  <li key={i} className="file-list-item">
                    {item.type.startsWith('image') ? (
                      <IconPhoto aria-hidden />
                    ) : (
                      <IconDocument aria-hidden />
                    )}
                    <div className="file-list-item-title">
                      <span className="file-list-item-name">{item.name}</span>
                      {item.size && (
                        <span className="file-list-item-size">
                          ({formatBytes(item.size)})
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {poaFile && poaFile.length > 0 && (
            <div>
              <label className={styles['text-label']}>
                {t('rectificationForm:poa')}
              </label>
              <div className="file-list-item">
                {poaFile[0].type.startsWith('image') ? (
                  <IconPhoto aria-hidden />
                ) : (
                  <IconDocument aria-hidden />
                )}
                <div className="file-list-item-title">
                  <span className="file-list-item-name">{poaFile[0].name}</span>
                  {poaFile[0].size && (
                    <span className="file-list-item-size">
                      ({formatBytes(poaFile[0].size)})
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hide-on-print">
        <CustomAccordion heading={t(`${formType}:stepper:step2`)}>
          <InfoContainer
            transferNumber={form?.metadata?.transferNumber}
            selectedForm={formType}
            foulData={foulData}
            transferData={transferData}
            editMode={editMode}
          />
        </CustomAccordion>
      </div>
      <div className="show-on-print" aria-hidden="true">
        <InfoContainer
          transferNumber={form?.metadata?.transferNumber}
          selectedForm={formType}
          foulData={foulData}
          transferData={transferData}
          editMode={editMode}
        />
      </div>
    </>
  );
};

export default RectificationSummary;
