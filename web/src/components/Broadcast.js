import { useEffect } from 'react';

let channel = null;
const handlers = [];

const postMessage = msg => {
  if (channel) {
    channel.postMessage(msg);
  }
};

const subscribe = fn => {
  if (handlers.indexOf(fn) < 0) {
    handlers.push(fn);
  }
};

const unsubscribe = fn => {
  const index = handlers.indexOf(fn);
  if (index >= 0) {
    handlers.splice(index, 1);
  }
};

const Broadcast = () => {
  useEffect(() => {
    try {
      if (window.BroadcastChannel) {
        channel = new BroadcastChannel('eapd_activity');
        channel.onmessage = ({ isTrusted, data }) => {
          if (isTrusted) {
            handlers.forEach(h => {
              h(data);
            });
          }
        };
        return () => {
          channel.close();
          channel = null;
        };
      }
    } catch (e) {} // eslint-disable-line no-empty
    return () => {};
  });

  return null;
};

export default Broadcast;

export { postMessage, subscribe, unsubscribe };
