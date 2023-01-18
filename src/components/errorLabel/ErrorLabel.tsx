import React from 'react';
import { IconAlertCircleFill } from 'hds-react';
import './ErrorLabel.css';

const ErrorLabel = ({ text }: { text?: string }) => (
  <span className="error-label">
    <IconAlertCircleFill className="error-icon" color="var(--color-error)" />
    {text}
  </span>
);

export default ErrorLabel;
