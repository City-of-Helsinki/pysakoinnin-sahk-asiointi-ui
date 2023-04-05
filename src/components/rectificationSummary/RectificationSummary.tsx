/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { useSelector } from 'react-redux';
import { IconDocument, IconPhoto, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { formatBytes } from '../../utils/helpers';
import InfoContainer from '../infoContainer/InfoContainer';
import CustomAccordion from '../customAccordion/CustomAccordion';
import {
  selectFormContent,
  selectFormValues
} from '../formContent/formContentSlice';
import { selectUserProfile } from '../user/userSlice';
import ExtendedTextField from '../extendedTextField/ExtendedTextField';
import useMobileWidth from '../../hooks/useMobileWidth';
import styles from '../styles.module.css';
import './RectificationSummary.css';
import { FileItem } from '../../interfaces/objectionInterfaces';

const RectificationSummary = () => {
  const { t } = useTranslation();
  const selectedForm = useSelector(selectFormContent).selectedForm;
  const formValues = useSelector(selectFormValues);
  const user = useSelector(selectUserProfile);

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
            value={`${user?.firstName} ${user?.lastName}`}
            readOnly
          />
          <TextInput
            id="ssn"
            label={t('common:ssn')}
            value={user?.ssn}
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
            value={formValues?.newEmail ? formValues?.newEmail : user?.email}
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
            value={t(`rectificationForm:${formValues?.deliveryDecision}`)}
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
            {useMobileWidth() ? (
              <ExtendedTextField content={formValues?.description} />
            ) : (
              <p>{formValues?.description}</p>
            )}
          </div>
          {formValues?.attachments.length > 0 && (
            <div>
              <label className={styles['text-label']}>
                {t('rectificationForm:attachments:label')}
              </label>
              <ul className="file-list">
                {formValues?.attachments.map((item: FileItem) => (
                  <li key={item.fileName} className="file-list-item">
                    {item.mimeType.startsWith('image') ? (
                      <IconPhoto aria-hidden />
                    ) : (
                      <IconDocument aria-hidden />
                    )}
                    <div className="file-list-item-title">
                      <span className="file-list-item-name">
                        {item.fileName}
                      </span>
                      <span className="file-list-item-size">
                        ({formatBytes(item.size)})
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {formValues?.poaFile?.fileName && (
            <div>
              <label className={styles['text-label']}>
                {t('rectificationForm:poa')}
              </label>
              <div className="file-list-item">
                {formValues?.poaFile.mimeType.startsWith('image') ? (
                  <IconPhoto aria-hidden />
                ) : (
                  <IconDocument aria-hidden />
                )}
                <div className="file-list-item-title">
                  <span className="file-list-item-name">
                    {formValues?.poaFile.fileName}
                  </span>
                  <span className="file-list-item-size">
                    ({formatBytes(formValues?.poaFile.size)})
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hide-on-print">
        <CustomAccordion heading={t(`${selectedForm}:stepper:step2`)}>
          <InfoContainer />
        </CustomAccordion>
      </div>
      <div className="show-on-print" aria-hidden="true">
        <InfoContainer />
      </div>
    </>
  );
};

export default RectificationSummary;
