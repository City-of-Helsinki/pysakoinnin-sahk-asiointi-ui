import React from 'react';
import ImageViewer from './ImageViewer';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { formatBase64String } from '../../utils/helpers';
import mockFoulData from '../../mocks/mockFoulData';

describe('Component', () => {
  const images = mockFoulData.attachments;

  it('passes A11Y checks', async () => {
    const { container } = render(<ImageViewer images={images} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Opens dialog with correct content', async () => {
    render(<ImageViewer images={images} />);

    const clickable = screen.getAllByTestId('clickable-image')[0];
    fireEvent.click(clickable);

    expect(document.getElementById('imageViewer')).toBeInTheDocument();

    const image = screen.getAllByTestId('image')[0];
    expect(image).toHaveAttribute('src', formatBase64String(images[0]));
  });
});
