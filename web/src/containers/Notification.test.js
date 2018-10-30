import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import { processQueue, closeNotification } from '../actions/notification';

import {
  raw as Notification,
  mapStateToProps,
  mapDispatchToProps
} from './Notification';

describe('notification component', () => {
  test('renders correctly if there is no message', () => {
    const component = shallow(
      <Notification
        messageInfo={{}}
        open
        processQueue={() => {}}
        closeNotification={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('renders correctly if there is message', () => {
    const component = shallow(
      <Notification
        messageInfo={{ message: 'hello', key: '' }}
        open
        processQueue={() => {}}
        closeNotification={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test('notifies via prop when exiting focus', () => {
    const processQueueProp = sinon.spy();
    const component = shallow(
      <Notification
        messageInfo={{ message: 'hello', key: '' }}
        open
        processQueue={processQueueProp}
        closeNotification={() => {}}
      />
    );
    component.prop('onExited')();

    expect(processQueueProp.called).toBeTruthy();
  });

  test('notifies via prop when closing, only when clicking away', () => {
    const closeNotificationProp = sinon.spy();
    const component = shallow(
      <Notification
        messageInfo={{ message: 'hello', key: '' }}
        open
        processQueue={() => {}}
        closeNotification={closeNotificationProp}
      />
    );

    component.prop('onClose')('', 'clickaway');
    expect(closeNotificationProp.called).toBeFalsy();

    component.prop('onClose')('', 'no good reason');
    expect(closeNotificationProp.called).toBeTruthy();
  });

  test('maps state to props', () => {
    const state = {
      notification: {
        open: 'open',
        messageInfo: 'message info'
      }
    };

    expect(mapStateToProps(state)).toEqual({
      open: 'open',
      messageInfo: 'message info'
    });
  });

  test('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      processQueue,
      closeNotification
    });
  });
});
