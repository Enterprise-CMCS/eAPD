import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitAPD as submitAPDAction } from '../actions/apd';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';

const CertifyAndSubmit = ({ submitAPD }) => (
  <Section id="certify-submit" resource="certifyAndSubmit">
    <Subsection id="certify-submit-submit" resource="certifyAndSubmit.certify">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => submitAPD()}
      >
        {t('certifyAndSubmit.certify.buttonText')}
      </button>
    </Subsection>
  </Section>
);

CertifyAndSubmit.propTypes = {
  submitAPD: PropTypes.func.isRequired
};

const mapDispatchToProps = { submitAPD: submitAPDAction };

export default connect(null, mapDispatchToProps)(CertifyAndSubmit);
