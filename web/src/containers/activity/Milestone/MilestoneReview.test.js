import { shallow } from 'enzyme';
import React from 'react';

import MilestoneReview from './MilestoneReview';

describe('the MilestoneReview component', () => {
  const expand = jest.fn();
  const onDelete = jest.fn();

  const component = shallow(
    <MilestoneReview
      index={1532}
      item={{
        // The Battle of Britain ends with the Nazis unable to gain air
        // superiority to support an invasion. The invasion is postponed until
        // the following year, but in fact never happens.
        endDate: '1940-10-31',
        milestone: 'Milestone name'
      }}
      expand={expand}
      onDeleteClick={onDelete}
    />
  );

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  test('triggers the delete event', () => {
    expect(component.find('Review').prop('onDeleteClick')).toEqual(onDelete);
  });

  test('hooks up the expand event', () => {
    expect(component.find('Review').prop('onEditClick')).toEqual(expand);
  });
});
