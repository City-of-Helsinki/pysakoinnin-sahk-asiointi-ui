import React, { ReactNode, useState } from 'react';
import { Button, IconAngleDown, IconAngleUp } from 'hds-react';
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
        iconRight={
          accordionOpen ? (
            <IconAngleUp size="xl" />
          ) : (
            <IconAngleDown size="xl" />
          )
        }
        className="custom-accordion custom-accordion-header hide-on-print"
        variant="supplementary">
        {heading}
      </Button>
      {accordionOpen && (
        <>
          {children}
          <Button
            onClick={() => setAccordionOpen(!accordionOpen)}
            iconRight={<IconAngleUp />}
            className="custom-accordion close"
            variant="supplementary">
            {t('common:close')}
          </Button>
        </>
      )}
    </div>
  );
};

export default CustomAccordion;
