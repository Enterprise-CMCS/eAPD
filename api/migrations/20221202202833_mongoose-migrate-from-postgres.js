import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { APD } from '../models/index.js';

const logger = loggerFactory('mongoose-migrate/migrate-from-postgres');

const normalizeDate = date => (isNaN(Date.parse(date)) ? null : date);
const normalizeNarrativeYears = narrativeYears =>
  Object.keys(narrativeYears).every(year => year.match(/^\d{4}$/))
    ? { ...narrativeYears }
    : {};

export const up = async knex => {
  const convertActivities = activities =>
    activities.map(activity => {
      const {
        plannedStartDate,
        plannedEndDate,
        schedule,
        costAllocationNarrative: { methodology, ...narrativeYears }
      } = activity;
      return {
        ...activity,
        plannedStartDate: normalizeDate(plannedStartDate),
        plannedEndDate: normalizeDate(plannedEndDate),
        schedule: schedule.map(milestone => ({
          ...milestone,
          endDate: normalizeDate(milestone.endDate)
        })),
        costAllocationNarrative: {
          methodology,
          years: normalizeNarrativeYears(narrativeYears)
        }
      };
    });

  const convertFederalCitations = federalCitations => {
    const updatedFederalCitations = {};
    Object.keys(federalCitations).forEach(key => {
      updatedFederalCitations[key] = federalCitations[key].map(citation => {
        const { title, checked, explanation } = citation;
        return {
          title,
          explanation,
          checked: checked === true || checked === 'true'
        };
      });
    });
    return updatedFederalCitations;
  };

  // retrieve postgres APDs
  const postgresApds = await knex('apds').select();

  if (postgresApds.length === 0) {
    logger.info('No APDs found in postgres database');
    return;
  }

  const apds = postgresApds.map(apd => {
    logger.debug(`converting APD ${apd.id} for state ${apd.state_id}`);
    // eslint-disable-next-line camelcase
    const { created_at, updated_at, state_id, status, years, document } = apd;
    const { activities, federalCitations, ...rest } = document;
    return {
      createdAt: created_at,
      updatedAt: updated_at,
      stateId: state_id,
      status,
      years,
      activities: convertActivities(activities),
      federalCitations: convertFederalCitations(federalCitations),
      ...rest
    };
  });

  try {
    // insert the converted APDs into the mongo database
    await setup();
    const res = await APD.create(apds);
    logger.info(`${res.length} APDs migrated`);
    await teardown();
  } catch (error) {
    logger.error(error);
  }
};

export const down = () => {
  // we are not planning on returning the APDs to PostGreSQL
};
