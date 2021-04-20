import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import EntryDetails from './EntryDetails';
import { addActivity as actualAddActivity } from '../../actions/editActivity';
import { Section } from '../../components/Section';
import { selectAllActivities } from '../../reducers/activities.selectors';

const All = ({ addActivity, activities }) => {
  return (
    <Section id="activities" resource="activities">
      <hr className="custom-hr" />
      <p className="instruction-box">
        Examples of individual activities include but are not limited to: E&E
        online application, E&E worker portal, E&E noticing system, claims
        processing engine, claims processing prior authorization, claims
        processing record keeping, HIE interface(s), CQM databases, decision
        support systems analytics platform, provider enrollment screening,
        provider fraud/waste/abuse, managed care member enrollment, etc. For
        each activity added, you will have the opportunity to provide details in
        their own respective subsections.
      </p>
      {activities.length ? (
        activities.map((activity, index) => (
          <EntryDetails activityIndex={index} key={activity.key} />
        ))
      ) : (
        <Fragment>
          <div className="ds-c-alert ds-c-alert--warn">
            <div className="ds-c-alert__body">
              <h3 className="ds-c-alert__heading">
                Activities have not been added for this APD.
              </h3>
            </div>
          </div>
        </Fragment>
      )}
      <Button className="ds-u-margin-top--4" onClick={addActivity}>
        Add activity
      </Button>
    </Section>
  );
};

All.propTypes = {
  addActivity: PropTypes.func.isRequired,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = state => ({ activities: selectAllActivities(state) });

const mapDispatchToProps = {
  addActivity: actualAddActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(All);

export { All as plain, mapStateToProps, mapDispatchToProps };
