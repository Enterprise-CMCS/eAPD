import { shallow } from 'enzyme';
import React from 'react';

import NamdAndFundingSourceReview from './NameAndFundingSourceReview';

describe('the NameAndFundingSourceReview component', () => {
  const props = {
    expand: jest.fn(),
    index: 1,
    item: {
      fundingSource: 'Rich Uncle Pennybags',
      name: 'Getting out of jail'
    },
    onDeleteClick: jest.fn()
  };

  it('renders correctly', () => {
    const component = shallow(<NamdAndFundingSourceReview {...props} />);
    expect(component).toMatchSnapshot();

    expect(component.find('StandardReview').prop('onEditClick')).toEqual(
      props.expand
    );
    expect(component.find('StandardReview').prop('onDeleteClick')).toEqual(
      props.onDeleteClick
    );
  });
});
