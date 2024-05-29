import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Barcode from './Barcode';
import { axe } from 'vitest-axe';

describe('Component', () => {
  it('matches snapshot', () => {
    const { container } = render(<Barcode barcode="test-123" />);
    expect(container).toMatchSnapshot();
  });

  it('passes a11y validation', async () => {
    const { container } = render(<Barcode barcode="test-123" />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('copies barcode to clipboard', async () => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve())
      }
    });

    const testBarcode = 'test-123';
    render(<Barcode barcode={testBarcode} />);

    const button = await screen.findByTestId('copy-to-clipboard');
    fireEvent.click(button);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      testBarcode
    );
  });
});
