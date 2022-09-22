import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import CardForm from '../../../components/CardForm';
import { Alert, Button } from '@cmsgov/design-system';

import { createApd } from '../../../redux/actions/app';

const ApdNew = ({ state }) => {
  return (
    <CardForm primaryButtonText={['Submit']}>
      <h1 className="ds-h2">Create a New Advanced Planning Document (APD)</h1>
      <div>Complete all the fields below to create your APD.</div>
      <h2 className="ds-h3">What type of APD are you creating?</h2>
      <Alert variation="warn" className="ds-u-margin-y--3">
        <p className="ds-c-alert__text">
          This selection cannot be changed after creating a new APD.
        </p>
      </Alert>
      This is a test
    </CardForm>
  );
};

ApdNew.PropTypes = {
  route: PropType.string,
  state: PropType.object.isRequired,
  createApd: PropType.func.isRequired
};

ApdNew.defaultProps = {
  route: '/apd'
};

const mapStateToProps = state => ({
  state: state.user.data.state || null,
  activities: state.user.data.activities
});

const mapDispatchToProps = {
  createApd
};

export default connect(mapStateToProps, mapDispatchToProps)(ApdNew);
