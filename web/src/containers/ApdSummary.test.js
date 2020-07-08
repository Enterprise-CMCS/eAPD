import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as ApdSummary,
  mapStateToProps,
  mapDispatchToProps
} from './ApdSummary';

import {
  addYear,
  removeYear,
  setNarrativeForHIE,
  setNarrativeForHIT,
  setNarrativeForMMIS,
  setProgramOverview
} from '../actions/editApd';

describe('apd summary component', () => {
  const props = {
    narrativeHIE: 'about hie',
    narrativeHIT: 'about hit',
    narrativeMMIS: 'about mmis',
    programOverview: 'about the program',
    addApdYear: jest.fn(),
    removeApdYear: jest.fn(),
    setHIE: jest.fn(),
    setHIT: jest.fn(),
    setMMIS: jest.fn(),
    setOverview: jest.fn(),
    yearOptions: ['1', '2', '3'],
    years: ['1', '2']
  };

  beforeEach(() => {
    props.addApdYear.mockClear();
    props.removeApdYear.mockClear();
    props.setHIE.mockClear();
    props.setHIT.mockClear();
    props.setMMIS.mockClear();
    props.setOverview.mockClear();
  });

  test('renders correctly', () => {
    expect(shallow(<ApdSummary {...props} />)).toMatchSnapshot();
  });

  test('dispatches on text change', () => {
    shallow(<ApdSummary {...props} />)
      .find('Connect(RichText)')
      .at(0)
      .prop('onSync')('this is some html');

    // this one is based on knowledge that the program overview comes first
    expect(props.setOverview).toHaveBeenCalledWith('this is some html');
  });

  test('dispatches when adding a year', () => {
    shallow(<ApdSummary {...props} />)
      .find('ChoiceComponent[value="3"]')
      .simulate('change', { target: { value: '3' } });

    expect(props.addApdYear).toHaveBeenCalledWith('3');
  });

  test('dispatches when removing a year', () => {
    shallow(<ApdSummary {...props} />)
      .find('ChoiceComponent[value="2"]')
      .simulate('change', { target: { value: '2' } });

    expect(props.removeApdYear).toHaveBeenCalledWith('2');
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            narrativeHIE: 'over hill',
            narrativeHIT: 'under mountain',
            narrativeMMIS: 'tangent slope',
            programOverview: 'arc-cosine thing',
            years: 'the actual years',
            yearOptions: 'all of the years'
          }
        }
      })
    ).toEqual({
      narrativeHIE: 'over hill',
      narrativeHIT: 'under mountain',
      narrativeMMIS: 'tangent slope',
      programOverview: 'arc-cosine thing',
      years: 'the actual years',
      yearOptions: 'all of the years'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      addApdYear: addYear,
      removeApdYear: removeYear,
      setHIE: setNarrativeForHIE,
      setHIT: setNarrativeForHIT,
      setMMIS: setNarrativeForMMIS,
      setOverview: setProgramOverview
    });
  });
});
