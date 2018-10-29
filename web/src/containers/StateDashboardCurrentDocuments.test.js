import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { APD_STATUS } from '../constants';

import {
  raw as CurrentDocuments,
  DocumentItem,
  ProgressDot,
  ProgressLine,
  mapStateToProps,
  mapDispatchToProps
} from './StateDashboardCurrentDocuments';
import { selectApd } from '../actions/apd';

describe('state dashboard current document item component', () => {
  test('renders correctly', () => {
    expect(
      shallow(<DocumentItem name="document name" status={APD_STATUS.DRAFT} />)
    ).toMatchSnapshot();
  });

  [
    'draft',
    'submitted',
    'in review',
    'state response',
    'in clearance',
    'approved',
    'disapproved',
    'withdrawn'
  ].forEach(status => {
    test(`renders for status '${status}'`, () => {
      const symbol = APD_STATUS[status.toUpperCase().replace(' ', '_')];
      expect(
        shallow(<DocumentItem name="document name" status={symbol} />)
      ).toMatchSnapshot();
    });
  });

  test('sends click event for item', () => {
    const buttonClick = sinon.spy();
    const component = shallow(
      <DocumentItem
        buttonClick={buttonClick}
        name="document name"
        status={APD_STATUS.DRAFT}
      />
    );

    component.find('Btn').simulate('click');
    expect(buttonClick.called).toBeTruthy();
  });
});

describe('document progress dot component', () => {
  test('renders correctly with defaults', () => {
    expect(shallow(<ProgressDot />)).toMatchSnapshot();
  });

  [null, 'some text'].forEach(text => {
    ['done', 'started'].forEach(prop => {
      [true, false].forEach(value => {
        test(`renders correctly with ${prop} = ${value}, text = '${text}'`, () => {
          const props = { [prop]: value, text };
          expect(shallow(<ProgressDot {...props} />)).toMatchSnapshot();
        });
      });
    });
  });
});

describe('document progress line component', () => {
  test('renders correctly with defaults', () => {
    expect(shallow(<ProgressLine />)).toMatchSnapshot();
  });

  [true, false].forEach(value => {
    test(`renders correctly when done = ${value}`, () => {
      expect(shallow(<ProgressLine done={value} />)).toMatchSnapshot();
    });
  });
});

describe('state dashboard current documents component', () => {
  const apd = {
    id: 'apd id',
    years: ['1', '2', '3']
  };

  test('renders correctly if fetching', () => {
    const component = shallow(
      <CurrentDocuments apds={[]} fetching selectApd={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly for apd', () => {
    const component = shallow(
      <CurrentDocuments apds={[apd]} fetching={false} selectApd={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });

  test('selects an apd', () => {
    const selectApdProp = sinon.spy();

    const component = shallow(
      <CurrentDocuments
        apds={[apd]}
        fetching={false}
        selectApd={selectApdProp}
      />
    );
    component
      .find('DocumentItem')
      .findWhere(n => n.key() === 'apd id')
      .prop('buttonClick')();

    expect(selectApdProp.calledWith('apd id')).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        byId: {
          id1: 'alice',
          id2: 'bob'
        },
        fetching: 'can fetch'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      apds: ['alice', 'bob'],
      fetching: 'can fetch'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ selectApd });
  });
});
