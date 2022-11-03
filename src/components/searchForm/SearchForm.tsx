import React from 'react';
import { Fieldset, TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import './SearchForm.css';

const SearchForm = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div>
      <Fieldset className="fieldset" heading="">
        <p>{t('common:required-fields')}</p>
        <TextInput
          className="field"
          id="refNumber"
          label={t('parking-fine:step1:ref-number:label')}
          placeholder={t('parking-fine:step1:ref-number:placeholder')}
          tooltipLabel={t('parking-fine:step1:ref-number:label')}
          tooltipText={t('parking-fine:step1:ref-number:tooltip-text')}
          //onChange={function noRefCheck() {}}
          required
          value=""
        />
        <TextInput
          className="field"
          id="regNumber"
          label={t('parking-fine:step1:reg-number:label')}
          placeholder={t('parking-fine:step1:reg-number:placeholder')}
          helperText={t('parking-fine:step1:reg-number:helper-text')}
          //onChange={function noRefCheck() {}}
          required
          value=""
        />
      </Fieldset>
    </div>
  );
};

export default SearchForm;
