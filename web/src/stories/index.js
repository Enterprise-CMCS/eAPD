import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies

import Btn from '../components/Btn';
import Collapsible from '../components/Collapsible';
import { Input, Textarea } from '../components/Inputs';
import Md from '../components/Md';

import '../styles/index.css';

const HelpText = ({ children }) => (
  <Md content={children} wrapper="p" className="mb2 p1 h5 alert alert-help" />
);

const t = {
  'demo.instruction': {
    heading: 'Instruction heading',
    short: 'Short instruction',
    detail: 'Instruction detail here',
    helpText: 'this is help text!'
  }
};

const Instruction = ({ reverse, source }) => (
  <div>
    {t[source].heading && <h3>{t[source].heading}</h3>}
    {reverse && t[source].detail && <p>{t[source].detail}</p>}
    {t[source].short && <p className="strong">{t[source].short}</p>}
    {!reverse && t[source].detail && <p>{t[source].detail}</p>}
    {t[source].helpText && <HelpText>{t[source].helpText}</HelpText>}
  </div>
);

const Box = ({ children }) => (
  <div
    className="m0 pl1"
    style={{
      border: '1px solid rgba(0,0,0,0.1)',
      borderWidth: '1px 1px 1px 3rem'
    }}
  >
    {children}
  </div>
);

class InstructionStory extends Component {
  state = { reverse: false };

  toggle = () => this.setState({ reverse: !this.state.reverse });

  render = () => (
    <Fragment>
      <h1>Instruction</h1>
      <h2>It renders like this:</h2>
      <Box>
        <Instruction source="demo.instruction" reverse={this.state.reverse} />
      </Box>
      <h2>The YAML looks like this:</h2>
      <pre>
        <code>{`instruction:
  heading: Instruction heading
  short: Short instruction
  detail: Instruction detail here
  helpText: this is help text!`}</code>
      </pre>
      <hr />
      <p>
        <code
        >{`<Instruction source="demo.instruction" reverse={false}/>`}</code>
      </p>
      <p>
        The <code>source</code> prop is the path in the YAML to the instruction
        block. It should refer specifically to the <code>instruction</code>{' '}
        property in the YAML, and it will derive the child property names from
        there.
      </p>
      <p>
        And it can be reversed with the <code>reverse</code> prop. When this
        prop is <code>true</code>, the short and detail instruction properties
        are switched. Wanna see?
      </p>
      <button className="btn btn-primary" onClick={this.toggle}>
        Make it {this.state.reverse ? 'not' : ''} reversed
      </button>
    </Fragment>
  );
}

storiesOf('Texty components', module).add('Instruction', () => (
  <InstructionStory />
));

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
