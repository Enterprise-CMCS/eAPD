import get from './get';
import post from './post';

export default (app, { getEndpoint = get, postEndpoint = post } = {}) => {
  getEndpoint(app);
  postEndpoint(app);
};
