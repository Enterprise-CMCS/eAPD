import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ChoiceList } from '@cmsgov/design-system';

import {
  setEnhancedFundingQualification,
  setEnhancedFundingJustification
} from '../../../../redux/actions/editActivity/conditionsForEnhancedFunding';
import { selectAdminCheckEnabled } from '../../../../redux/selectors/apd.selectors';
import { selectConditionsForEnhancedFundingByActivityIndex } from '../../../../redux/selectors/activities.selectors';
import { Subsection } from '../../../../components/Section';
import StandardsAndConditionsHelpDrawer from '../../../../components/StandardsAndConditionsHelpDrawer';
import Instruction from '../../../../components/Instruction';
import RichText from '../../../../components/RichText';
import { conditionsForEnhancedFundingSchema as schema } from '@cms-eapd/common';

const ConditionsForEnhancedFunding = ({
  activityIndex,
  enhancedFundingQualification,
  enhancedFundingJustification,
  setQualification,
  setJustification,
  adminCheck
}) => {
  const {
    control,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    defaultValues: {
      enhancedFundingQualification,
      enhancedFundingJustification
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

  const handleQualificationChange = value => {
    setQualification(activityIndex, value);
  };

  const handleJustificationChange = value => {
    setJustification(activityIndex, value);
  };

  return (
    <Subsection resource="activities.conditions">
      <StandardsAndConditionsHelpDrawer />

      <div className="data-entry-box">
        <Instruction
          labelFor="qualification-field"
          source="activities.conditions.qualification"
        />
        <Controller
          name="enhancedFundingQualification"
          control={control}
          render={({ field: { onChange: onRadioChange, ...props } }) => (
            <ChoiceList
              id="qualification-field"
              {...props}
              choices={[
                {
                  label:
                    'Yes, this activity is qualified for enhanced funding.',
                  value: 'true',
                  checked:
                    enhancedFundingQualification === 'true' ||
                    enhancedFundingQualification === true,
                  checkedChildren: (
                    <div className="ds-c-choice__checkedChild">
                      <Instruction
                        labelFor="justification-field"
                        source="activities.conditions.justification"
                      />
                      <Controller
                        name="enhancedFundingJustification"
                        control={control}
                        render={({
                          field: { onChange: onTextChange, ...props }
                        }) => (
                          <RichText
                            {...props}
                            id="justification-field"
                            iframe_aria_text="Enhanced Funding Justification Text Area"
                            content={enhancedFundingJustification}
                            onSync={html => {
                              handleJustificationChange(html);
                              onTextChange(html);
                            }}
                            editorClassName="rte-textarea-l"
                            error={
                              adminCheck &&
                              errors?.enhancedFundingJustification?.message
                            }
                          />
                        )}
                      />
                    </div>
                  )
                },
                {
                  label:
                    'No, not applicable for enhanced funding, this activity has a 50/50 federal state split.',
                  value: 'false',
                  checked:
                    enhancedFundingQualification === 'false' ||
                    enhancedFundingQualification === false
                }
              ]}
              type="radio"
              size="small"
              className="ds-u-margin-top--0 full-width"
              onChange={({ target: { value } }) => {
                onRadioChange(value);
                handleQualificationChange(value);
                if (adminCheck) {
                  trigger('enhancedFundingJustification');
                }
              }}
              errorMessage={
                adminCheck && errors?.enhancedFundingQualification?.message
              }
              errorPlacement="bottom"
            />
          )}
        />
      </div>
    </Subsection>
  );
};

ConditionsForEnhancedFunding.propTypes = {
  activityIndex: PropTypes.number.isRequired,
  enhancedFundingQualification: PropTypes.bool,
  enhancedFundingJustification: PropTypes.string,
  setQualification: PropTypes.func.isRequired,
  setJustification: PropTypes.func.isRequired,
  adminCheck: PropTypes.bool.isRequired
};

const mapStateToProps = (
  state,
  { activityIndex },
  {
    getConditionsForEnhancedFunding = selectConditionsForEnhancedFundingByActivityIndex
  } = {}
) => {
  const { enhancedFundingQualification, enhancedFundingJustification } =
    getConditionsForEnhancedFunding(state, { activityIndex });
  return {
    adminCheck: selectAdminCheckEnabled(state),
    enhancedFundingQualification,
    enhancedFundingJustification
  };
};

const mapDispatchToProps = {
  setQualification: setEnhancedFundingQualification,
  setJustification: setEnhancedFundingJustification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConditionsForEnhancedFunding);

export {
  ConditionsForEnhancedFunding as plain,
  mapStateToProps,
  mapDispatchToProps
};
