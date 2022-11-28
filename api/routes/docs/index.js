import get from './get';

export default (app, { getEndpoint = get } = {}) => {
  getEndpoint(app);
};
