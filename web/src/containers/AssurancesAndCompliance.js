import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { t } from '../i18n';
import { Input } from '../components/Inputs';
import { Section, Subsection } from '../components/Section';
import { updateApd as updateApdAction } from '../actions/apd';

import regLinks from '../data/assurancesAndCompliance.yaml';

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

  console.log(apdSections);

  return (
    <Section id="assurances-compliance" resource="assurancesAndCompliance">
      {Object.entries(regLinks).map(([name, regulations]) => (
        <Subsection key={name} resource={`assurancesAndCompliance.${name}`}>
          <table>
            <tbody>
              {apdSections[name].map(
                ({ title, checked, explanation }, index) => {
                  const link = regulations[title];
                  return (
                    <tr key={title}>
                      <td>
                        {link ? (
                          <a href={link} target="_blank">
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                      </td>
                      <td>
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
                      <td>
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
                            label={`explanation-${name}-${title}`}
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
            </tbody>
          </table>
        </Subsection>
      ))}
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
