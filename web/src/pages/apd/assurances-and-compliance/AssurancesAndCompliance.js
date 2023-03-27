import ChoiceList from '../../../components/ChoiceList';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';
import {
  APD_TYPE,
  hitechAssurancesAndComplianceSchema,
  mmisAssurancesAndComplianceSchema
} from '@cms-eapd/common';

import { titleCase } from 'title-case';
import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setComplyingWithIndependentVV,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights,
  setJustificationForIndependentVV
} from '../../../redux/actions/editApd';
import { Section, Subsection } from '../../../components/Section';
import TextArea from '../../../components/TextArea';
import regLinks from '../../../data/assurancesAndCompliance.yaml';
import { t } from '../../../i18n';
import {
  selectFederalCitations,
  selectAdminCheckEnabled,
  selectApdType
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
  complyingWithIndependentVV,
  justificationForProcurement,
  justificationForRecordsAccess,
  justificationForSecurity,
  justificationForSoftwareRights,
  justificationForIndependentVV,
  apdType,
  adminCheck
}) => {
  AssurancesAndCompliance.displayName = 'AssurancesAndCompliance';

  const {
    procurement = {},
    recordsAccess = {},
    softwareRights = {},
    security = {},
    independentVV = {}
  } = citations;
  const schema =
    apdType === APD_TYPE.HITECH
      ? hitechAssurancesAndComplianceSchema
      : mmisAssurancesAndComplianceSchema;

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
      security,
      independentVV
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
      case 'independentVV':
        return complyingWithIndependentVV(index, newValue);
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
      case 'independentVV':
        return justificationForIndependentVV(index, value);
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
          {Object.entries(regLinks[apdType]).map(([name, regulations]) => (
            <div
              key={name}
              className="ds-u-margin-top--6 ds-u-margin-bottom--0"
            >
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
                      className="ds-u-margin-top--0"
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
  apdType: PropTypes.string.isRequired,
  adminCheck: PropTypes.bool.isRequired,
  complyingWithProcurement: PropTypes.func.isRequired,
  complyingWithRecordsAccess: PropTypes.func.isRequired,
  complyingWithSecurity: PropTypes.func.isRequired,
  complyingWithSoftwareRights: PropTypes.func.isRequired,
  complyingWithIndependentVV: PropTypes.func.isRequired,
  justificationForProcurement: PropTypes.func.isRequired,
  justificationForRecordsAccess: PropTypes.func.isRequired,
  justificationForSecurity: PropTypes.func.isRequired,
  justificationForSoftwareRights: PropTypes.func.isRequired,
  justificationForIndependentVV: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  citations: selectFederalCitations(state),
  apdType: (selectApdType(state) || '').toLowerCase(),
  adminCheck: selectAdminCheckEnabled(state)
});

const mapDispatchToProps = {
  complyingWithProcurement: setComplyingWithProcurement,
  complyingWithRecordsAccess: setComplyingWithRecordsAccess,
  complyingWithSecurity: setComplyingWithSecurity,
  complyingWithSoftwareRights: setComplyingWithSoftwareRights,
  complyingWithIndependentVV: setComplyingWithIndependentVV,
  justificationForProcurement: setJustificationForProcurement,
  justificationForRecordsAccess: setJustificationForRecordsAccess,
  justificationForSecurity: setJustificationForSecurity,
  justificationForSoftwareRights: setJustificationForSoftwareRights,
  justificationForIndependentVV: setJustificationForIndependentVV
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
