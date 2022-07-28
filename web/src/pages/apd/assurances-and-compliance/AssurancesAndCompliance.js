import { ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { connect } from 'react-redux';
import validationSchema from '@cms-eapd/common/schemas/assurancesAndCompliance';

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
import { selectFederalCitations } from '../../../redux/selectors/apd.selectors';
import AlertMissingFFY from '../../../components/AlertMissingFFY';

// const namify = (name, title) =>
//   `explanation-${name}-${title}`.replace(/\s/g, '_');

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
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      procurement,
      recordsAccess,
      softwareRights,
      security
    },
    resolver: joiResolver(validationSchema)
  });
  console.log('citations', citations);
  console.log({ adminCheck });

  useEffect(() => {
    console.log('form values', getValues());
    const formErrors = validationSchema.validate(getValues());
    const validationErrors = validationSchema.validate(citations);
    console.log({ errors });
    console.log({ formErrors });
    console.log({ validationErrors });
  }, [citations]);

  useEffect(() => {
    if (adminCheck) {
      trigger();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                  name={`${name}.${index}`}
                  control={control}
                  render={({
                    field: { onChange: radioOnChange, onBlur: radioOnBlur }
                  }) => (
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
                                render={({
                                  field: { onChange: textOnChange, ...props }
                                }) => (
                                  <TextArea
                                    {...props}
                                    label="Please explain"
                                    value={explanation}
                                    onChange={({ target: { value } }) => {
                                      textOnChange(value);
                                      handleExplanationChange(
                                        name,
                                        index,
                                        value
                                      );
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
                      onBlur={radioOnBlur}
                      onChange={({ target: { value } }) => {
                        const boolValue = value === 'yes';
                        console.log(`${name}.${index}.checked ${boolValue}`);
                        radioOnChange(boolValue);
                        handleCheckChange(name, index, boolValue);
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
  adminCheck: state.apd.adminCheck
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
