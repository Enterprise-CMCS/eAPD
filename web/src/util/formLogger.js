import { connect } from 'react-redux';
import axios from 'axios';

let timeout;
const user = (new Date()).toString();
const apiURL = 'http://localhost:8081';

const FormLogger = ({ form }) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    const formValues = {};
    Object.keys(form).forEach(formKey => {
      formValues[formKey] = form[formKey].values;
    });

    axios
      .post(`${apiURL}/log-form`, { user, form: formValues })
      .then(() => { timeout = null; })
      .catch(() => { timeout = null; });
  }, 2000);
  return null;
};

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps)(FormLogger);
