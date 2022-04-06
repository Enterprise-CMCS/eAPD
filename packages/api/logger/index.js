const { logger } = require('./winston');

// export a labeled logger function
module.exports = label => logger.child({ label });
