import logger from './winston';

// export a labeled logger function
export default label => logger.child({ label });
