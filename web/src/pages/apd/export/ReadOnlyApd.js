import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { APD_TYPE } from '@cms-eapd/common';

import { getAPDName } from '../../../redux/reducers/apd.js';
import {
  selectSummary,
  selectApdType
} from '../../../redux/selectors/apd.selectors';

const ApdSummary = ({
  narrativeHIE,
  narrativeHIT,
  narrativeMMIS,
  programOverview,
  apdType,
  apdName
}) => {
  /* eslint-disable react/no-danger */
  if (apdType === APD_TYPE.HITECH) {
    return (
      <div>
        <h2>APD Overview</h2>
        <h3>Program introduction</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: programOverview || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>HIT overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeHIT || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>HIE overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeHIE || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>MMIS overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeMMIS || 'No response was provided'
          }}
        />
      </div>
    );
  }
  if (apdType === APD_TYPE.MMIS) {
    return (
      <div>
        <h2>APD Overview</h2>
        <h3>Program introduction</h3>
        <ul class="ds-c-list--bare">
          <li>
            <strong>APD Name:</strong> {apdName}
          </li>
          <li>
            <strong>Total Computable Medicaid Cost:</strong> <span>$0</span> (
            <span>$0</span> Federal share)
          </li>
          <li>
            <strong>Total funding request:</strong> <span>$0</span>
          </li>
          <li class="ds-u-margin-top--2">
            <strong>FFY 2023:</strong> <span>$0</span> |{' '}
            <strong>Total Computable Medicaid Cost:</strong> <span>$0</span> (
            <span>$0</span> Federal share)
          </li>
          <li class="">
            <strong>FFY 2024:</strong> <span>$0</span> |{' '}
            <strong>Total Computable Medicaid Cost:</strong> <span>$0</span> (
            <span>$0</span> Federal share)
          </li>
        </ul>
        <p
          dangerouslySetInnerHTML={{
            __html: programOverview || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>HIT overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeHIT || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>HIE overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeHIE || 'No response was provided'
          }}
        />

        <hr className="subsection-rule" />
        <h3>MMIS overview</h3>
        <p
          dangerouslySetInnerHTML={{
            __html: narrativeMMIS || 'No response was provided'
          }}
        />
      </div>
    );
  }
};

ApdSummary.propTypes = {
  narrativeHIE: PropTypes.string,
  narrativeHIT: PropTypes.string,
  narrativeMMIS: PropTypes.string,
  programOverview: PropTypes.string,
  apdType: PropTypes.string
};

ApdSummary.defaultProps = {
  narrativeHIE: '',
  narrativeHIT: '',
  narrativeMMIS: '',
  programOverview: '',
  apdType: APD_TYPE.HITECH
};

const mapStateToProps = state => ({
  apdType: selectApdType(state),
  apdName: getAPDName(state),
  ...selectSummary(state)
});

export default connect(mapStateToProps)(ApdSummary);
