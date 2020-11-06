const winston = require('winston')

const { name: packageName } = require('../package')
const {
  LOG_CONSOLE,
  LOG_FILE,
  LOG_LEVEL,
  NODE_ENV
} = process.env

const formats = [
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  NODE_ENV !== 'production' ? winston.format.simple() : winston.format.json(),
]

const transports = [
  LOG_CONSOLE === 'true' && new winston.transports.Console(),
  LOG_FILE === 'true' && new winston.transports.File({ filename: `${packageName}.log` })
].filter(Boolean)

const logger = winston.createLogger({
  defaultMeta: { service: packageName },
  format: winston.format.combine(...formats),
  level: LOG_LEVEL,
  transports
})

// write morgan http request data as json to winston logs
logger.stream = {
  write: (json) => {
    const request = JSON.parse(json);

    let result;
    if (typeof request === 'object') {
      result = {
        message: `${request.method} ${request.url} ${request.status}`,
        ...request
      }
    } else {
      result = request;
    }

    logger.log('info', result)
  }
}

module.exports = { logger }
