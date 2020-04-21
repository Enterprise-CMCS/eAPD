import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import Instruction from './Instruction';
import { t } from '../i18n';
import SecondaryNav from './SecondaryNav';

const SectionTitle = ({ children }) => <h2>{children}</h2>;

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired
};

const SectionDesc = ({ children }) => <p className="mb4 text-l">{children}</p>;

SectionDesc.propTypes = {
  children: PropTypes.node.isRequired
};

const Section = ({ children, id, resource }) => {
  const title = t([resource, 'title'], { defaultValue: false });
  const helptext = t([resource, 'helpText'], { defaultValue: false });

  return (
    <section id={id}>
      {title && <h2 className="ds-h2">{title}</h2>}
      {helptext && <span className="ds-text--lead">{helptext}</span>}
      {children}
      <SecondaryNav />
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  resource: PropTypes.string
};

Section.defaultProps = {
  id: null,
  resource: null
};

const Subsection = ({ children, headerClassName, id, nested, resource }) => {
  const title = t([resource, 'title'], { defaultValue: '' });

  return (
    <Fragment>
      {!nested && (
        <h3
          id={id}
          className={`${headerClassName || ''} subsection--title ds-h3`}
        >
          {title}
        </h3>
      )}
      {nested && (
        <h5 id={id} className={`${headerClassName || ''} ds-h4`}>
          {title}
        </h5>
      )}
      <Instruction source={`${resource}.instruction`} />
      {children}
    </Fragment>
  );
};

Subsection.propTypes = {
  children: PropTypes.node.isRequired,
  headerClassName: PropTypes.string,
  id: PropTypes.string,
  nested: PropTypes.bool,
  resource: PropTypes.string
};

Subsection.defaultProps = {
  resource: null,
  headerClassName: null,
  id: null,
  nested: false
};

export default Section;

export { Section, SectionDesc, SectionTitle, Subsection };
