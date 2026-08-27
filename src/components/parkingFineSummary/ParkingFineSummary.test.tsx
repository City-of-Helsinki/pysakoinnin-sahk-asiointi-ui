import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import ParkingFineSummary from './ParkingFineSummary';
import mockFoulData from '../../mocks/mockFoulData';
import { Provider } from 'react-redux';
import store from '../../store';
import { formatDateTime } from '../../utils/helpers';

describe('Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <ParkingFineSummary foulData={mockFoulData} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('passes A11y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <ParkingFineSummary foulData={mockFoulData} />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('renders an empty timestamp without fine data', () => {
    const { container } = render(
      <Provider store={store}>
        <ParkingFineSummary foulData={undefined} />
      </Provider>
    );

    expect(container.querySelector('.info-field p')).toBeEmptyDOMElement();
  });

  it('renders only the fine timestamp when monitoring start is missing', () => {
    render(
      <Provider store={store}>
        <ParkingFineSummary
          foulData={{ ...mockFoulData, monitoringStart: '' }}
        />
      </Provider>
    );

    expect(screen.getByText(formatDateTime(mockFoulData.foulDate))).toBeVisible();
  });
});
