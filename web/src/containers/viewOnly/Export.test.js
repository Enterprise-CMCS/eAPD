import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as ExportInstructions, mapDispatchToProps } from './Export';
import { printApd } from '../../actions/app';

describe('apd export component', () => {
  test('renders correctly', () => {
    expect(
      shallow(<ExportInstructions printApd={() => {}} />)
    ).toMatchSnapshot();
  });

  test('triggers a print action', () => {
    const print = sinon.spy();
    const component = shallow(<ExportInstructions printApd={print} />);
    component.find('Button').simulate('click');

    expect(print.calledOnce).toEqual(true);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ printApd });
  });
});
