/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import { TextInput } from 'hds-react';
import { useTranslation } from 'react-i18next';
import {
  FormId,
  selectFormContent,
  setFormError
} from '../formContent/formContentSlice';
import { ObjectionControlType } from '../../interfaces/objectionInterfaces';
import './SearchForm.css';

interface Props {
  control: ObjectionControlType;
}

const SearchForm = (props: Props): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formContent = useSelector(selectFormContent);
  const movedCarForm = formContent.selectedForm == FormId.MOVEDCAR;
  const formError = formContent.formError;

  return (
    <div data-testid="searchForm" className="fieldset">
      <p className="small-text">{t('common:required-fields')}</p>
      {movedCarForm ? (
        <Controller
          name="transferNumber"
          control={props.control}
          rules={{
            required: t('common:required-field') as string
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
              onChange={e => {
                field.onChange(e);
                // clear form error when the field value is changed
                formError && dispatch(setFormError(null));
              }}
              invalid={!!(fieldState.error || formError)}
              errorText={fieldState.error?.message}
            />
          )}
        />
      ) : (
        <Controller
          name="foulNumber"
          control={props.control}
          rules={{
            required: t('common:required-field') as string
          }}
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
              onChange={e => {
                field.onChange(e);
                formError && dispatch(setFormError(null));
              }}
              invalid={!!(fieldState.error || formError)}
              errorText={fieldState.error?.message}
            />
          )}
        />
      )}
      <Controller
        name="registerNumber"
        control={props.control}
        rules={{
          required: t('common:required-field') as string
        }}
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
            onChange={e => {
              field.onChange(e);
              formError && dispatch(setFormError(null));
            }}
            invalid={!!(fieldState.error || formError)}
            errorText={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
};

export default SearchForm;
