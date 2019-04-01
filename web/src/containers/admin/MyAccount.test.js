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
        user: {
          data: {
            username: 'tina@burgers.com',
            ignores: 'unnecessary state',
            name: 'Tina Belcher',
            phone: '1-800-BURGERS',
            position: 'Table Cleaner'
          },
          fetching: 'aw thank you'
        }
      })
    ).toEqual({
      user: {
        name: 'Tina Belcher',
        phone: '1-800-BURGERS',
        position: 'Table Cleaner'
      }
    });
  });

  test('renders', () => {
    const user = {
      name: 'Tina Belcher',
      phone: '1-800-BURGERS',
      position: 'Table Cleaner'
    };

    const component = shallow(
      <MyAccount editAccount={() => {}} history={{}} user={user} />
    );

    // basic rendering
    expect(component).toMatchSnapshot();

    // updated after changing a text field
    component.find('TextField[name="position"]').simulate('change', {
      target: { name: 'position', value: 'Window Washer' }
    });
    expect(component).toMatchSnapshot();
  });

  describe('handles submitting the form', () => {
    test('with no error', async () => {
      const user = {
        name: 'Tina Belcher',
        phone: '1-800-BURGERS',
        position: 'Table Cleaner'
      };

      const editAccount = sinon.stub().resolves();
      const preventDefault = sinon.spy();

      const component = shallow(
        <MyAccount editAccount={editAccount} history={{}} user={user} />
      );

      await component
        .find('CardForm')
        .props()
        .onSave({ preventDefault });

      expect(preventDefault.calledOnce).toEqual(true);
      expect(editAccount.calledWith(user)).toEqual(true);

      expect(component).toMatchSnapshot();
    });

    test('with an error', async () => {
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
        <MyAccount editAccount={editAccount} history={{}} user={user} />
      );

      await component
        .find('CardForm')
        .props()
        .onSave({ preventDefault });

      expect(preventDefault.calledOnce).toEqual(true);
      expect(editAccount.calledWith(user)).toEqual(true);

      expect(component).toMatchSnapshot();
    });
  });

  test('handles canceling', () => {
    const user = {
      name: 'Tina Belcher',
      phone: '1-800-BURGERS',
      position: 'Table Cleaner'
    };

    const goBack = sinon.spy();

    const component = shallow(
      <MyAccount editAccount={() => {}} history={{ goBack }} user={user} />
    );

    component
      .find('CardForm')
      .props()
      .onCancel();

    expect(goBack.calledOnce).toEqual(true);
  });
});
