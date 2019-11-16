import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { CheckCircle, TimesCircle } from '../../components/Icons';
import regLinks from '../../data/assurancesAndCompliance.yaml';
import { selectFederalCitations } from '../../reducers/apd.selectors';
import { t } from '../../i18n';

const AssurancesAndCompliance = ({ citations }) => {
  return (
    <div>
      <h2>Assurances and Compliance</h2>
      {Object.entries(regLinks).map(([name]) => (
        <div key={name} className="ds-u-margin-bottom--3">
          <h4 className="ds-h4">
            {t(`assurancesAndCompliance.headings.${name}`)}
          </h4>
          <ul>
            {citations[name].map(({ title, checked, explanation }) => (
              <li key={title}>
                {checked ? <CheckCircle /> : <TimesCircle />} {title}
                {!checked && (
                  <Fragment>
                    <br />
                    <strong>Explanation:</strong>{' '}
                    {explanation || <em>No explanation given</em>}
                  </Fragment>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

AssurancesAndCompliance.propTypes = {
  citations: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ citations: selectFederalCitations(state) });

export default connect(
  mapStateToProps,
  null
)(AssurancesAndCompliance);
export { AssurancesAndCompliance as plain, mapStateToProps };
