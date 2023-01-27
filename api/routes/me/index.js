import get from './get.js';

export default (app, { getEndpoint = get } = {}) => {
  getEndpoint(app);
};
