import React from 'react';
import SystemDown from './SystemDown';

export default {
  title: 'SystemDown',
  component: SystemDown,
};

export const Basic = args => <SystemDown {...args} />;

Basic.args = {};