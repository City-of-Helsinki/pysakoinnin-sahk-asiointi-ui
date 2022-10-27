import React from 'react';
import {
  Button,
  Fieldset,
  IconArrowLeft,
  IconArrowRight,
  TextInput,
  Stepper
} from 'hds-react';
import { useTranslation } from 'react-i18next';

const LoginForm = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <div>
      <form>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'normal',
            lineHeight: '48px'
          }}>
          {t('common:form-title')}
        </h1>
        <Stepper
          language="fi"
          //onStepClick={() => {}}
          selectedStep={0}
          stepHeading
          steps={[
            {
              label: t('parking-fine:stepper:step1'),
              state: 0
            },
            {
              label: t('parking-fine:stepper:step2'),
              state: 2
            },
            {
              label: t('parking-fine:stepper:step3'),
              state: 2
            },
            {
              label: t('parking-fine:stepper:step4'),
              state: 2
            }
          ]}
        />
        <Fieldset heading="" style={{ maxWidth: '400px' }}>
          <p>{t('common:required-fields')}</p>
          <TextInput
            id="refNumber"
            label={t('parking-fine:step1:ref-number:label')}
            placeholder={t('parking-fine:step1:ref-number:placeholder')}
            tooltipLabel={t('parking-fine:step1:ref-number:label')}
            tooltipText={t('parking-fine:step1:ref-number:tooltip-text')}
            //onChange={function noRefCheck() {}}
            required
            style={{
              width: '500px'
            }}
            value=""
          />
          <TextInput
            id="regNumber"
            label={t('parking-fine:step1:reg-number:label')}
            placeholder={t('parking-fine:step1:reg-number:placeholder')}
            helperText={t('parking-fine:step1:reg-number:helper-text')}
            //onChange={function noRefCheck() {}}
            required
            style={{
              width: '500px',
              marginTop: '18px'
            }}
            value=""
          />
        </Fieldset>
        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: '24px',
            height: '100px',
            justifyContent: 'flex-start'
          }}>
          <Button disabled iconLeft={<IconArrowLeft />} variant="primary">
            {t('common:previous')}
          </Button>
          <Button
            iconRight={<IconArrowRight />}
            //onClick={function noRefCheck() {}}
            variant="primary">
            {t('common:next')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
