import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as ApdSummary,
  mapStateToProps,
  mapDispatchToProps
} from './ApdSummary';
import { updateApd } from '../actions/apd';

describe('apd summary component', () => {
  const props = {
    apd: {
      narrativeHIE: 'about hie',
      narrativeHIT: 'about hit',
      narrativeMMIS: 'about mmis',
      programOverview: 'about the program',
      yearOptions: ['1', '2', '3'],
      years: ['1', '2']
    },
    updateApd: sinon.spy()
  };

  beforeEach(() => {
    props.updateApd.resetHistory();
  });

  test('renders correctly', () => {
    expect(shallow(<ApdSummary {...props} />)).toMatchSnapshot();
  });

  test('dispatches on text change', () => {
    shallow(<ApdSummary {...props} />)
      .find('RichText')
      .at(0)
      .prop('onSync')('this is some html');

    // this one is based on knowledge that the program overview comes first
    expect(
      props.updateApd.calledWith({ programOverview: 'this is some html' })
    );
  });

  test('dispatches on a year change', () => {
    // add a year
    shallow(<ApdSummary {...props} />)
      .find('Choice[value="3"]')
      .simulate('change', { target: { value: '3' } });
    expect(props.updateApd.calledWith({ years: ['1', '2', '3'] }));

    // remove a year
    shallow(<ApdSummary {...props} />)
      .find('Choice[value="2"]')
      .simulate('change', { target: { value: '2' } });
    expect(props.updateApd.calledWith({ years: ['1'] }));
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: 'apd data',
        other: 'props',
        go: 'here'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apd: 'apd data'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ updateApd });
  });
});
