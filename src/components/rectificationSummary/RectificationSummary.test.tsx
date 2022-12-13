import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import RectificationSummary from './RectificationSummary';
import store from '../../store';
import { Provider } from 'react-redux';

describe('Component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationSummary />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('passes A11Y checks', async () => {
    const { container } = render(
      <Provider store={store}>
        <RectificationSummary />
      </Provider>
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
