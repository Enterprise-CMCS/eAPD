const dotenv = require('dotenv');

const defaults = {
  PORT: 8000
};

dotenv.config();
Object.assign(process.env, defaults);
