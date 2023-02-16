import { shallow } from 'enzyme';
import React from 'react';

import { APD_TYPE } from '@cms-eapd/common';

import {
  plain as KeyPersonnel,
  mapStateToProps,
  mapDispatchToProps
} from './ApdStateKeyPersonnel';
import { removeKeyPersonnel } from '../../../redux/actions/editApd';

describe('apd state profile, Medicaid office component', () => {
  const props = {
    list: [
      {
        key: 'person1',
        name: 'person name',
        email: 'person1@theplace.gov',
        position: 'unobservable',
        fte: { 1: 0.27, 2: 0.27 },
        hasCosts: true,
        costs: { 1: 100, 2: 200 }
      },
      {
        key: 'person2',
        name: '',
        email: 'person2@theplace.gov',
        position: '',
        fte: { 1: 0.72, 2: 0.72 },
        hasCosts: false,
        costs: { 1: 0, 2: 0 }
      }
    ],
    remove: jest.fn(),
    years: ['1', '2']
  };

  const component = shallow(<KeyPersonnel {...props} />);

  beforeEach(() => {
    props.remove.mockClear();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles deleting a key person', () => {
      list.prop('onDeleteClick')(0);
      expect(props.remove).toHaveBeenCalledWith(0);
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            keyStatePersonnel: {
              keyPersonnel: 'these are my people'
            },
            years: 'and these are my years'
          }
        }
      })
    ).toEqual({
      list: 'these are my people',
      years: 'and these are my years',
      apdType: 'HITECH'
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      remove: removeKeyPersonnel
    });
  });
});
