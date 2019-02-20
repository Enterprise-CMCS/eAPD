import React, { Component, Fragment } from 'react';

import RenderViewbox from '../RenderViewbox';
import Instruction from '../../components/Instruction';

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
        <code>
          {`instruction:
  heading: Instruction heading
  short: Short instruction
  detail: Instruction ***detail*** here
  helpText: >-
    this is help text!
    
    it covers several lines`}
        </code>
      </pre>
      <p>
        The <code>detail</code> and <code>helpText</code> properties are treated
        as Markdown, so they will maintain multiple lines and also support
        simple formatting such as <em>*italics*</em> and{' '}
        <strong>**bold**</strong>
      </p>
      <hr />
      <p>
        <code>
          {`<Instruction source="storybook.instruction" reverse={${
            this.state.reverse ? 'true' : 'false'
          }} args={{}}/>`}
        </code>
      </p>
      <table className="props">
        <tr>
          <th>prop</th>
          <th>type</th>
          <th>description</th>
        </tr>
        <tr>
          <td>source</td>
          <td>string</td>
          <td>
            The path in the YAML to the instruction block. It should refer
            specifically to the <code>instruction</code> property in the YAML,
            and it will derive the child property names from there.
          </td>
        </tr>
        <tr>
          <td>reverse</td>
          <td>bool</td>
          <td>
            Whether the short instruction and detail should be swapped, so the
            detail comes first and the short comes afterwards. Defaults to{' '}
            <strong>
              <code>false</code>
            </strong>
            .<br />
            <button className="btn btn-primary" onClick={this.toggle}>
              toggle to {this.state.reverse ? 'false' : 'true'}
            </button>
          </td>
        </tr>
        <tr>
          <td>args</td>
          <td>object</td>
          <td>
            An object to pass into the internationalization library,
            representing variable names and values to be used for replacements.
            For example, if the localization string is:
            <pre>
              Hello {'{{ name }}'} from the year {'{{ year }}'}
            </pre>
            The args object might look like this:
            <pre>
              {`{
  name: 'George',
  year: 1787
}`}
            </pre>
            This prop is optional.
          </td>
        </tr>
      </table>
    </Fragment>
  );
}

export default InstructionStory;
