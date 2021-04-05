import { shallow } from 'enzyme';
import React from 'react';
import { STATE_AFFILIATION_STATUSES } from '../constants';

import ApdList from '../components/ApdList';
import StateAffiliationStatus from '../components/StateAffiliationStatus';

import {
  plain as StateDashboard,
} from './StateDashboard';

const initialProps = {
  state: { id: 'ak' },
  role: 'some role',
  stateStatus: STATE_AFFILIATION_STATUSES.APPROVED
};

const setup = (props = {}) =>
  shallow(<StateDashboard {...initialProps} {...props} />);

describe('<StateDashboard /> component', () => {
  it('renders <ApdList /> when State Affiliation Status is Approved', () => {
    const component = setup();
    expect(component.find(ApdList).exists()).toBe(true);
  });

  it('renders <StateAffiliationStatus /> otherwise', () => {
    const component = setup({ stateStatus: '' });
    expect(component.find(StateAffiliationStatus).exists()).toBe(true);
  });
});
