const crypto = require('crypto');
const dotenv = require('dotenv');

const defaults = {
  PORT: 8000,
  SESSION_SECRET: crypto.randomBytes(32).toString('hex')
};

dotenv.config();
process.env = Object.assign({}, defaults, process.env);
