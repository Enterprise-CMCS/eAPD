import { v4 as uuidv4 } from 'uuid';
import loggerFactory from '../logger/index.js';
import knex from './knex.js';

const logger = loggerFactory('event management');

const createEventForAPD = async (
  { userID, apdID, eventType, metadata = null },
  { db = knex } = {}
) => {
  const eventID = uuidv4();
  logger.verbose(
    `adding ${eventType} event for apd ${apdID}, event ID = ${eventID}`
  );

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

export default createEventForAPD;
