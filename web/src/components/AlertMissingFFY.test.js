import { render, screen } from '@testing-library/react';
import { plain as AlertMissingFFY } from './AlertMissingFFY';
import React from 'react';


describe('<AlertMissingFFY />', () => {
  it('displays the alert', () => {
    render(<AlertMissingFFY years={[]} apdId={1} />);
    expect(screen.queryByText('At least one FFY must be selected to continue with your APD.')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/apd/1/apd-overview');
  });

  it('changing apdId affects the link', () => {
    render(<AlertMissingFFY years={[]} apdId={7} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/apd/7/apd-overview');
  });

  it('returns null when years are selected', () => {
    render(<AlertMissingFFY years={['2021']} apdId={1} />);
    expect(screen.queryByText('At least one FFY must be selected to continue with your APD.')).not.toBeInTheDocument()
  });
})