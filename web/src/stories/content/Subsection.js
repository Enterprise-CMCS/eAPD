import React, { Fragment } from 'react';

import RenderViewbox from '../RenderViewbox';
import { Subsection } from '../../components/Section';

const SubsectionStory = () => (
  <Fragment>
    <h1>Subsection</h1>
    <h2>It renders like this:</h2>
    <RenderViewbox>
      <Subsection
        id="storybook_subsection_id"
        resource="storybook.subsection"
        open
      >
        ...child content here...
      </Subsection>
    </RenderViewbox>
    <h2>The YAML looks like this:</h2>
    <pre>
      <code>
        {`subsection:
  title: Subsection title
  instruction:
    heading: Subsection instruction heading
    short: Subsection instruction short
    detail: Subsection instruction detail
    helpText: Subsection instruction helptext`}
      </code>
    </pre>
    <p>
      The <code>instruction</code> bits will be rendered with a
      <code>&lt;Instruction /&gt;</code> component.
    </p>
    <hr />
    <p>
      <pre>
        {`<Subsection
  id="storybook_subsection_id"
  resource="storybook.subsection"
  open
  nested={false}
/>`}
      </pre>
    </p>
    <table className="props">
      <tr>
        <th>prop</th>
        <th>type</th>
        <th>description</th>
      </tr>
      <tr>
        <td>id</td>
        <td>string</td>
        <td>
          <code>id</code> prop applied to the DOM element
        </td>
      </tr>
      <tr>
        <td>resource</td>
        <td>string</td>
        <td>
          The path in the YAML to the subsection block. It should refer to the
          property in the YAML that contains the <code>title</code> and{' '}
          <code>instruction</code> properties. The sub-properties are optional
          and will not be rendered if they‘re missing.
        </td>
      </tr>
      <tr>
        <td>open</td>
        <td>bool</td>
        <td>
          Whether the subsection should be initially opened. This is used to
          initialize an internal state variable and does not affect whether the
          subsection can be expanded/collapsed by user action later. Defaults to{' '}
          <strong>
            <code>false</code>
          </strong>
          .
        </td>
      </tr>
      <tr>
        <td>nested</td>
        <td>bool</td>
        <td>
          Passed to the <code>&lt;Collapsible /&gt;</code> component. Indicates
          whether this subsection is nested under something else and affects the
          sticky header behavior.
        </td>
      </tr>
    </table>
  </Fragment>
);

export default SubsectionStory;
