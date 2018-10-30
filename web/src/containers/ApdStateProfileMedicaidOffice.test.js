import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as StateProfile,
  mapStateToProps,
  mapDispatchToProps
} from './ApdStateProfileMedicaidOffice';
import { updateApd } from '../actions/apd';

describe('apd state profile, Medicaid office component', () => {
  const props = {
    stateProfile: {
      medicaidDirector: {
        name: 'name',
        email: 'email',
        phone: 'phone'
      },
      medicaidOffice: {
        address1: 'address 1',
        address2: 'address 2',
        city: 'city',
        state: 'state',
        zip: 'zip'
      }
    },
    updateApd: sinon.spy()
  };

  beforeEach(() => {
    props.updateApd.resetHistory();
  });

  test('renders correctly', () => {
    const localProps = JSON.parse(JSON.stringify(props));

    // all good
    expect(
      shallow(<StateProfile {...localProps} updateApd={props.updateApd} />)
    ).toMatchSnapshot();

    // name length validation
    localProps.stateProfile.medicaidDirector.name = 'a';
    expect(
      shallow(<StateProfile {...localProps} updateApd={props.updateApd} />)
    ).toMatchSnapshot();
  });

  test('dispatches on text change', () => {
    shallow(<StateProfile {...props} />)
      .find('InputHolder')
      .at(0)
      .simulate('change', { target: { value: 'new text' } });

    // based on knowledge that director name is first
    expect(
      props.updateApd.calledWith({
        stateProfile: { medicaidDirector: { name: 'new text' } }
      })
    );
  });

  test('maps state to props', () => {
    const state = {
      apd: {
        data: {
          stateProfile: 'state profile'
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({ stateProfile: 'state profile' });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ updateApd });
  });
});
