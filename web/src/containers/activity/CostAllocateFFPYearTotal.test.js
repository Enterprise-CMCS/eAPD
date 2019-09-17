import { shallow } from 'enzyme';
import React from 'react';

import {
  raw as CostAllocateFFPYearTotal,
  makeMapStateToProps
} from './CostAllocateFFPYearTotal';

describe('the CostAllocateFFPYearTotal component', () => {
  test('renders correctly', () => {
    const component = shallow(
      <CostAllocateFFPYearTotal
        aKey="activity key"
        quarterlyFFP={{
          total: {
            combined: 100,
            contractors: 200,
            state: 300
          }
        }}
        years={['year 1', 'year 2']}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('maps state to props', () => {
    const mapStateToProps = makeMapStateToProps();
    expect(
      mapStateToProps(
        {
          apd: { data: { years: ['year 1', 'year 2'] } },
          budget: {
            activities: {
              'activity key': { quarterlyFFP: 'one beeellion dollars' },
              'bad key': {}
            }
          }
        },
        { aKey: 'activity key' }
      )
    ).toEqual({
      quarterlyFFP: 'one beeellion dollars',
      years: ['year 1', 'year 2']
    });
  });
});
