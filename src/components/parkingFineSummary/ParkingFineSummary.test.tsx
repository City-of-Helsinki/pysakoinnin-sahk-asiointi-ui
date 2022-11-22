import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import ParkingFineSummary from './ParkingFineSummary';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ParkingFineSummary />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <ParkingFineSummary />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
