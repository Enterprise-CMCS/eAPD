import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  plain as AffiliationStatus,
  ApprovalStatus
} from './AffiliationStatus';
import { AFFILIATION_STATUSES } from '../constants';

const { DENIED, REQUESTED, REVOKED } = AFFILIATION_STATUSES;

const initialProps = {
  state: {
    id: 'ak'
  },
  stateStatus: REQUESTED
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
    const text = 'The CMS HITECH APD app is';
    expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
  });

  it('displays the pending message when stateStatus is REQUESTED', () => {
    setup();
    const text = 'Approval Pending From State Administrator';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays the denied message when stateStatus is DENIED', () => {
    setup({ stateStatus: DENIED });
    const text = 'Approval Has Been Denied';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays the revoked message when stateStatus is REVOKED', () => {
    setup({ stateStatus: REVOKED });
    const text = 'Approval Permissions Revoked';
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe('<ApprovalStatus />', () => {
  const options = {
    status: 'This is a status',
    src: '../static/icons/icon.svg',
    alt: 'This is ALT text',
    width: 57
  };

  it('displays a mailto link', () => {
    render(
      <ApprovalStatus mailTo="em@il.com,admin@mo.gov" options={options} />
    );
    const aTag = screen.getByText('State Administrator', { selector: 'a' });
    expect(aTag).toBeInTheDocument();
    expect(aTag.href).toBe('mailto:em@il.com,admin@mo.gov');
  });

  it('displays the status text', () => {
    render(
      <ApprovalStatus mailTo="em@il.com,admin@mo.gov" options={options} />
    );
    const statusText = screen.getByText(options.status, { selector: 'h3' });
    expect(statusText).toBeInTheDocument();
  });

  it('displays the img correctly', () => {
    render(
      <ApprovalStatus mailTo="em@il.com,admin@mo.gov" options={options} />
    );
    const img = screen.getByAltText(options.alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', options.src);
    expect(img).toHaveAttribute('width', options.width.toString());
  });
});
