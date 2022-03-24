import { shallow } from 'enzyme';
import React from 'react';
import { AFFILIATION_STATUSES } from '../../../constants';

<<<<<<< HEAD:web/src/pages/dashboard/fed-dashboard/FederalDashboard.test.js
import FederalAdmin from '../../admin/fed-admin/FederalAdmin';
=======
import FederalAdmin from '../../../containers/admin/FederalAdmin';
>>>>>>> 886da3951acbe1d7ffdbd7d636ac4e66de9a1d0f:web/src/containers/FederalDashboard.test.js
import { ApprovalStatus } from '../state-dashboard/AffiliationStatus';

import { plain as FederalDashboard } from './FederalDashboard';

const initialProps = {
  approvalStatus: AFFILIATION_STATUSES.APPROVED
};

const setup = (props = {}) =>
  shallow(<FederalDashboard {...initialProps} {...props} />);

describe('<FederalDashboard /> component', () => {
  it('renders <FederalAdmin /> when Affiliation Status is Approved', () => {
    const component = setup();
    expect(component.find(FederalAdmin).exists()).toBe(true);
  });

  it('renders <ApprovalStatus /> otherwise', () => {
    const component = setup({ approvalStatus: AFFILIATION_STATUSES.DENIED });
    expect(component.find(ApprovalStatus).exists()).toBe(true);
  });
});
