import React, { useState } from 'react';
import { Button, IconLinkExternal, RadioButton, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import './ExtendDueDateForm.css';

const ExtendDueDateForm = (): React.ReactElement => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<number>();
  const handleSelectedChange = (value: number) => {
    setSelectedItem(value);
  };

  return (
    <div>
      <p>{t('common:required-fields')}</p>
      <div className="info-container">
        <TextInput
          id="refNumber"
          label={t('common:fine-info:ref-number:label')}
          defaultValue="12345678"
          readOnly
        />
        <TextInput
          id="regNumber"
          label={t('common:fine-info:reg-number:label')}
          defaultValue="ABC-123"
          readOnly
        />
        <div />
        <TextInput
          id="sum"
          label={t('common:fine-info:sum')}
          defaultValue="80,00 EUR"
          readOnly
        />
        <TextInput
          id="dueDate"
          label={t('common:fine-info:due-date')}
          defaultValue="2.12.2019"
          readOnly
        />
        <TextInput
          id="newDueDate"
          label={t('due-date:new-due-date')}
          defaultValue="2.1.2020"
          readOnly
        />
      </div>
      <div>
        <p>{t('common:selection')}</p>
        <RadioButton
          id="extendRadio"
          name="extendRadio"
          label={t('due-date:radio-button:extend')}
          value="1"
          checked={selectedItem === 1}
          onChange={() => handleSelectedChange(1)}
        />
        <RadioButton
          id="payRadio"
          name="payRadio"
          label={t('due-date:radio-button:pay')}
          value="2"
          checked={selectedItem === 2}
          onChange={() => handleSelectedChange(2)}
        />
      </div>
      <Button
        className="pay-button"
        disabled={selectedItem !== 2}
        iconRight={<IconLinkExternal />}
        //onClick={}
        variant="secondary">
        {t('common:pay')}
      </Button>
    </div>
  );
};

export default ExtendDueDateForm;
