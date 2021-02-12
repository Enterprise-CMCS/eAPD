import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  plain as StateAffiliationStatus,
  PendingApproval
} from './StateAffiliationStatus';
import { STATE_AFFILIATION_STATUSES } from '../constants';

const {
  DENIED,
  REQUESTED,
  REVOKED
} = STATE_AFFILIATION_STATUSES;

const initialProps = {
  state: {
    id: 'ak'
  },
  stateStatus: REQUESTED
};

// mock useEffect so we don't make an API call
jest.spyOn(React, 'useEffect').mockImplementation(() => {});

const setup = (props = {}) => (
  render(<StateAffiliationStatus {...initialProps} {...props} />)
);

describe('<StateAffiliationStatus />', () => {
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

describe('<PendingApproval />', () => {
  it('displays a mailto link', () => {
    render(<PendingApproval mailTo='em@il.com,admin@mo.gov' />)
    const aTag = screen.getByText('State Administrator', { selector: 'a' });
    expect(aTag).toBeInTheDocument();
    expect(aTag.href).toBe('mailto:em@il.com,admin@mo.gov');
  });
});
