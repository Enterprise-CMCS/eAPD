import { shallow } from 'enzyme';
import React from 'react';

import { plain as EntryPage, mapStateToProps } from './EntryPage';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ activityIndex: 2 })
}));

describe('single activity entry page', () => {
  it('renders correctly', () => {
    expect(
      shallow(<EntryPage activityNames={['A1', 'A2', 'A3', 'A4']} />)
    ).toMatchSnapshot();
  });

  it('maps redux state to properties', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            activities: [{ name: 'one' }, { name: 'two' }, { name: 'three' }]
          }
        }
      })
    ).toEqual({ activityNames: ['one', 'two', 'three'] });
  });
});
