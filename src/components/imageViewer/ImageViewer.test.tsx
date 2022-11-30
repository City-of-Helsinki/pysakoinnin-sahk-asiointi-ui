import React from 'react';
import ImageViewer from './ImageViewer';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

describe('Component', () => {
  const imageUrls = ['https://via.placeholder.com/600.png'];

  it('passes A11Y checks', async () => {
    const { container } = render(<ImageViewer images={imageUrls} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('Opens dialog with correct content', async () => {
    render(<ImageViewer images={imageUrls} />);

    const clickable = await screen.findByTestId('clickable-image');
    fireEvent.click(clickable);

    expect(document.getElementById('imageViewer')).toBeInTheDocument();

    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('src', imageUrls[0]);
  });
});
