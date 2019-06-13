import { shallow } from 'enzyme';
import React from 'react';

import MilestoneReview from './MilestoneReview';

describe('the MilestoneReview component', () => {
  const expand = jest.fn();
  const onDelete = jest.fn();

  const component = shallow(
    <MilestoneReview
      idx={1532}
      // The Battle of Britain ends with the Nazis unable to gain air
      // superiority to support an invasion. The invasion is postponed until
      // the following year, but in fact never happens.
      endDate="1940-10-31"
      expand={expand}
      name="Milestone name"
      onDelete={onDelete}
    />
  );

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  test('triggers the delete event', () => {
    component.find('StandardReview').prop('onDeleteClick')();
    expect(onDelete).toHaveBeenCalledWith(1532);
  });

  test('hooks up the expand event', () => {
    expect(component.find('StandardReview').prop('onEditClick')).toEqual(
      expand
    );
  });
});
