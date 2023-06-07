import React, { FC } from 'react';
import './CustomTag.css';

interface CustomTagProps {
  text: string;
  color?: string;
  size?: string;
  textColor?: 'white' | 'black';
}

/**
 * CustomTag combines the color property of StatusLabel and rounded borders of RoundedTag from HDS
 */
const CustomTag: FC<CustomTagProps> = ({ text, color, size, textColor }) => (
  <div
    className="custom-tag-container"
    style={{
      background: color || 'var(--color-silver-medium-light)'
    }}>
    <span
      style={{
        fontSize: size === 'm' ? '1rem' : '0.875rem',
        color: textColor === 'white' ? 'white' : 'black'
      }}>
      {text}
    </span>
  </div>
);

export default CustomTag;
