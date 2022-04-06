import { mount } from 'enzyme';
import React from 'react';

import Broadcast, { postMessage, subscribe, unsubscribe } from './Broadcast';

describe('Broadcast helper component', () => {
  it('quietly does nothing if BroadcastChannel is not defined', () => {
    const component = mount(<Broadcast />);
    component.unmount();
  });

  it('creates a channel when the component is mounted', () => {
    const channel = { close: jest.fn() };
    global.BroadcastChannel = jest.fn();
    global.BroadcastChannel.mockImplementation(() => channel);

    const component = mount(<Broadcast />);

    // channel is created and subscribed when mounted
    expect(global.BroadcastChannel).toHaveBeenCalledWith('eapd_activity');
    expect(channel.onmessage).toEqual(expect.any(Function));

    component.unmount();

    // and closed when unmounted
    expect(channel.close).toHaveBeenCalled();
  });

  describe('utility methods', () => {
    let component;

    const channel = { close: jest.fn(), postMessage: jest.fn() };

    beforeAll(() => {
      global.BroadcastChannel = jest.fn();
      global.BroadcastChannel.mockImplementation(() => channel);
      component = mount(<Broadcast />);
    });

    beforeEach(() => {
      channel.close.mockReset();
      channel.postMessage.mockReset();
    });

    afterAll(() => {
      component.unmount();
    });

    it('posts a message to the channel', () => {
      postMessage('this is my message');
      expect(channel.postMessage).toHaveBeenCalledWith('this is my message');
    });

    it('sends trusted messages to subscribed handlers', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const handler3 = jest.fn();
      subscribe(handler1);
      subscribe(handler2);
      subscribe(handler3);
      // add the same handler again to make sure it doesn't get called twice
      subscribe(handler3);

      channel.onmessage({ isTrusted: true, data: 'this is a message' });

      expect(handler1).toHaveBeenCalledWith('this is a message');
      expect(handler2).toHaveBeenCalledWith('this is a message');
      expect(handler3).toHaveBeenCalledWith('this is a message');
      expect(handler3.mock.calls.length).toEqual(1);
    });

    it('ignores untrusted messages', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const handler3 = jest.fn();
      subscribe(handler1);
      subscribe(handler2);
      subscribe(handler3);

      channel.onmessage({ isTrusted: false, data: 'this is a message' });

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).not.toHaveBeenCalled();
      expect(handler3).not.toHaveBeenCalled();
    });

    it('allows handlers to unsubscribe', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      const handler3 = jest.fn();
      subscribe(handler1);
      subscribe(handler2);
      subscribe(handler3);

      unsubscribe(handler1);
      // also unsubscribe something it doesn't know about, just to make sure
      // that doesn't explode anything
      unsubscribe(jest.fn());

      channel.onmessage({ isTrusted: true, data: 'this is a message' });

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledWith('this is a message');
      expect(handler3).toHaveBeenCalledWith('this is a message');
    });
  });
});
