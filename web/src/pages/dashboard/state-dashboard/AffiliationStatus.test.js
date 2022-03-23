import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  plain as AffiliationStatus,
  ApprovalStatus
} from './AffiliationStatus';
import { AFFILIATION_STATUSES } from '../../../constants';

const { DENIED, REQUESTED, REVOKED } = AFFILIATION_STATUSES;

const initialProps = {
  state: {
    id: 'ak'
  },
  approvalStatus: REQUESTED
};

// mock useEffect so we don't make an API call
jest.spyOn(React, 'useEffect').mockImplementation(() => {});

const setup = (props = {}) =>
  render(<AffiliationStatus {...initialProps} {...props} />);

describe('<AffiliationStatus />', () => {
  it('displays the eAPD Logo', () => {
    setup();
    expect(screen.getByAltText('eAPD Logo')).toBeInTheDocument();
  });

  it('displays the introduction text', () => {
    setup();
    const text = 'The eAPD is designed to help you';
    expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
  });

  it('displays the pending message when approvalStatus is REQUESTED', () => {
    setup();
    const text = 'Approval Pending From State Administrator';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays the denied message when approvalStatus is DENIED', () => {
    setup({ approvalStatus: DENIED });
    const text = 'Approval Has Been Denied';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays the revoked message when approvalStatus is REVOKED', () => {
    setup({ approvalStatus: REVOKED });
    const text = 'Approval Permissions Revoked';
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe('<ApprovalStatus />', () => {
  const requestedStatusOptions = {
    status: `Approval Pending From State Administrator`,
    src: '../static/icons/puzzle.svg',
    alt: 'Puzzle Piece Icon',
    width: 57
  };

  it('displays a mailto link', () => {
    render(
      <ApprovalStatus
        status={REQUESTED}
        mailTo="em@il.com,admin@mo.gov"
        administratorType="State"
      />
    );
    const aTag = screen.getByText('State Administrator', { selector: 'a' });
    expect(aTag).toBeInTheDocument();
    expect(aTag.href).toBe('mailto:em@il.com,admin@mo.gov');
  });

  it('displays the status text', () => {
    render(
      <ApprovalStatus
        status={REQUESTED}
        mailTo="em@il.com,admin@mo.gov"
        administratorType="State"
      />
    );
    const statusText = screen.getByText(requestedStatusOptions.status, {
      selector: 'h3'
    });
    expect(statusText).toBeInTheDocument();
  });

  it('displays the img correctly', () => {
    render(
      <ApprovalStatus
        status={REQUESTED}
        mailTo="em@il.com,admin@mo.gov"
        administratorType="State"
      />
    );
    const img = screen.getByAltText(requestedStatusOptions.alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', requestedStatusOptions.src);
    expect(img).toHaveAttribute(
      'width',
      requestedStatusOptions.width.toString()
    );
  });
});
