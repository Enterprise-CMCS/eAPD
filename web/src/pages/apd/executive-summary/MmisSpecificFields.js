import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { t } from '../../../i18n';

import { getPrioritiesAndScope } from '../../../redux/reducers/apd';

import { Subsection } from '../../../components/Section';

const MmisSpecificFields = ({ statePrioritiesAndScope }) => {
  return (
    <Fragment>
      <Subsection
        id="executive-prioritiesAndScope-summary"
        resource="executiveSummary.statePrioritiesAndScope"
      >
        <h3 className="ds-u-margin-bottom--1">
          {t(
            'executiveSummary.statePrioritiesAndScope.medicaidProgramAndPriorities'
          )}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: statePrioritiesAndScope.medicaidProgramAndPriorities
          }}
          className="ds-u-margin-y--1"
        />
        <h3 className="ds-u-margin-bottom--1">
          {t('executiveSummary.statePrioritiesAndScope.mesIntroduction')}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: statePrioritiesAndScope.mesIntroduction
          }}
          className="ds-u-margin-y--1"
        />
        <h3 className="ds-u-margin-bottom--1">
          {t('executiveSummary.statePrioritiesAndScope.scopeOfAPD')}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: statePrioritiesAndScope.scopeOfAPD
          }}
          className="ds-u-margin-y--1"
        />
      </Subsection>
    </Fragment>
  );
};

MmisSpecificFields.propTypes = {
  statePrioritiesAndScope: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  statePrioritiesAndScope: getPrioritiesAndScope(state)
});

export default connect(mapStateToProps, null)(MmisSpecificFields);

export { MmisSpecificFields as plain, mapStateToProps };
