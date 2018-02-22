const crypto = require('crypto');
const dotenv = require('dotenv');

const defaults = {
  PORT: 8000,
  SESSION_SECRET: crypto.randomBytes(32).toString('hex'),
  NODE_ENV: 'development',
  LOG_LEVEL: 'info',
  LOG_FILE: false,
  LOG_CONSOLE: true
};

dotenv.config();
process.env = Object.assign({}, defaults, process.env);
