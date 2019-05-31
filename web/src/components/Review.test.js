import { shallow } from 'enzyme';
import React from 'react';

import Review from './Review';

describe('Review wrapper component', () => {
  it('renders properly if only the required props are set', () => {
    expect(shallow(<Review>Hello</Review>)).toMatchSnapshot();
  });

  it('hooks up the onEditClick event when provided', () => {
    const handler = jest.fn();

    const component = shallow(<Review onEditClick={handler}>Hello</Review>);

    component
      .find('Review')
      .dive()
      .find('Button[children="Edit"]')
      .simulate('click');

    expect(handler).toHaveBeenCalled();
  });

  it('renders properly if the edit link is set', () => {
    expect(
      shallow(<Review editHref="something">Hello</Review>)
    ).toMatchSnapshot();
  });

  it('renders properly if a delete handler is provided', () => {
    expect(
      shallow(<Review onDeleteClick={jest.fn()}>Hello</Review>)
    ).toMatchSnapshot();
  });

  it('hooks up the onDeleteClick event when provided', () => {
    const handler = jest.fn();

    const component = shallow(<Review onDeleteClick={handler}>Hello</Review>);

    component
      .find('Review')
      .dive()
      .find('Button[children="Remove"]')
      .simulate('click');

    expect(handler).toHaveBeenCalled();
  });
});
