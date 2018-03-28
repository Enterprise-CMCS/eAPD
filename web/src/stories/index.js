import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions'; // eslint-disable-line import/no-extraneous-dependencies

import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs';
import PageNavButtons from '../components/PageNavButtons';

import '../styles/index.css';

storiesOf('Collapsible', module)
  .add('starts open', () => (
    <Collapsible title="An open thing" open>
      <p>Hello!</p>
    </Collapsible>
  ))
  .add('starts closed', () => (
    <Collapsible title="A closed thing">
      <p>Wazzzzup!</p>
    </Collapsible>
  ));

const inputProps = { input: { name: 'Foo' }, meta: {}, label: 'Input Label' };

storiesOf('Inputs', module)
  .add('text input', () => <Input {...inputProps} />)
  .add('textarea input', () => <Textarea {...inputProps} />);

storiesOf('PageNavButtons', module)
  .add('next only', () => <PageNavButtons goTo={action('goTo')} next="/foo" />)
  .add('prev only', () => <PageNavButtons goTo={action('goTo')} prev="/bar" />)
  .add('prev and next', () => (
    <PageNavButtons goTo={action('goTo')} prev="/bar" next="/foo" />
  ));
