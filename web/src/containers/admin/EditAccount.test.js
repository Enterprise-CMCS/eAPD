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
        },
        errors: { editAccount: 'that error' },
        working: { editAccount: 'hard, playing likewise' }
      })
    ).toEqual({
      currentUser: 'the current user',
      error: 'that error',
      roles: 'a list of roles',
      users: 'and a list of users',
      working: 'hard, playing likewise'
    });
  });

  test('renders correctly without a selected user', () => {
    expect(
      shallow(
        <EditAccount
          currentUser={{ id: 1 }}
          error={false}
          working={false}
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
        error={false}
        working={false}
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

    component.find('Select').simulate('change', { target: { value: 1 } });

    const getPropsFor = fieldName =>
      component.findWhere(c => c.prop('name') === fieldName).props();

    expect(getPropsFor('name').value).toEqual('Alice');
    expect(getPropsFor('email').value).toEqual('alice@wonderland.org');
    expect(getPropsFor('phone').value).toEqual('');
    expect(getPropsFor('position').value).toEqual('');
    expect(getPropsFor('state').value).toEqual('wa');
    expect(getPropsFor('role').value).toEqual('three');
    expect(getPropsFor('role').disabled).toEqual(true);
  });

  test('enables the roles when someone else is selected', () => {
    const component = shallow(
      <EditAccount
        error={false}
        working={false}
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
          {
            id: 2,
            name: 'Bob',
            email: 'bobross@happylittletrees.net',
            state: '',
            role: ''
          },
          {
            id: 3,
            name: null,
            email: 'nohface@yubabasplace.com',
            state: '',
            role: ''
          }
        ]}
        editAccount={sinon.spy()}
      />
    );

    component.find('Select').simulate('change', { target: { value: 2 } });

    const getPropsFor = fieldName =>
      component.findWhere(c => c.prop('name') === fieldName).props();

    expect(getPropsFor('name').value).toEqual('Bob');
    expect(getPropsFor('email').value).toEqual('bobross@happylittletrees.net');
    expect(getPropsFor('phone').value).toEqual('');
    expect(getPropsFor('position').value).toEqual('');
    expect(getPropsFor('state').value).toEqual('');
    expect(getPropsFor('role').value).toEqual('');
    expect(getPropsFor('role').disabled).toEqual(false);
  });

  test('handles submitting the form', () => {
    const editAccount = sinon.stub().resolves();
    const preventDefault = sinon.spy();

    const component = shallow(
      <EditAccount
        error={false}
        working={false}
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
          {
            id: 2,
            name: 'Bob',
            email: 'bobross@happylittletrees.net',
            state: 'wa',
            role: 'seven'
          },
          { id: 3, name: null, email: 'nohface@yubabasplace.com' }
        ]}
        editAccount={editAccount}
      />
    );

    component.find('Select').simulate('change', { target: { value: 2 } });

    const change = (name, value) =>
      component
        .findWhere(c => c.prop('name') === name)
        .simulate('change', { target: { name, value } });

    change('name', 'Barbara');
    change('email', 'barbara.eden@bottle.com');
    change('phone', '202-555-5555');
    change('position', 'Director of Genies');
    change('state', 'fl');
    change('role', 'one');

    component.find('CardForm').prop('onSave')({ preventDefault });

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
