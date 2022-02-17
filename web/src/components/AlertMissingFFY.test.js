import { render, screen } from '@testing-library/react';
import { plain as AlertMissingFFY } from './AlertMissingFFY';
import React from 'react';

describe('<AlertMissingFFY />', () => {
  it('displays the alert', () => {
    render(<AlertMissingFFY years={[]} apdId="0123456789abcdef01234567" />);
    expect(
      screen.queryByText(
        'At least one FFY must be selected to continue with your APD.'
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/apd/0123456789abcdef01234567/apd-overview'
    );
  });

  it('changing apdId affects the link', () => {
    render(<AlertMissingFFY years={[]} apdId="abcdef012345678901234567" />);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      '/apd/abcdef012345678901234567/apd-overview'
    );
  });

  it('returns null when years are selected', () => {
    render(
      <AlertMissingFFY years={['2021']} apdId="0123456789abcdef01234567" />
    );
    expect(
      screen.queryByText(
        'At least one FFY must be selected to continue with your APD.'
      )
    ).not.toBeInTheDocument();
  });
});
