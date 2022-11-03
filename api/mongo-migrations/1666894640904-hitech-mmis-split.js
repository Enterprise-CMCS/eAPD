const logger = require('../logger')('migrate-mongoose/hitech-mmis-split');
const { setup, teardown } = require('../db/mongodb');
const { APD, HITECH, MMIS, Budget } = require('../models');
const {
  defaultAPDYearOptions,
  deepCopy,
  APD_TYPE
} = require('@cms-eapd/common');
const { createAPD } = require('../db/apds');

/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Grab all APDs
  await setup();
  const apds = await APD.find({ status: 'draft' });

  const hitech = apds.map(async apd => {
    const apdJSON = deepCopy(apd.toJSON());

    const years = apdJSON.years;
    if (years.length === 3) {
      apdJSON.yearOptions = years;
    }
    if (years.length < 3) {
      apdJSON.yearOptions = defaultAPDYearOptions(years[0]);
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

    await Budget.deleteOne({ _id: apd.budget });
    return apdJSON;
  });

  await APD.deleteMany({ status: 'draft' });
  await Promise.all(
    hitech.map(async item => createAPD({ ...item, __t: APD_TYPE.HITECH }))
  ).catch(err => logger.error(err));

  await teardown();
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
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
}

module.exports = { up, down };
