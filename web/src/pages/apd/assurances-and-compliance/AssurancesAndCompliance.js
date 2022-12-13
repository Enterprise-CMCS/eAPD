import { ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';
import { assurancesAndCompliance as schema } from '@cms-eapd/common';

import { titleCase } from 'title-case';
import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights
} from '../../../redux/actions/editApd';
import { Section, Subsection } from '../../../components/Section';
import TextArea from '../../../components/TextArea';
import regLinks from '../../../data/assurancesAndCompliance.yaml';
import { t } from '../../../i18n';
import {
  selectFederalCitations,
  selectAdminCheckEnabled
} from '../../../redux/selectors/apd.selectors';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

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

const AssurancesAndCompliance = ({
  citations,
  complyingWithProcurement,
  complyingWithRecordsAccess,
  complyingWithSecurity,
  complyingWithSoftwareRights,
  justificationForProcurement,
  justificationForRecordsAccess,
  justificationForSecurity,
  justificationForSoftwareRights,
  adminCheck
}) => {
  AssurancesAndCompliance.displayName = 'AssurancesAndCompliance';

  const { procurement, recordsAccess, softwareRights, security } = citations;

  const {
    control,
    trigger,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      procurement,
      recordsAccess,
      softwareRights,
      security
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    if (adminCheck) {
      trigger();
    } else {
      clearErrors();
    }
  }, [adminCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCheckChange(section, index, newValue) {
    switch (section) {
      case 'procurement':
        return complyingWithProcurement(index, newValue);
      case 'recordsAccess':
        return complyingWithRecordsAccess(index, newValue);
      case 'security':
        return complyingWithSecurity(index, newValue);
      case 'softwareRights':
        return complyingWithSoftwareRights(index, newValue);
      default:
        return null;
    }
  }

  const handleExplanationChange = (section, index, value) => {
    switch (section) {
      case 'procurement':
        return justificationForProcurement(index, value);
      case 'recordsAccess':
        return justificationForRecordsAccess(index, value);
      case 'security':
        return justificationForSecurity(index, value);
      case 'softwareRights':
        return justificationForSoftwareRights(index, value);
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <AlertMissingFFY />
      <Section id="assurances-compliance" resource="assurancesAndCompliance">
        <Subsection
          id="assurances-compliance-fed-citations"
          resource="assurancesAndCompliance.citations"
        >
          {Object.entries(regLinks).map(([name, regulations]) => (
            <div key={name} className="ds-u-margin-bottom--3">
              <h4 className="ds-h4">
                {titleCase(t(`assurancesAndCompliance.headings.${name}`))}
              </h4>
              {citations[name].map(({ title, checked, explanation }, index) => (
                <Controller
                  key={title}
                  name={`${name}.${index}.checked`}
                  control={control}
                  render={({ field: { onChange: radioOnChange } }) => (
                    <ChoiceList
                      label={
                        <legend className="ds-c-label">
                          Are you complying with{' '}
                          <strong>
                            <LinkOrText
                              link={regulations[title]}
                              title={title}
                            />
                          </strong>
                          ?
                        </legend>
                      }
                      name={`${name}.${index}.checked`}
                      value={checked}
                      choices={[
                        {
                          label: 'Yes',
                          value: 'yes',
                          checked: checked === true
                        },
                        {
                          label: 'No',
                          value: 'no',
                          checked: checked === false,
                          checkedChildren: (
                            <div className="ds-c-choice__checkedChild">
                              <Controller
                                name={`${name}.${index}.explanation`}
                                control={control}
                                render={({ field: { ...props } }) => (
                                  <TextArea
                                    {...props}
                                    label="Please explain"
                                    value={explanation}
                                    onChange={({ target: { value } }) => {
                                      setValue(
                                        `${name}.${index}.explanation`,
                                        value
                                      );
                                      handleExplanationChange(
                                        name,
                                        index,
                                        value
                                      );
                                      if (adminCheck) {
                                        trigger(`${name}.${index}.explanation`);
                                      }
                                    }}
                                    errorMessage={
                                      errors?.[name]?.[index]?.explanation
                                        ?.message
                                    }
                                    errorPlacement="bottom"
                                    rows={5}
                                  />
                                )}
                              />
                            </div>
                          )
                        }
                      ]}
                      type="radio"
                      size="small"
                      onChange={e => {
                        const boolValue = e.target.value === 'yes';
                        radioOnChange(boolValue);
                        handleCheckChange(name, index, boolValue);
                        if (adminCheck) {
                          trigger(`${name}.${index}.checked`);
                          if (boolValue === false) {
                            trigger(`${name}.${index}.explanation`);
                          }
                        }
                      }}
                      errorMessage={errors?.[name]?.[index]?.checked?.message}
                      errorPlacement="bottom"
                    />
                  )}
                />
              ))}
            </div>
          ))}
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

AssurancesAndCompliance.propTypes = {
  citations: PropTypes.object.isRequired,
  complyingWithProcurement: PropTypes.func.isRequired,
  complyingWithRecordsAccess: PropTypes.func.isRequired,
  complyingWithSecurity: PropTypes.func.isRequired,
  complyingWithSoftwareRights: PropTypes.func.isRequired,
  justificationForProcurement: PropTypes.func.isRequired,
  justificationForRecordsAccess: PropTypes.func.isRequired,
  justificationForSecurity: PropTypes.func.isRequired,
  justificationForSoftwareRights: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  citations: selectFederalCitations(state),
  adminCheck: selectAdminCheckEnabled(state)
});

const mapDispatchToProps = {
  complyingWithProcurement: setComplyingWithProcurement,
  complyingWithRecordsAccess: setComplyingWithRecordsAccess,
  complyingWithSecurity: setComplyingWithSecurity,
  complyingWithSoftwareRights: setComplyingWithSoftwareRights,
  justificationForProcurement: setJustificationForProcurement,
  justificationForRecordsAccess: setJustificationForRecordsAccess,
  justificationForSecurity: setJustificationForSecurity,
  justificationForSoftwareRights: setJustificationForSoftwareRights
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssurancesAndCompliance);
export {
  AssurancesAndCompliance as plain,
  mapStateToProps,
  mapDispatchToProps,
  LinkOrText
};
