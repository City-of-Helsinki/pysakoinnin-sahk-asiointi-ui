import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { setSubmitDisabled } from '../formContent/formContentSlice';
import Barcode from '../barcode/Barcode';
import './ReimbursementSummary.css';

const ReimbursementSummary = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSubmitDisabled(false));
  }, [dispatch]);

  return (
    <div className="summary-body">
      <div data-testid="reimbursementSummary" className="summary-container">
        <TextInput
          id="moveTimeStamp"
          label={t('moved-car:move-timestamp:label')}
          value={t('moved-car:move-timestamp:placeholder')}
          readOnly
        />
        <TextInput
          id="refNumber"
          label={t('common:fine-info:ref-number:label')}
          value={t('common:fine-info:ref-number:placeholder')}
          readOnly
        />
        <hr />
        <TextInput
          id="moveReason"
          label={t('moved-car:move-reason:label')}
          value={t('moved-car:move-reason:placeholder')}
          readOnly
        />
        <div />
        <hr />
        <TextInput
          id="moveType"
          label={t('moved-car:move-type:label')}
          value={t('moved-car:move-type:placeholder')}
          readOnly
        />
        <div />
        <hr />
        <TextInput
          className="address-field"
          id="addressFrom"
          label={t('moved-car:address-from:label')}
          value={t('moved-car:address-from:placeholder')}
          readOnly
        />
        <TextInput
          className="info-field"
          id="addressFromDetails"
          label={t('moved-car:address-from:details-label')}
          value={t('moved-car:address-from:details-placeholder')}
          readOnly
        />
        <TextInput
          id="addressTo"
          label={t('moved-car:address-to:label')}
          value={t('moved-car:address-to:placeholder')}
          readOnly
        />
        <TextInput
          id="addressToDetails"
          label={t('moved-car:address-to:details-label')}
          value={t('moved-car:address-to:details-placeholder')}
          readOnly
        />
        <hr />
        <TextInput
          id="reimbursementSum"
          label={t('moved-car:reimbursement-sum:label')}
          value={t('moved-car:reimbursement-sum:placeholder')}
          readOnly
        />
        <TextInput
          id="reimbursementDueDate"
          label={t('common:fine-info:due-date:label')}
          value={t('common:fine-info:due-date:placeholder')}
          readOnly
        />
        <hr />
        <Barcode
          barcode="430123730001230560012400000000000000000100018714210302"
          className="wide-field"
        />
      </div>
    </div>
  );
};

export default ReimbursementSummary;
