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
        history={{}}
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

    // while fetching
    expect(
      shallow(
        <MyAccount
          editAccount={() => {}}
          error={false}
          working
          history={{}}
          user={user}
        />
      )
    ).toMatchSnapshot();
  });

  it('handles submitting the form', async () => {
    const props = {
      editAccount: sinon.spy(),
      error: false,
      history: {},
      working: false,
      user: {
        name: 'Tina Belcher',
        phone: '1-800-BURGERS',
        position: 'Table Cleaner'
      }
    };

    const preventDefault = sinon.spy();

    const component = shallow(<MyAccount {...props} />);

    // Calling onSave will put the component into a "show errors" mode
    await component
      .find('CardForm')
      .props()
      .onSave({ preventDefault });

    expect(preventDefault.calledOnce).toEqual(true);
    expect(props.editAccount.calledWith(props.user)).toEqual(true);

    // When there is no error (thus, success)
    expect(component).toMatchSnapshot();

    // When there is an error
    component.setProps({ error: 'It went wrong' });
    expect(component).toMatchSnapshot();
  });

  test('handles canceling', () => {
    const user = {
      name: 'Tina Belcher',
      phone: '1-800-BURGERS',
      position: 'Table Cleaner'
    };

    const goBack = sinon.spy();

    const component = shallow(
      <MyAccount
        error={false}
        working={false}
        editAccount={() => {}}
        history={{ goBack }}
        user={user}
      />
    );

    component
      .find('CardForm')
      .props()
      .onCancel();

    expect(goBack.calledOnce).toEqual(true);
  });
});
