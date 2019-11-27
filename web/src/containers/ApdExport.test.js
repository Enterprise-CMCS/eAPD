import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { push } from 'connected-react-router';

import { plain as ExportAndSubmit, mapDispatchToProps } from './ApdExport';

describe('apd export component', () => {
  test('renders correctly', () => {
    expect(shallow(<ExportAndSubmit printApd={() => {}} />)).toMatchSnapshot();
  });

  test('routes to print preview', () => {
    const push = sinon.spy();
    const component = shallow(<ExportAndSubmit push={push} />);
    component.find('Button').simulate('click');

    expect(push.calledOnce).toEqual(true);
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ push });
  });
});
