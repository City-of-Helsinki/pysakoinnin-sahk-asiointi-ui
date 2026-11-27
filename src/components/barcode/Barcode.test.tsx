import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Barcode from './Barcode';
import i18n from '../../utils/i18n';
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

  it('copies barcode to clipboard and shows success only after completion', async () => {
    let resolveWrite: () => void = () => {};
    const writeText = vi.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveWrite = resolve;
        })
    );
    Object.assign(window.navigator, { clipboard: { writeText } });

    const testBarcode = 'test-123';
    render(<Barcode barcode={testBarcode} />);

    const button = await screen.findByTestId('copy-to-clipboard');
    fireEvent.click(button);

    expect(writeText).toHaveBeenCalledWith(testBarcode);
    const successText = i18n.t('common:barcode:toast-body');
    expect(screen.queryByText(successText)).not.toBeInTheDocument();

    await act(async () => {
      resolveWrite();
    });

    expect(await screen.findByText(successText)).toBeInTheDocument();
  });
});
