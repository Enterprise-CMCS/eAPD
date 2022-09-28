import { shallow } from 'enzyme';
import React from 'react';
import Review from './Review';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithConnection } from 'apd-testing-library';

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

  it('renders properly if an edit handler is supplied', () => {
    const handler = jest.fn();
    const component = shallow(<Review onEditClick={handler}>Hello</Review>);

    expect(component).toMatchSnapshot();
  });

  it('renders properly if the edit link and edit handler are both omitted', () => {
    expect(shallow(<Review>Hello</Review>)).toMatchSnapshot();
  });

  it('clicks the link if an edit link is set, when the button is clicked', () => {
    renderWithConnection(<Review editHref="something">Hello</Review>);

    const handler = jest.fn();

    screen
      .getByRole('link', { name: 'Edit' })
      .addEventListener('click', handler);

    fireEvent.click(screen.getByRole('link', { name: 'Edit' }));
    expect(handler).toHaveBeenCalled();
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
      .find('Button[children="Delete"]')
      .simulate('click');

    expect(handler).toHaveBeenCalledTimes(0);
    expect(component.find('Cancel')).toBeTruthy();
  });
});
