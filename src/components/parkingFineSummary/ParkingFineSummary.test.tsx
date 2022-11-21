import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import ParkingFineSummary from './ParkingFineSummary';

describe('Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<ParkingFineSummary />);
    expect(container).toMatchSnapshot();
  });

  it('passes A11y checks', async () => {
    const { container } = render(<ParkingFineSummary />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
