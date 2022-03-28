import { shallow } from 'enzyme';
import React from 'react';
import { AFFILIATION_STATUSES } from '../../../constants';

import ApdList from './ApdList';
import AffiliationStatus from './AffiliationStatus';

import { plain as StateDashboard } from './StateDashboard';

const initialProps = {
  state: { id: 'ak' },
  role: 'some role',
  approvalStatus: AFFILIATION_STATUSES.APPROVED
};

const setup = (props = {}) =>
  shallow(<StateDashboard {...initialProps} {...props} />);

describe('<StateDashboard /> component', () => {
  it('renders <ApdList /> when State Affiliation Status is Approved', () => {
    const component = setup();
    expect(component.find(ApdList).exists()).toBe(true);
  });

  it('renders <AffiliationStatus /> otherwise', () => {
    const component = setup({ approvalStatus: '' });
    expect(component.find(AffiliationStatus).exists()).toBe(true);
  });
});
