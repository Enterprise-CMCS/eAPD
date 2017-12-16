const dotenv = require('dotenv');

const defaults = {
  PORT: 8000
};

dotenv.config();

Object.keys(defaults).forEach((env) => {
  if (!process.env[env]) {
    process.env[env] = defaults[env];
  }
});
