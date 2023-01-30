import get from './get.js';
import patch from './patch.js';

export default (app, { getEndpoint = get, patchEndpoint = patch } = {}) => {
  getEndpoint(app);
  patchEndpoint(app);
};
