import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateApd as updateApdAction } from '../actions/apd';
import { Input } from '../components/Inputs';
import { Section, Subsection } from '../components/Section';
import regLinks from '../data/assurancesAndCompliance.yaml';
import { t } from '../i18n';

const yes = t('assurancesAndCompliance.formLabels._yes');
const no = t('assurancesAndCompliance.formLabels._no');

const AssurancesAndCompliance = ({ sections: apdSections, updateApd }) => {
  const handleCheckChange = (section, index, newValue) => () => {
    updateApd({
      assurancesAndCompliance: { [section]: { [index]: { checked: newValue } } }
    });
  };

  const handleExplanationChange = (section, index) => e => {
    updateApd({
      assurancesAndCompliance: {
        [section]: { [index]: { explanation: e.target.value } }
      }
    });
  };

  return (
    <Section id="assurances-compliance" resource="assurancesAndCompliance">
      <Subsection resource="assurancesAndCompliance.citations">
        <table>
          <tbody>
            {Object.entries(regLinks).map(([name, regulations]) => (
              <Fragment key={name}>
                <tr>
                  <td colSpan="4">
                    <h3>{t(`assurancesAndCompliance.headers.${name}`)}</h3>
                  </td>
                </tr>

                {apdSections[name].map(
                  ({ title, checked, explanation }, index) => {
                    const link = regulations[title];
                    return (
                      <tr style={{ height: '4.5em' }}>
                        <td style={{ width: '40%' }}>
                          {link ? (
                            <a href={link} target="_blank">
                              {title}
                            </a>
                          ) : (
                            title
                          )}
                        </td>
                        <td style={{ width: 1 }}>
                          {' '}
                          <label className="mr1">
                            <input
                              type="radio"
                              value={yes}
                              checked={checked}
                              onChange={handleCheckChange(name, index, true)}
                            />
                            {yes}
                          </label>
                        </td>
                        <td style={{ width: 1 }}>
                          {' '}
                          <label className="mr1">
                            <input
                              type="radio"
                              value={no}
                              checked={!checked}
                              onChange={handleCheckChange(name, index, false)}
                            />
                            {no}
                          </label>
                        </td>
                        <td>
                          {checked || (
                            <Input
                              name={`explanation-${name}-${title}`.replace(
                                /\s/g,
                                '_'
                              )}
                              label={`explanation for why you do not comply with ${title}`}
                              hideLabel
                              value={explanation}
                              onChange={handleExplanationChange(name, index)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  }
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </Subsection>
    </Section>
  );
};

AssurancesAndCompliance.propTypes = {
  sections: PropTypes.object.isRequired,
  updateApd: PropTypes.func.isRequired
};

const mapStateToProps = ({
  apd: { data: { assurancesAndCompliance: sections } }
}) => ({ sections });

const mapDispatchToProps = {
  updateApd: updateApdAction
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AssurancesAndCompliance
);
