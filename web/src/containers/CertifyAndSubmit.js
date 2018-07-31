import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitAPD as submitAPDAction } from '../actions/apd';
import Btn from '../components/Btn';
import { Section, Subsection } from '../components/Section';
import { t } from '../i18n';

const CertifyAndSubmit = ({ submitAPD }) => (
  <Section id="certify-submit" resource="certifyAndSubmit">
    <Subsection id="certify-submit-submit" resource="certifyAndSubmit.certify">
      <Btn onClick={() => submitAPD()}>
        {t('certifyAndSubmit.certify.buttonText')}
      </Btn>
    </Subsection>
  </Section>
);

CertifyAndSubmit.propTypes = {
  submitAPD: PropTypes.func.isRequired
};

const mapDispatchToProps = { submitAPD: submitAPDAction };

export default connect(null, mapDispatchToProps)(CertifyAndSubmit);
