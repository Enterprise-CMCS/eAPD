/**
 * Update the APD schema to more closely match the front end nav/page sections
 */
async function up () {
  require('../models/apd'); // eslint-disable-line global-require
  
  // Grab all APDs
  
  // Create new object by sections/new schema
  
  // Add current properties to their respective new parent properties
  
  // Save them as new APDs
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
