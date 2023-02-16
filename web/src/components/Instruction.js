import PropTypes from 'prop-types';
import React from 'react';

import { titleCase } from 'title-case';
import Md from './Md';
import { t } from '../i18n';

const Heading = ({ children, className, labelFor, level }) => {
  const Tag = level;
  const component = <Tag className={className}>{children}</Tag>;

  if (!labelFor) {
    return component;
  }
  return <label htmlFor={labelFor}>{component}</label>;
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  labelFor: PropTypes.string,
  level: PropTypes.string
};

Heading.defaultProps = {
  className: 'ds-h3',
  labelFor: null,
  level: 'h3'
};

const Instruction = ({
  args,
  disableTitleCaseConversion,
  reverse,
  source,
  headingDisplay,
  labelFor
}) => {
  const heading = t([source, 'heading'], { defaultValue: false, ...args });
  const short = t([source, 'short'], { defaultValue: false, ...args });
  const detail = t([source, 'detail'], { defaultValue: false, ...args });
  const list = t([source, 'list'], { defaultValue: false, ...args });
  const helpText = t([source, 'helpText'], { defaultValue: false, ...args });

  if (heading || short || detail || helpText) {
    return (
      <div>
        {heading && (
          <Heading {...headingDisplay} labelFor={labelFor}>
            {disableTitleCaseConversion ? heading : titleCase(heading)}
          </Heading>
        )}
        {(short || detail || list || helpText) && (
          <div className="visibility--screen">
            {reverse && detail && <Md content={detail} wrapper="p" />}
            {short && <p className="ds-u-font-weight--bold">{short}</p>}
            {!reverse && detail && <Md content={detail} wrapper="p" />}
            {list && (
              <ol className="ds-u-margin-bottom--4 ds-u-padding-left--2">
                {/* eslint-disable react/no-array-index-key */}
                {list.map((item, i) => (
                  <li className="ds-u-margin-bottom--2" key={i}>
                    <Md content={item} />
                  </li>
                ))}
                {/* eslint-enable react/no-array-index-key */}
              </ol>
            )}
            {helpText && (
              <Md content={helpText} wrapper="p" className="instruction-box" />
            )}
          </div>
        )}
      </div>
    );
  }
  return null;
};

Instruction.propTypes = {
  args: PropTypes.object,
  disableTitleCaseConversion: PropTypes.bool,
  reverse: PropTypes.bool,
  source: PropTypes.string.isRequired,
  headingDisplay: PropTypes.object,
  labelFor: PropTypes.string
};

Instruction.defaultProps = {
  args: null,
  disableTitleCaseConversion: true,
  reverse: false,
  headingDisplay: {
    level: 'h3',
    className: 'ds-h3'
  },
  labelFor: null
};

export default Instruction;
