const fs = require('fs')
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
  NODE_ENV === 'development' ? winston.format.simple() : winston.format.json(),
]

// https://github.com/winstonjs/winston/blob/master/docs/transports.md
// stream to /dev/null so winston doesn't complain that no transports present
const transports = [
  new winston.transports.Stream({ stream: fs.createWriteStream('/dev/null') }),
  LOG_CONSOLE === 'true' && new winston.transports.Console(),
  LOG_FILE === 'true' && new winston.transports.File({ filename: `${packageName}.log` }),
  // new AwsCloudWatch(options);
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
    const result = {
      message: `${request.method} ${request.url} ${request.status}`,
      ...request
    }
    logger.log('info', result)
  }
}

module.exports = { logger }
