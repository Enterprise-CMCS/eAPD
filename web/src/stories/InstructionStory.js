import React, { Component, Fragment } from 'react';

import RenderViewbox from './RenderViewbox';
import Instruction from '../components/Instruction';

class InstructionStory extends Component {
  state = { reverse: false };

  toggle = () => this.setState({ reverse: !this.state.reverse });

  render = () => (
    <Fragment>
      <h1>Instruction</h1>
      <h2>It renders like this:</h2>
      <RenderViewbox>
        <Instruction
          source="storybook.instruction"
          reverse={this.state.reverse}
        />
      </RenderViewbox>
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

export default InstructionStory;
