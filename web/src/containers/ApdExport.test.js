import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { plain as ExportAndSubmit, mapDispatchToProps } from './ApdExport';
import { printApd } from '../actions/print';

describe('apd export component', () => {
  test('renders correctly', () => {
    expect(shallow(<ExportAndSubmit printApd={() => {}} />)).toMatchSnapshot();
  });

  test('triggers a print action', () => {
    const print = sinon.spy();
    const component = shallow(<ExportAndSubmit printApd={print} />);
    component.find('Button').simulate('click');

    expect(print.calledOnce).toEqual(true);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ printApd });
  });
});
