import { shallow } from 'enzyme';
import React from 'react';
import { AFFILIATION_STATUSES } from '../constants';

import FederalAdmin from './admin/FederalAdmin';
import { ApprovalStatus } from '../components/AffiliationStatus';

import { plain as FederalDashboard } from './FederalDashboard';

const initialProps = {
  stateStatus: AFFILIATION_STATUSES.APPROVED
};

const setup = (props = {}) =>
  shallow(<FederalDashboard {...initialProps} {...props} />);

describe('<FederalDashboard /> component', () => {
  it('renders <FederalAdmin /> when Affiliation Status is Approved', () => {
    const component = setup();
    expect(component.find(FederalAdmin).exists()).toBe(true);
  });

  it('renders <ApprovalStatus /> otherwise', () => {
    const component = setup({ stateStatus: AFFILIATION_STATUSES.DENIED });
    expect(component.find(ApprovalStatus).exists()).toBe(true);
  });
});
