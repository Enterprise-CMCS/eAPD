import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Instruction from './Instruction';
import { t } from '../i18n';

const SectionTitle = ({ children }) => <h2>{children}</h2>;

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const SectionDesc = ({ children }) => <p className="mb4 text-l">{children}</p>;

SectionDesc.propTypes = {
  children: PropTypes.node.isRequired
};

const Section = ({ children, id, isNumbered, resource }) => {
  const title = t([resource, 'title'], { defaultValue: false });
  const helptext = t([resource, 'helpText'], { defaultValue: false });

  return (
    <section id={id} className={isNumbered && 'numbered-section'}>
      <h2 className="ds-h2">{title}</h2>
      <span className="ds-text--lead">{helptext}</span>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  resource: PropTypes.string,
  isNumbered: PropTypes.bool
};

Section.defaultProps = {
  id: null,
  resource: null,
  isNumbered: false
};

const Subsection = ({ children, id, nested, resource }) => {
  const title = t([resource, 'title'], { defaultValue: '' });

  return (
    <Fragment>
      {!nested && (
        <h3 id={id} className="subsection--title ds-h3">
          {title}
        </h3>
      )}
      {nested && (
        <h4 id={id} className="ds-h3">
          {title}
        </h4>
      )}
      <Instruction source={`${resource}.instruction`} />
      {children}
    </Fragment>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  nested: PropTypes.bool,
  resource: PropTypes.string
};

Subsection.defaultProps = {
  resource: null,
  id: null,
  nested: false
};

export default Section;

export { Section, SectionDesc, SectionTitle, Subsection };
