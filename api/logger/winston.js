import '../env';
import fs from 'fs';
import winston from 'winston';
import { name as packageName } from '../package.json';

const { LOG_CONSOLE, LOG_FILE, LOG_LEVEL } = process.env;

const formats = [
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
];

// https://github.com/winstonjs/winston/blob/master/docs/transports.md
const transports = [
  LOG_CONSOLE === 'true' && new winston.transports.Console(),
  LOG_FILE === 'true' &&
    new winston.transports.File({
      filename: `/app/api/logs/${packageName}.log`
    }),
  new winston.transports.Stream({ stream: fs.createWriteStream('/dev/null') })
  // new AwsCloudWatch(options);
].filter(Boolean);

const logger = winston.createLogger({
  defaultMeta: { service: packageName },
  format: winston.format.combine(...formats),
  level: LOG_LEVEL,
  transports
});

// ingest morgan http request data as json, write data to winston logs
logger.stream = {
  write: json => {
    try {
      const request = JSON.parse(json);
      const result = {
        message: `${request.method} ${request.url} ${request.status}`,
        ...request
      };
      logger.log('info', result);
    } catch (e) {
      logger.log('info', `unable to parse JSON string: ${json}`);
    }
  }
};

export default logger;
