import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { HelpDrawer, HelpDrawerToggle, Choice, ChoiceList, FormLabel } from '@cmsgov/design-system';

import {
  setActivityStandardAndConditionDoesNotSupportExplanation,
  setActivityStandardAndConditionSupportExplanation
} from '../../actions/editActivity';

import RichText from '../../components/RichText';
import TextArea from '../../components/TextArea';
import { selectActivityByIndex } from '../../reducers/activities.selectors';

import Icon, {
  faChevronRight,
} from '../../components/Icons';

const StandardsAndConditions = ({
  activity,
  activityIndex,
  setDoesNotSupport,
  setSupport
}) => {

  const [showRegulationDrawer, setShowRegulationDrawer] = useState(false);

  const handleDrawerClose = () => {
    setShowRegulationDrawer(false);
  }
  
  const handleDrawerOpen = () => {
    setShowRegulationDrawer(true);
  }
  
  const enhancedFundingChild = (
    <Fragment>
      <FormLabel
        className="ds-c-label--full-width ds-u-margin--0"
        hint={''}
        fieldId="activity-description-field"
      >
        <h4 className="ds-h4">Enhanced Funding Justification</h4>
        <p className="ds-u-font-weight--normal">Describe or list line by line how this activity will support the Medicaid Standards and Conditions <a href="#">42 CFR 433.112.</a></p>
        <p className="instruction-box ds-u-font-weight--normal">Example: 6. The state is currently developing a software for information retrieval that will be state owned, royalty free, and open source.</p>
      </FormLabel>
      <RichText
        name="enhanced funding justification"
        label="Enhanced funding justification"
        hint=""
        max={280}
        rows={6}
        className="data-entry-box"
        value={''}
        onChange={() => console.log('yep')}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <label htmlFor="standards-and-conditions-supports-field">
        <p>Standards and Conditions for Enhanced Funding is a set of criteria that qualifies a state for enhanced funding at their selected FFP rate. This is your opportunity to justify how your program supports Medicaid initiatives and warrants the selected match rate.</p>
        <div className="custom-hr" />
        <h4 className="ds-h4">Standards and Conditions for Enhanced Funding</h4>
      </label>
      <div className="ds-u-margin-bottom--6 ds-u-margin-top--3">
        <p className="ds-u-margin-bottom--3">
          Review Medicaid Standards and Conditions regulation and answer the
          following questions. If the activity has a match rate of 50-50, select
          ‘no’ below to proceed to the next page.
        </p>
        <HelpDrawerToggle
          helpDrawerOpen={showRegulationDrawer}
          showDrawer={handleDrawerOpen}
        >
          Review Standards and Conditions Regulation <Icon icon={faChevronRight} size="sm" />
        </HelpDrawerToggle>

        <fieldset className="ds-c-fieldset">
          <legend className="ds-c-label">
            <h4 className="ds-h4 ds-u-margin-top--2 ds-u-margin-bottom--0">
              Enhanced Funding Qualification
            </h4>
            <p className="ds-u-font-weight--normal">Indicate whether the selected FFP for this activity has a match rate of 75-25 or 90-10, therfore qualifies for enhanced funding.</p>
          </legend>
          <Choice
            name="radio_choice"
            type="radio"
            label="Yes, this activity is qualified for enhanced funding."
            value="yes"
            checkedChildren={
              <div className="ds-c-choice__checkedChild">
                {enhancedFundingChild}
              </div>
            }
            onChange={() => {}}
          />
          <Choice
            name="radio_choice"
            type="radio"
            label="No, this activity is not applicable for enhanced funding (50-50 FFP)."
            value="no"
            onChange={() => {}}
          />
        </fieldset>

        {showRegulationDrawer && (
            <HelpDrawer
              footerTitle="For more details on this regulation."
              footerBody={<p className="ds-text ds-u-margin--0"><a href="#">Review 42. CFR 433.112 documentation</a></p>}
              heading="Standards and Conditions Help"
              onCloseClick={handleDrawerClose}
            >
              <strong>Excerpt of 42 CFR 433.112 and Additional Conditions for Enhanced Funding</strong>
              <p>
                <ol>
                  <li>CMS determines the system is likely to provide more efficient, economical. and effective adminstation of the State plan.</li>
                  <li>CMS determines the system is likely to provide more efficient, economical. and effective adminstation of the State plan.</li>
                  <li>The system meets the system requirements, standards and conditions, and performance standards in Part 11 of the State Medicaid Manual, as periodically amended.</li>
                  <li>The system is compatible with the claims processing and information retrieval used in the adminstration of Medicare for prompt eligibility verification and for processing claims for persons eligible for both programs.</li>
                  <li>The system supports the data requirements of quality improvement organizations established under Part B of title XI of the Act. </li>
                  <li>The State owns any software that is designed, developed, installed or improved with 90 percent FFP.</li>
                </ol>
              </p>
            </HelpDrawer>
          )}

{/* 
        <h4>Enhanced Funding Qualification</h4>
        <RichText
          id="standards-and-conditions-supports-field"
          content={activity.standardsAndConditions.supports}
          onSync={html => setSupport(activityIndex, html)}
          editorClassName="rte-textarea-1"
        />

        <div className="ds-c-choice__checkedChild ds-u-margin-top--3">
          <TextArea
            label="If this activity does not support the Medicaid standards and conditions, please explain."
            name="activity-set-standards-and-conditions-non-support"
            onChange={({ target: { value } }) =>
              setDoesNotSupport(activityIndex, value)
            }
            rows={6}
            style={{ maxWidth: 'initial' }}
            value={activity.standardsAndConditions.doesNotSupport}
          />
        </div> */}
      </div>
    </Fragment>
  )
};

StandardsAndConditions.propTypes = {
  activity: PropTypes.object.isRequired,
  activityIndex: PropTypes.number.isRequired,
  setSupport: PropTypes.func.isRequired,
  setDoesNotSupport: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  activity: selectActivityByIndex(state, props)
});

const mapDispatchToProps = {
  setDoesNotSupport: setActivityStandardAndConditionDoesNotSupportExplanation,
  setSupport: setActivityStandardAndConditionSupportExplanation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandardsAndConditions);

export { StandardsAndConditions as plain, mapStateToProps, mapDispatchToProps };
