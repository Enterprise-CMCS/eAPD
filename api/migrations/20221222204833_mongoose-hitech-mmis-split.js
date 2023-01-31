import loggerFactory from '../logger/index.js';
import { setup, teardown } from '../db/mongodb.js';
import { APD, HITECH, Budget } from '../models/index.js';
import {
  defaultAPDYearOptions,
  deepCopy,
  APD_TYPE,
  defaultAPDYears
} from '@cms-eapd/common';
import { createAPD } from '../db/apds.js';

const logger = loggerFactory('migrate-mongoose/hitech-mmis-split');

/**
 * Make any changes you need to make to the database here
 */
export const up = async () => {
  // Grab all APDs
  await setup();
  const apds = await APD.find();
  const apdIds = [];
  const budgetIds = [];

  const hitech = apds.map(apd => {
    const apdJSON = deepCopy(apd.toJSON());

    apdJSON.apdType = APD_TYPE.HITECH;
    const { years = [] } = apdJSON;
    if (years.length === 0) {
      apdJSON.years = defaultAPDYears();
      apdJSON.yearOptions = defaultAPDYearOptions();
      logger.info(
        'Error with APD Id ${apd._id}, no years found, using default ${apdJSON.years}'
      );
    }
    if (years.length < 3) {
      apdJSON.yearOptions = defaultAPDYearOptions(years[0]);
    }
    if (years.length === 3) {
      apdJSON.yearOptions = years;
    }
    apdJSON.apdOverview = {
      ...apdJSON.apdOverview,
      updateStatus: {
        isUpdateAPD: false,
        annualUpdate: false,
        asNeededUpdate: false
      }
    };
    apdJSON.activities = apdJSON.activities.map(activity => ({
      ...activity,
      activityOverview: {
        summary: activity.summary,
        description: activity.description,
        alternatives: activity.alternatives,
        standardsAndConditions: activity.standardsAndConditions
      },
      activitySchedule: {
        plannedStartDate: activity.plannedStartDate,
        plannedEndDate: activity.plannedEndDate
      },
      milestones: activity.schedule
    }));

    apdIds.push(apd._id);
    if (apd.budget) {
      budgetIds.push(apd.budget);
    }
    delete apdJSON._id; // eslint-disable-line no-underscore-dangle
    return apdJSON;
  });

  if (apds.length === hitech.length) {
    await Promise.all(hitech.map(item => createAPD(item))).catch(err =>
      logger.error(err)
    );
    await Promise.all(apdIds.map(id => APD.deleteOne({ _id: id })));
    await Promise.all(budgetIds.map(id => Budget.deleteOne({ _id: id })));
  } else {
    logger.error('Not all of the values were converted');
  }

  await teardown();
};

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export const down = async () => {
  await setup();
  const hitech = await HITECH.find();

  const apds = hitech.map(async apd => {
    const apdJSON = apd.toJSON();

    apdJSON.activities = apdJSON.activities.map(activity => ({
      ...activity,
      summary: activity.activityOverview.summary,
      description: activity.activityOverview.description,
      alternatives: activity.activityOverview.alternatives,
      standardsAndConditions: activity.activityOverview.standardsAndConditions,
      plannedStartDate: activity.activitySchedule.plannedStartDate,
      plannedEndDate: activity.activitySchedule.plannedEndDate,
      schedule: activity.milestones
    }));
    await Budget.deleteOne({ _id: apd.budget });
  });

  await HITECH.deleteMany();
  await Promise.all(apds.map(async items => createAPD(items))).catch(err => {
    logger.error(err);
  });

  await teardown();
};
