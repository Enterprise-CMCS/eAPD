const dotenv = require('dotenv');

const defaults = {
  PORT: 8000
};

module.exports = () => {
  dotenv.config();
  Object.assign(process.env, defaults);
};
