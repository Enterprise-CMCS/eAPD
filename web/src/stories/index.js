import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import { DocumentItem, ProgressDot, ProgressLine } from './DashboardStory';
import InstructionStory from './InstructionStory';
import Btn from '../components/Btn';
import { Input, Textarea } from '../components/Inputs';

import '../styles/index.css';

storiesOf('Texty components', module).add('Instruction', () => (
  <InstructionStory />
));

storiesOf('Dashboard components', module)
  .add('Document', () => <DocumentItem />)
  .add('Progress dot', () => <ProgressDot />)
  .add('Progress line', () => <ProgressLine />);

const inputProps = { input: { name: 'Foo' }, meta: {}, label: 'Input Label' };

storiesOf('Inputs', module)
  .add('text input', () => <Input {...inputProps} />)
  .add('textarea input', () => <Textarea {...inputProps} />);

storiesOf('Buttons', module).add('various', () => (
  <div>
    normal:
    <Btn /> <Btn>Boom</Btn> <Btn extraCss="p3">More padding</Btn>{' '}
    <Btn onClick={() => alert('btn clicked!')}>Click me!</Btn>
    <hr />
    <Btn kind="outline" /> <Btn kind="outline" size="big" />
  </div>
));
