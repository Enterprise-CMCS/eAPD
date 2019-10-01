import { createContext } from 'react';

export const ActivityContext = createContext({
  activity: null,
  index: -1
});

export const { Consumer, Provider } = ActivityContext;
