import React, { ReactNode, useState } from 'react';
import {
  Button,
  ButtonVariant,
  IconAngleDown,
  IconAngleUp,
  IconSize
} from 'hds-react';
import { useTranslation } from 'react-i18next';
import './CustomAccordion.css';

const CustomAccordion = ({
  heading,
  children
}: {
  heading: string;
  children: ReactNode;
}) => {
  const { t } = useTranslation();
  const [accordionOpen, setAccordionOpen] = useState(false);
  return (
    <div className="custom-accordion-container">
      <Button
        onClick={() => setAccordionOpen(!accordionOpen)}
        iconEnd={
          accordionOpen ? (
            <IconAngleUp size={IconSize.ExtraLarge} aria-hidden />
          ) : (
            <IconAngleDown size={IconSize.ExtraLarge} aria-hidden />
          )
        }
        className="custom-accordion custom-accordion-header"
        variant={ButtonVariant.Supplementary}>
        {heading}
      </Button>
      {accordionOpen && (
        <>
          {children}
          <Button
            onClick={() => setAccordionOpen(!accordionOpen)}
            iconEnd={<IconAngleUp size={IconSize.ExtraLarge} aria-hidden />}
            className="custom-accordion close"
            variant={ButtonVariant.Supplementary}>
            {t('common:close')}
          </Button>
        </>
      )}
    </div>
  );
};

export default CustomAccordion;
