import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Waypoint from './ConnectedWaypoint';
import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights
} from '../actions/editApd';
import Choice from '../components/Choice';
import { Section, Subsection } from '../components/Section';
import TextArea from '../components/TextArea';
import regLinks from '../data/assurancesAndCompliance.yaml';
import { t } from '../i18n';

const namify = (name, title) =>
  `explanation-${name}-${title}`.replace(/\s/g, '_');

const LinkOrText = ({ link, title }) => {
  if (!link) return title;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  );
};

LinkOrText.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired
};

LinkOrText.defaultProps = {
  link: null
};

const AssurancesAndCompliance = () => {
  const dispatch = useDispatch();

  const apdSections = useSelector(
    ({
      apd: {
        data: { federalCitations: sections }
      }
    }) => sections
  );

  const handleCheckChange = (section, index, newValue) => () => {
    switch (section) {
      case 'procurement':
        return dispatch(setComplyingWithProcurement(index, newValue));
      case 'recordsAccess':
        return dispatch(setComplyingWithRecordsAccess(index, newValue));
      case 'security':
        return dispatch(setComplyingWithSecurity(index, newValue));
      case 'softwareRights':
        return dispatch(setComplyingWithSoftwareRights(index, newValue));
      default:
        return null;
    }
  };

  const handleExplanationChange = (section, index) => ({
    target: { value }
  }) => {
    switch (section) {
      case 'procurement':
        return dispatch(setJustificationForProcurement(index, value));
      case 'recordsAccess':
        return dispatch(setJustificationForRecordsAccess(index, value));
      case 'security':
        return dispatch(setJustificationForSecurity(index, value));
      case 'softwareRights':
        return dispatch(setJustificationForSoftwareRights(index, value));
      default:
        return null;
    }
  };

  return (
    <Waypoint id="assurances-compliance">
      <Section
        isNumbered
        id="assurances-compliance"
        resource="assurancesAndCompliance"
      >
        <Subsection
          id="assurances-compliance-fed-citations"
          resource="assurancesAndCompliance.citations"
        >
          {Object.entries(regLinks).map(([name, regulations]) => (
            <div key={name} className="ds-u-margin-bottom--3">
              <h4 className="ds-h4">
                {t(`assurancesAndCompliance.headings.${name}`)}
              </h4>
              {apdSections[name].map(
                ({ title, checked, explanation }, index) => (
                  <fieldset key={title} className="ds-u-margin-top--2">
                    <legend className="ds-c-label">
                      Are you complying with{' '}
                      <strong>
                        <LinkOrText link={regulations[title]} title={title} />
                      </strong>
                      ?
                    </legend>
                    <Choice
                      type="radio"
                      value="yes"
                      name={`apd-assurances-yes-${namify(name, title)}`}
                      size="small"
                      checked={checked === true}
                      onChange={handleCheckChange(name, index, true)}
                    >
                      Yes
                    </Choice>
                    <Choice
                      type="radio"
                      value="no"
                      name={`apd-assurances-no-${namify(name, title)}`}
                      size="small"
                      checked={checked === false}
                      onChange={handleCheckChange(name, index, false)}
                      checkedChildren={
                        <div className="ds-c-choice__checkedChild">
                          <TextArea
                            label="Please explain"
                            name={namify(name, title)}
                            value={explanation}
                            onChange={handleExplanationChange(name, index)}
                            rows={5}
                          />
                        </div>
                      }
                    >
                      No
                    </Choice>
                  </fieldset>
                )
              )}
            </div>
          ))}
        </Subsection>
      </Section>
    </Waypoint>
  );
};

export default AssurancesAndCompliance;
export { LinkOrText };
