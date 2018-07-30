import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import Btn from '../components/Btn';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs';

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

storiesOf('Buttons', module).add('various', () => (
  <div>
    <Btn /> <Btn>Boom</Btn> <Btn extraCss="p3">More padding</Btn>{' '}
    <Btn onClick={() => alert('btn clicked!')}>Click me!</Btn>
    <hr />
    <Btn kind="outline" /> <Btn kind="outline" size="big" />
  </div>
));
