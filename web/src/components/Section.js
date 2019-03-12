import PropTypes from 'prop-types';
import React from 'react';

import Collapsible from './Collapsible';
import Instruction from './Instruction';
import { t } from '../i18n';

const SectionTitle = ({ children }) => (
  <h2 className="mt1 mb2 h1 sm-h0 teal light">{children}</h2>
);

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const SectionDesc = ({ children }) => <p className="mb4 text-l">{children}</p>;

SectionDesc.propTypes = {
  children: PropTypes.node.isRequired
};

const Section = ({ children, id, number = 0, resource }) => {
  const title = t([resource, 'title'], { defaultValue: false });
  const helptext = t([resource, 'helpText'], { defaultValue: false });

  return (
    <section
      id={id}
      className="component-section ds-u-margin-top--2 ds-u-padding-top--2"
    >
      <div className="ds-u-margin-bottom--2 ds-u-padding-bottom--2">
        {!!number && (
          <div className="component-section--number ds-u-fill--primary ds-u-radius--circle">
            <h2 className="ds-u-font-weight--normal ds-u-color--base-inverse">
              {number}
            </h2>
          </div>
        )}
        <h2 className="ds-h2">{title}</h2>
        <span className="ds-text--lead">{helptext}</span>
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resource: PropTypes.string
};

Section.defaultProps = {
  id: null,
  number: 0,
  resource: null
};

const Subsection = ({ children, id, nested, open, resource }) => {
  const title = t([resource, 'title'], { defaultValue: '' });

  return (
    <Collapsible id={id} title={title} open={open} nested={nested}>
      <Instruction source={`${resource}.instruction`} />
      {children}
    </Collapsible>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  nested: PropTypes.bool,
  open: PropTypes.bool,
  resource: PropTypes.string
};

Subsection.defaultProps = {
  resource: null,
  id: null,
  nested: false,
  open: false
};

export default Section;
export { Section, SectionDesc, SectionTitle, Subsection };
