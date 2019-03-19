import React, { Fragment } from 'react';

import RenderViewbox from '../RenderViewbox';
import { Section } from '../../components/Section';

const SectionStory = () => (
  <Fragment>
    <h1>Section</h1>
    <h2>It renders like this:</h2>
    <RenderViewbox>
      <Section
        id="storybook_section_id"
        resource="storybook.section"
        sectionClass="component-section"
      >
        ...child content here...
      </Section>
    </RenderViewbox>
    <h2>The YAML looks like this:</h2>
    <pre>
      <code>
        {`section:
  title: Section title
  helpText: Section helptext`}
      </code>
    </pre>
    <hr />
    <p>
      <pre>
        {`<Section id="storybook_section_id" resource="storybook.section" sectionClass="component-section">
  ...child content here...
</Section>`}
      </pre>
    </p>
    <p>
      The <code>resource</code> prop is the path in the YAML to the section
      block. It should refer to the property in the YAML that contains the
      <code>title</code> and <code>helpText</code> properties. These
      sub-properties are optional and will not be rendered if they‘re missing.
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
        <td>sectionClass</td>
        <td>string</td>
        <td>defaults to null; adding a class of <code>component-section</code> will render a bubble with a CSS counter in it to the left.</td>
      </tr>
      <tr>
        <td>resource</td>
        <td>string</td>
        <td>
          The path in the YAML to the section block. It should refer to the
          property in the YAML that contains the <code>title</code>,{' '}
          <code>subtitle</code>, and <code>helpText</code> properties. All of
          these sub-properties are optional and will not be rendered if they‘re
          missing.
        </td>
      </tr>
    </table>
  </Fragment>
);

export default SectionStory;
