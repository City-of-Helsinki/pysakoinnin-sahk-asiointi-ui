import React from 'react';
import { TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import './SearchForm.css';

const SearchForm = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div data-testid="searchForm" className="fieldset">
      <p>{t('common:required-fields')}</p>
      <TextInput
        className="field"
        id="refNumber"
        label={t('common:fine-info:ref-number:label')}
        placeholder={t('common:fine-info:ref-number:placeholder')}
        tooltipLabel={t('common:fine-info:ref-number:label')}
        tooltipText={t('common:fine-info:ref-number:tooltip-text')}
        //onChange={function noRefCheck() {}}
        required
        value=""
      />
      <TextInput
        className="field"
        id="regNumber"
        label={t('common:fine-info:reg-number:label')}
        placeholder={t('common:fine-info:reg-number:placeholder')}
        helperText={t('common:fine-info:reg-number:helper-text')}
        //onChange={function noRefCheck() {}}
        required
        value=""
      />
    </div>
  );
};

export default SearchForm;
