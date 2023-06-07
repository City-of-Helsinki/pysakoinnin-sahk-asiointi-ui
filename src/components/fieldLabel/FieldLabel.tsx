import React from 'react';
import './FieldLabel.css';

const FieldLabel = ({
  text,
  required
}: {
  text: string;
  required?: boolean;
}) => (
  <legend className="field-label">
    {text}
    {required && <span className="required-icon">*</span>}
  </legend>
);

export default FieldLabel;
