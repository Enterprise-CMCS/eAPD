import PropTypes from 'prop-types';
import React from 'react';

import { titleCase } from 'title-case';
import Instruction from './Instruction';
import { t } from '../i18n';
import SecondaryNav from '../layout/nav/SecondaryNav';

const Section = ({ children, id, resource }) => {
  const title = t([resource, 'title'], { defaultValue: false });
  const helpText = t([resource, 'helpText'], { defaultValue: false });

  return (
    <section id={id}>
      {title && <h2 className="ds-h2">{titleCase(title)}</h2>}
      {helpText && (
        <div className="ds-text--lead section--help-text">{helpText}</div>
      )}

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
    <div className="subsection--title">
      {!nested && (
        <h3 id={id} className={`${headerClassName || ''} ds-h3`}>
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
    </div>
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

export { Section, Subsection };
