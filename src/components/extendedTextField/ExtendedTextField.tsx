import React, { useState } from 'react';
import { Button, ButtonVariant, IconAngleDown, IconAngleUp } from 'hds-react';
import { useTranslation } from 'react-i18next';

type ExtendedTextFieldProps = {
  content: string;
};

const ExtendedTextField = (props: ExtendedTextFieldProps) => {
  const { content } = props;
  const { t } = useTranslation();

  const TO_EXTEND = 500;
  const CONTENT_SLICE = 450;

  const [expandable, setExpandable] = useState(false);
  const [extended, setExtended] = useState(false);

  if (content.length > TO_EXTEND && expandable === false) {
    setExpandable(true);
  }

  const expandText = () =>
    expandable && !extended ? setExtended(true) : setExtended(false);

  return expandable ? (
    <>
      <p>{extended ? content : content.slice(0, CONTENT_SLICE)}</p>
      <Button
        aria-label={extended ? t('common:show-less') : t('common:show-more')}
        variant={ButtonVariant.Supplementary}
        aria-expanded={extended}
        iconEnd={
          extended ? <IconAngleUp aria-hidden /> : <IconAngleDown aria-hidden />
        }
        onClick={expandText}>
        {extended ? t('common:show-less') : t('common:show-more')}
      </Button>
    </>
  ) : (
    <p>{content}</p>
  );
};

export default ExtendedTextField;
