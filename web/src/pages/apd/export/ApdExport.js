import PropTypes from 'prop-types';
import { Button } from '@cmsgov/design-system';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect, useParams } from 'react-router-dom';

import { toggleAdminCheck } from '../../../redux/actions/app/apd';

import Icon, { faClipboardCheck } from '../../../components/Icons';

import { Section, Subsection } from '../../../components/Section';
import Waypoint from '../../../components/ConnectedWaypoint';
import AlertMissingFFY from '../../../components/AlertMissingFFY';
import { selectApdYears } from '../../../redux/selectors/apd.selectors';

import { useFlags } from 'launchdarkly-react-client-sdk';

const ExportAndSubmit = ({
  push: pushRoute,
  toggleAdminCheck: toggleAdmin,
  years
}) => {
  // inside the component code
  // Temporary feature flag
  const { adminCheckFlag } = useFlags();

  const paramApdId = useParams().apdId;

  if (!paramApdId) {
    return <Redirect to="/apd" />;
  }

  const handleAdminCheck = () => {
    toggleAdmin(true);
  };

  return (
    <React.Fragment>
      <Waypoint /> {/* Waypoint w/o id indicates top of page */}
      <AlertMissingFFY />
      <Section resource="exportAndSubmit">
        {adminCheckFlag === true && (
          <Subsection resource="adminCheck">
            <p>
              Choose Run Administrative Check to see a list of required fields
              which are missing content. Providing content will help ensure that
              your APD is administratively complete and ready for submission to
              CMS. Missing content from these sections could delay a decision by
              CMS and result in additional review cycles for this APD.
            </p>
            <Button
              onClick={handleAdminCheck}
              size="big"
              variation="primary"
              className="ds-u-margin-bottom--2"
            >
              Run Administrative Check
              <Icon className="ds-u-padding-left--1" icon={faClipboardCheck} />
            </Button>
          </Subsection>
        )}
        <Subsection resource="reviewAndDownload">
          <p>
            On the next page, you will be able to review and download a copy of
            your APD as the first step in submitting a completed APD to CMS.
          </p>
          <Button
            size="big"
            variation="primary"
            className="ds-u-margin-top--2"
            onClick={() =>
              years.length > 0 && pushRoute(`/print/${paramApdId}`)
            }
            disabled={years.length === 0}
          >
            Continue to Review
          </Button>
        </Subsection>
      </Section>
    </React.Fragment>
  );
};

ExportAndSubmit.propTypes = {
  push: PropTypes.func.isRequired,
  years: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleAdminCheck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  years: selectApdYears(state)
});

const mapDispatchToProps = {
  push,
  toggleAdminCheck
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportAndSubmit);

export { ExportAndSubmit as plain, mapDispatchToProps };
