import React from 'react';
import { render, waitFor } from '@testing-library/react';
import RectificationForm from './RectificationForm';
import { axe } from 'jest-axe';

describe('Component', () => {
  it('matches snapshot', async () => {
    const { container } = render(<RectificationForm />);

    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it('passes A11y checks', async () => {
    const { container } = render(<RectificationForm />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
