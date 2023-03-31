import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, renderWithConnection, screen } from 'apd-testing-library';
import axios from '../../../util/api';

const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

import {
  plain as AffiliationStatus,
  ApprovalStatus
} from './AffiliationStatus';
import { AFFILIATION_STATUSES } from '../../../constants';

const { DENIED, REQUESTED, REVOKED } = AFFILIATION_STATUSES;

fetchMock.onGet('/states/na').reply(200, {
  stateAdmins: [
    {
      email: 'a@email.com'
    },
    {
      email: 'b@email.com'
    }
  ]
});

const initialProps = {
  state: {
    id: 'na'
  },
  approvalStatus: REQUESTED
};

const setupAffiliationStatus = ({ approvalStatus = REQUESTED } = {}) =>
  renderWithConnection(
    <AffiliationStatus {...initialProps} approvalStatus={approvalStatus} />,
    {
      initialState: {
        user: {
          data: {
            state: {
              id: 'na'
            },
            states: {
              na: approvalStatus
            }
          }
        }
      }
    }
  );

describe('<AffiliationStatus />', () => {
  it('displays the eAPD Logo', () => {
    setupAffiliationStatus();
    expect(screen.getByAltText('eAPD Logo')).toBeInTheDocument();
  });

  it('displays the introduction text', () => {
    setupAffiliationStatus();
    const text = 'The eAPD is designed to help you';
    expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
  });

  it('displays the pending message when approvalStatus is REQUESTED', () => {
    setupAffiliationStatus();
    const text = 'Approval Pending From State Administrator';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays the denied message when approvalStatus is DENIED', () => {
    setupAffiliationStatus({ approvalStatus: DENIED });
    const text = 'Approval Has Been Denied';
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('displays the revoked message when approvalStatus is REVOKED', () => {
    setupAffiliationStatus({ approvalStatus: REVOKED });
    const text = 'Approval Permissions Revoked';
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

const setupApprovalStatus = () =>
  render(
    <ApprovalStatus
      status={REQUESTED}
      mailTo="em@il.com,admin@mo.gov"
      administratorType="State"
    />
  );

describe('<ApprovalStatus />', () => {
  const requestedStatusOptions = {
    status: `Approval Pending From State Administrator`,
    src: '../static/icons/puzzle.svg',
    alt: 'Puzzle Piece Icon',
    width: 57
  };

  it('displays a mailto link', () => {
    setupApprovalStatus();
    const aTag = screen.getByText('State Administrator', { selector: 'a' });
    expect(aTag).toBeInTheDocument();
    expect(aTag.href).toBe('mailto:em@il.com,admin@mo.gov');
  });

  it('displays the status text', () => {
    setupApprovalStatus();
    const statusText = screen.getByText(requestedStatusOptions.status, {
      selector: 'h3'
    });
    expect(statusText).toBeInTheDocument();
  });

  it('displays the img correctly', () => {
    setupApprovalStatus();
    const img = screen.getByAltText(requestedStatusOptions.alt);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', requestedStatusOptions.src);
    expect(img).toHaveAttribute(
      'width',
      requestedStatusOptions.width.toString()
    );
  });
});
