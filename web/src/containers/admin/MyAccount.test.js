import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as MyAccount,
  mapStateToProps,
  mapDispatchToProps
} from './MyAccount';

import { editSelf as editSelfDispatch } from '../../actions/admin';

describe('my account page', () => {
  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ editAccount: editSelfDispatch });
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        errors: {
          editOwnAccount: 'no error'
        },
        user: {
          data: {
            username: 'tina@burgers.com',
            ignores: 'unnecessary state',
            name: 'Tina Belcher',
            phone: '1-800-BURGERS',
            position: 'Table Cleaner'
          },
          fetching: 'aw thank you'
        },
        working: {
          editOwnAccount: 'for the weekend'
        }
      })
    ).toEqual({
      error: 'no error',
      user: {
        name: 'Tina Belcher',
        phone: '1-800-BURGERS',
        position: 'Table Cleaner'
      },
      working: 'for the weekend'
    });
  });

  test('renders', () => {
    const user = {
      name: 'Tina Belcher',
      phone: '1-800-BURGERS',
      position: 'Table Cleaner'
    };

    const component = shallow(
      <MyAccount
        error={false}
        working={false}
        editAccount={() => {}}
        user={user}
      />
    );

    // basic rendering
    expect(component).toMatchSnapshot();

    // updated after changing a text field
    component.find('TextField[name="position"]').simulate('change', {
      target: { name: 'position', value: 'Window Washer' }
    });
    expect(component).toMatchSnapshot();

    // updated after toggling password change
    component.find('Button[purpose="change password"]').simulate('click');
    expect(component).toMatchSnapshot();

    // updated after toggling password change back
    component.find('Button[purpose="change password"]').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('handles submitting the form', async () => {
    const user = {
      name: 'Tina Belcher',
      phone: '1-800-BURGERS',
      position: 'Table Cleaner'
    };

    // sinon.stub().rejects() wraps strings in Error objects, but the edit
    // account action rejects a plain string, so return a rejected promise
    // eslint-disable-next-line prefer-promise-reject-errors
    const editAccount = sinon.stub().returns(Promise.reject('error message'));
    const preventDefault = sinon.spy();

    const component = shallow(
      <MyAccount
        error={false}
        working={false}
        editAccount={editAccount}
        user={user}
      />
    );

    await component
      .find('withRouter(CardForm)')
      .props()
      .onSave({ preventDefault });

    expect(preventDefault.calledOnce).toEqual(true);
    expect(editAccount.calledWith(user)).toEqual(true);

    // When there is no error (thus, success)
    expect(component).toMatchSnapshot();

    // When there is an error
    component.setProps({ error: 'It went wrong' });
    expect(component).toMatchSnapshot();
  });
});
