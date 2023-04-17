import { shallow } from 'enzyme';
import React from 'react';
import { AFFILIATION_STATUSES } from '@cms-eapd/common';

import FederalAdmin from '../../admin/fed-admin/FederalAdmin';
import { ApprovalStatus } from '../state-dashboard/AffiliationStatus';

import { plain as FederalDashboard } from './FederalDashboard';

const { APPROVED, DENIED } = AFFILIATION_STATUSES;

const initialProps = {
  approvalStatus: APPROVED
};

const setup = (props = {}) =>
  shallow(<FederalDashboard {...initialProps} {...props} />);

describe('<FederalDashboard /> component', () => {
  it('renders <FederalAdmin /> when Affiliation Status is Approved', () => {
    const component = setup();
    expect(component.find(FederalAdmin).exists()).toBe(true);
  });

  it('renders <ApprovalStatus /> otherwise', () => {
    const component = setup({ approvalStatus: DENIED });
    expect(component.find(ApprovalStatus).exists()).toBe(true);
  });
});
