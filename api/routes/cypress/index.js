const del = require('./delete');

module.exports = (app, { deleteEndpoint = del } = {}) => {
  deleteEndpoint(app);
};
