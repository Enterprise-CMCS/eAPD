import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as EditAccount,
  mapStateToProps,
  mapDispatchToProps
} from './EditAccount';
import { editAccount as editAccountDispatch } from '../../actions/admin';

describe('admin page > edit account', () => {
  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({ editAccount: editAccountDispatch });
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        admin: {
          roles: 'a list of roles',
          users: 'and a list of users'
        },
        auth: {
          user: 'the current user'
        }
      })
    ).toEqual({
      currentUser: 'the current user',
      roles: 'a list of roles',
      users: 'and a list of users'
    });
  });

  test('renders correctly without a selected user', () => {
    expect(
      shallow(
        <EditAccount
          currentUser={{ id: 1 }}
          roles={[{ name: 'one' }, { name: 'two' }, { name: 'three' }]}
          users={[
            {
              id: 1,
              name: 'Alice',
              email: 'alice@wonderland.org',
              state: 'wa',
              role: 'three'
            },
            { id: 2, name: 'Bob', email: 'bobross@happylittletrees.net' },
            { id: 3, name: null, email: 'nohface@yubabasplace.com' }
          ]}
          editAccount={sinon.spy()}
        />
      ).find('form')
    ).toHaveLength(0);

    // Really we just want to make sure the form isn't displayed if there's
    // not a user selected yet.
  });

  test('disables the role when currently-logged-in user is selected', () => {
    const component = shallow(
      <EditAccount
        currentUser={{ id: 1 }}
        roles={[{ name: 'one' }, { name: 'two' }, { name: 'three' }]}
        users={[
          {
            id: 1,
            name: 'Alice',
            email: 'alice@wonderland.org',
            state: 'wa',
            role: 'three'
          },
          { id: 2, name: 'Bob', email: 'bobross@happylittletrees.net' },
          { id: 3, name: null, email: 'nohface@yubabasplace.com' }
        ]}
        editAccount={sinon.spy()}
      />
    );

    component.find('select').simulate('change', { target: { value: 1 } });

    expect(component.find('#edit_account_name').props().value).toEqual('Alice');
    expect(component.find('#edit_account_email').props().value).toEqual(
      'alice@wonderland.org'
    );
    expect(component.find('#edit_account_phone').props().value).toEqual('');
    expect(component.find('#edit_account_position').props().value).toEqual('');
    expect(component.find('#edit_account_state').props().value).toEqual('wa');
    expect(component.find('#edit_account_role').props().value).toEqual('three');
    expect(component.find('#edit_account_role').props().disabled).toEqual(true);
  });

  test('enables the roles when someone else is selected', () => {
    const component = shallow(
      <EditAccount
        currentUser={{ id: 1 }}
        roles={[{ name: 'one' }, { name: 'two' }, { name: 'three' }]}
        users={[
          {
            id: 1,
            name: 'Alice',
            email: 'alice@wonderland.org',
            state: 'wa',
            role: 'three'
          },
          { id: 2, name: 'Bob', email: 'bobross@happylittletrees.net' },
          { id: 3, name: null, email: 'nohface@yubabasplace.com' }
        ]}
        editAccount={sinon.spy()}
      />
    );

    component.find('select').simulate('change', { target: { value: 2 } });

    expect(component.find('#edit_account_name').props().value).toEqual('Bob');
    expect(component.find('#edit_account_email').props().value).toEqual(
      'bobross@happylittletrees.net'
    );
    expect(component.find('#edit_account_phone').props().value).toEqual('');
    expect(component.find('#edit_account_position').props().value).toEqual('');
    expect(component.find('#edit_account_state').props().value).toEqual('');
    expect(component.find('#edit_account_role').props().value).toEqual('');
    expect(component.find('#edit_account_role').props().disabled).toEqual(
      false
    );
  });

  test('handles submitting the form', () => {
    const editAccount = sinon.spy();
    const preventDefault = sinon.spy();

    const component = shallow(
      <EditAccount
        currentUser={{ id: 1 }}
        roles={[{ name: 'one' }, { name: 'two' }, { name: 'three' }]}
        users={[
          {
            id: 1,
            name: 'Alice',
            email: 'alice@wonderland.org',
            state: 'wa',
            role: 'three'
          },
          { id: 2, name: 'Bob', email: 'bobross@happylittletrees.net' },
          { id: 3, name: null, email: 'nohface@yubabasplace.com' }
        ]}
        editAccount={editAccount}
      />
    );

    component.find('select').simulate('change', { target: { value: 2 } });

    component
      .find('#edit_account_name')
      .simulate('change', { target: { name: 'name', value: 'Barbara' } });
    component.find('#edit_account_email').simulate('change', {
      target: { name: 'email', value: 'barbara.eden@bottle.com' }
    });
    component
      .find('#edit_account_phone')
      .simulate('change', { target: { name: 'phone', value: '202-555-5555' } });
    component.find('#edit_account_position').simulate('change', {
      target: { name: 'position', value: 'Director of Genies' }
    });
    component
      .find('#edit_account_state')
      .simulate('change', { target: { name: 'state', value: 'fl' } });
    component
      .find('#edit_account_role')
      .simulate('change', { target: { name: 'role', value: 'one' } });
    component.find('form').simulate('submit', { preventDefault });

    // don't use the browser submit, since we expect to send it via AJAX
    expect(preventDefault.calledOnce).toEqual(true);
    expect(
      editAccount.calledWith({
        id: 2,
        name: 'Barbara',
        email: 'barbara.eden@bottle.com',
        phone: '202-555-5555',
        position: 'Director of Genies',
        state: 'fl',
        role: 'one'
      })
    ).toEqual(true);
  });
});
