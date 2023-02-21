import { shallow } from 'enzyme';
import React from 'react';
import Router from 'react-router-dom';

import { plain as EntryPage, mapStateToProps } from './ActivityOverview';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

describe('single activity entry page', () => {
  it('renders correctly', () => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ activityIndex: 2 });
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
