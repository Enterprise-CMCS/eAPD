import get from './get.js';
import post from './post.js';

export default (app, { getEndpoint = get, postEndpoint = post } = {}) => {
  getEndpoint(app);
  postEndpoint(app);
};
