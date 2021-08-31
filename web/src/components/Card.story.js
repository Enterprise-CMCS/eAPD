import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import Card from './Card';

export default {
  title: 'Card',
  component: Card,
  parameters: {
    jest: ['Card.test.js']
  }
};
