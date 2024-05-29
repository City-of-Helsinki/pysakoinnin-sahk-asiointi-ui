/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExtendedTextField from './ExtendedTextField';
import { t } from 'i18next';

const longContent =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.';
const maxLength = 450;

describe('ExtendedTextField', () => {
  test('renders content without expanding', () => {
    const content = 'Lorem ipsum dolor sit amet';
    const { getByText, queryByText } = render(
      <ExtendedTextField content={content} />
    );

    expect(getByText(content)).toBeInTheDocument();
    expect(queryByText(t<string>('common:show-more'))).toBeNull();
    expect(queryByText(t<string>('common:show-less'))).toBeNull();
  });

  test('expands content when "Show more" button is clicked', () => {
    const { getByText, queryByText } = render(
      <ExtendedTextField content={longContent} />
    );

    expect(getByText(longContent.slice(0, maxLength))).toBeInTheDocument();
    expect(getByText(t<string>('common:show-more'))).toBeInTheDocument();
    expect(queryByText(t<string>('common:show-less'))).toBeNull();

    fireEvent.click(getByText(t<string>('common:show-more')));

    expect(getByText(longContent)).toBeInTheDocument();
    expect(queryByText(t<string>('common:show-more'))).toBeNull();
    expect(getByText(t<string>('common:show-less'))).toBeInTheDocument();
  });

  test('collapses content when "Show less" button is clicked', () => {
    const { getByText, queryByText } = render(
      <ExtendedTextField content={longContent} />
    );

    fireEvent.click(getByText(t<string>('common:show-more')));

    expect(getByText(longContent)).toBeInTheDocument();
    expect(queryByText(t<string>('common:show-more'))).toBeNull();
    expect(getByText(t<string>('common:show-less'))).toBeInTheDocument();

    fireEvent.click(getByText(t<string>('common:show-less')));

    expect(getByText(longContent.slice(0, maxLength))).toBeInTheDocument();
    expect(getByText(t<string>('common:show-more'))).toBeInTheDocument();
    expect(queryByText(t<string>('common:show-less'))).toBeNull();
  });
});
