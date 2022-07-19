import React from 'react';
import {
  renderWithConnection,
  act,
  waitFor,
  screen
} from 'apd-testing-library';

import {
  plain as CostAllocate,
  mapStateToProps,
  mapDispatchToProps
} from './CostAllocate';
import { setCostAllocationMethodology } from '../../../../../redux/actions/editActivity/costAllocate';

const initialState = {
  activityIndex: 1,
  activity: {
    key: 'activity key',
    costAllocationNarrative: {
      methodology: 'cost allocation'
    }
  },
  setMethodology: jest.fn(),
  setCostAllocationMethodology: jest.fn()
};

const setup = async (props = {}) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  const utils = await act(async () => renderWithConnection(<CostAllocate {...initialState} {...props} />));
  return utils;
}

describe('<setCostAllocationMethodology />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders successfully', async () => {
    await setup();
    await waitFor(() => {
      expect(
        screen.getByLabelText('Description of Cost Allocation Methodology')
      ).toHaveValue(initialState.activity.costAllocationNarrative.methodology);
    })
  });

  test('maps redux state to component props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              key: 'activity key'
            }
          ]
        }
      }
    };
    expect(mapStateToProps(state, { activityIndex: 0 })).toEqual({
      activity: {
        key: 'activity key'
      }
    });
  });

  test('maps dispatch actions to props', () => {
    expect(mapDispatchToProps).toEqual({
      setMethodology: setCostAllocationMethodology
    });
  });
});