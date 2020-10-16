const crypto = require('crypto');
const logger = require('../logger')('event management');
const knex = require('./knex');

const createEventForAPD = async (
  { userID, apdID, eventType, metadata = null },
  { db = knex } = {}
) => {
  const eventID = crypto.randomBytes(48).toString('base64');
  logger.verbose(
    `adding ${eventType} event for apd ${apdID}, event ID = ${eventID}`
  );

  const intApdID = parseInt(apdID, 10);
  if (Number.isNaN(intApdID)) {
    logger.error(
      `error saving ${eventID} to database ${apdID} is not a valid value`
    );
    return null;
  }

  try {
    await db('apd_events').insert({
      event_id: eventID,
      user_id: userID,
      apd_id: apdID,
      event_type: eventType,
      event_at: new Date().toISOString(),
      metadata
    });
  } catch (e) {
    logger.error(`error saving ${eventID} to database`, e);
    return null;
  }

  return eventID;
};

module.exports = {
  createEventForAPD
};
