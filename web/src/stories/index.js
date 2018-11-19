import React, { Component } from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import { DocumentItem, ProgressDot, ProgressLine } from './DashboardStory';
import InstructionStory from './InstructionStory';
import Btn from '../components/Btn';
import { DollarInput, Input, Textarea } from '../components/Inputs';

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

storiesOf('Numeric inputs', module).add('Dollars', () => {
  class Dollar extends Component {
    state = { value: 0 };

    change = e => {
      console.log(e.target.value);
      this.setState({ value: e.target.value });
    };

    render() {
      return (
        <DollarInput
          hideLabel
          wrapperClass="m0"
          className="fake-spacer-input m0 input input-condensed mono right-align"
          label="fake-spacer-input"
          name="fake-spacer-input"
          value={this.state.value}
          onChange={this.change}
        />
      );
    }
  }

  return <Dollar />;
});
