import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as NameAndFundingSource,
  mapDispatchToProps
} from './NameAndFundingSourceForm';

import {
  setActivityName,
  setActivityFundingSource
} from '../../../actions/editActivity';

describe('the activity name and funding source component', () => {
  const props = {
    index: 1,
    item: {
      fundingSource: 'Uncle Scrooge',
      key: 'key 1',
      name: 'Buying bikes for Huey, Dewey, and Louie'
    },
    setFundingSource: jest.fn(),
    setName: jest.fn()
  };

  beforeEach(() => {
    props.setFundingSource.mockClear();
    props.setName.mockClear();
  });

  it('renders correctly', () => {
    const component = shallow(<NameAndFundingSource {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('handles changing the activity name', () => {
    const component = shallow(<NameAndFundingSource {...props} />);

    component.find('TextField').prop('onChange')({
      target: { value: 'new value' }
    });

    // The index that we pass via props is 1, but the name-and-funding-source
    // forms are built from a list of only the editable activities. Index 0
    // in the editable list is index 1 in the list of all activities. To
    // account for that, the form will increment the index by 1. Thus, when
    // 1 gets passed in, we expect that to become 2 when an edit happens.
    expect(props.setName).toHaveBeenCalledWith(2, 'new value');
  });

  it('handles changing the funding source/program type', () => {
    const component = shallow(<NameAndFundingSource {...props} />);

    component.find('ChoiceList').prop('onChange')({
      target: { value: 'new value' }
    });

    expect(props.setFundingSource).toHaveBeenCalledWith(2, 'new value');
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      setFundingSource: setActivityFundingSource,
      setName: setActivityName
    });
  });
});
