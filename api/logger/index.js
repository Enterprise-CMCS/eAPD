import logger from './winston.js';

// export a labeled logger function
export default label => logger.child({ label });
