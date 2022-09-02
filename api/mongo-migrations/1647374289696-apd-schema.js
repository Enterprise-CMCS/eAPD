const logger = require('../logger')('mongoose-migrate/migrate-apd-schema');
const { setup, teardown } = require('../db/mongodb');
const { APD } = require('../models/index');

/**
 * Update the APD schema to more closely match the front end nav/page sections
 */
async function up() {
  // Grab all APDs
  await setup();
  const apds = await APD.find({}).lean();

  const convertContractorResources = contractorResources =>
    contractorResources.map(contractorResource => {
      return {
        ...contractorResource,
        hourly: {
          ...contractorResource.hourly.data
        },
        useHourly: contractorResource.hourly.useHourly
      };
    });

  // Create new object by sections/new schema
  const updatedApds = apds
    .filter(apd => apd.stateProfile)
    .map(apd => ({
      id: apd._id,
      createdAt: apd.createdAt,
      updatedAt: apd.updatedAt,
      years: apd.years,
      stateId: apd.stateId,
      status: apd.status,
      name: apd.name,
      apdOverview: {
        programOverview: apd.programOverview,
        narrativeHIT: apd.narrativeHIT,
        narrativeHIE: apd.narrativeHIE,
        narrativeMMIS: apd.narrativeMMIS
      },
      keyStatePersonnel: {
        medicaidDirector: apd.stateProfile.medicaidDirector,
        medicaidOffice: apd.stateProfile.medicaidOffice,
        keyPersonnel: apd.keyPersonnel
      },
      previousActivities: {
        previousActivitySummary: apd.previousActivitySummary,
        actualExpenditures: apd.previousActivityExpenses
      },
      activities: apd.activities.map(activity => ({
        ...activity,
        contractorResources: convertContractorResources(
          activity.contractorResources
        )
      })),
      proposedBudget: {
        incentivePayments: apd.incentivePayments
      },
      assurancesAndCompliances: apd.federalCitations
    }));

  // Update them into the database
  await Promise.all(
    updatedApds.map(async apd => {
      await APD.replaceOne({ _id: apd.id }, { ...apd });
    })
  ).catch(err => {
    logger.error(err);
  });
  await teardown();
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {}

module.exports = { up, down };
