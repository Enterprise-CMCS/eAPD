import { createContext } from 'react';

export const ActivityContext = createContext({ index: -1 });

export const { Consumer, Provider } = ActivityContext;
