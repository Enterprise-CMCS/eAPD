import { connect } from 'react-redux';
import axios from 'axios';

let timeout;
const user = new Date().toString();
const apiURL = process.env.API_URL;

const nullifyTimeout = () => {
  timeout = null;
};

const FormLogger = ({ form }) => {
  if (process.env.LOG_FORM_INTERACTIONS) {
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
        .then(nullifyTimeout)
        .catch(nullifyTimeout);
    }, 2000);
  }

  return null;
};

const mapStateToProps = ({ form }) => ({ form });

export default connect(mapStateToProps)(FormLogger);
