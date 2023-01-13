import React from 'react';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import { FormId, selectFormContent } from '../formContent/formContentSlice';
import { RectificationControlType } from '../../interfaces/formInterfaces';
import './SearchForm.css';
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

interface Props {
  control: RectificationControlType;
}

const SearchForm = (props: Props): React.ReactElement => {
  const { t } = useTranslation();
  const formContent = useSelector(selectFormContent);
  const movedCarForm = formContent.selectedForm == FormId.MOVEDCAR;

  return (
    <div data-testid="searchForm" className="fieldset">
      <p className="small-text">{t('common:required-fields')}</p>
      {movedCarForm ? (
        <Controller
          name="invoiceNumber"
          control={props.control}
          rules={{
            required: t('common:fine-info:invoice-number:error') as string
          }}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              className="field"
              id="invoiceNumber"
              label={t('common:fine-info:invoice-number:label')}
              placeholder={t('common:fine-info:invoice-number:placeholder')}
              tooltipLabel={t('common:fine-info:invoice-number:label')}
              tooltipText={t('common:fine-info:invoice-number:tooltip-text')}
              required
              invalid={fieldState.error ? true : false}
              errorText={fieldState.error?.message}
            />
          )}
        />
      ) : (
        <Controller
          name="refNumber"
          control={props.control}
          rules={{ required: t('common:fine-info:ref-number:error') as string }}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              className="field"
              id="refNumber"
              label={t('common:fine-info:ref-number:label')}
              placeholder={t('common:fine-info:ref-number:placeholder')}
              tooltipLabel={t('common:fine-info:ref-number:label')}
              tooltipText={t('common:fine-info:ref-number:tooltip-text')}
              required
              invalid={fieldState.error ? true : false}
              errorText={fieldState.error?.message}
            />
          )}
        />
      )}
      <Controller
        name="regNumber"
        control={props.control}
        rules={{ required: t('common:fine-info:reg-number:error') as string }}
        render={({ field, fieldState }) => (
          <TextInput
            {...field}
            className="field"
            id="regNumber"
            label={t('common:fine-info:reg-number:label')}
            placeholder={t('common:fine-info:reg-number:placeholder')}
            helperText={
              movedCarForm
                ? t('common:fine-info:reg-number:helper-text:moved-car')
                : t('common:fine-info:reg-number:helper-text:common')
            }
            required
            invalid={fieldState.error ? true : false}
            errorText={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
};

export default SearchForm;
