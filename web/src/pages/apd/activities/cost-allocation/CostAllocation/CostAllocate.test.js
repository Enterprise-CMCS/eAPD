import React from 'react';
import {
  renderWithConnection
} from 'apd-testing-library';

// import {
//   plain as CostAllocate,
//   mapStateToProps,
//   mapDispatchToProps
// } from './CostAllocate';
// import { setCostAllocationMethodology } from '../../../../../redux/actions/editActivity/costAllocate';

const initialState = {
  activityIndex: 1,
  activity: {
    key: 'activity key',
    costAllocationNarrative: {
      methodology: 'cost allocation'
    }
  },
  setMethodology: jest.fn()
};

const setup = (props = {initialState}, options = {}) => renderWithConnection(<setCostAllocationMethodology {...props} />, options);

describe('<setCostAllocationMethodology />', () => {
  it('renders successfully', async () => {
    const container = setup();
    expect(container).toMatchSnapshot();
  });
});