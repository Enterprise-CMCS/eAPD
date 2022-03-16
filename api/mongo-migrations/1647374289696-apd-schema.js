const logger = require('../logger')('mongoose-migrate/migrate-from-postgres');

/**
 * Update the APD schema to more closely match the front end nav/page sections
 */
async function up () {
  require('../models/apd'); // eslint-disable-line global-require
  
  // Grab all APDs
  const apds = await this('APD').find({}).lean();
  
  const convertContractorResources = contractorResources =>
    contractorResources.map(contractorResource => {
      return {
        ...contractorResource,
        hourly: {
          data: { ...contractorResource.hourly.data }
        },
        useHourly: contractorResource.hourly.useHourly
      };
    });
  
  // Create new object by sections/new schema
  const updatedApds = apds.map(apd => {
    // Add current properties to their respective new parent properties
    return {
      ...apd,
      apdOverview: {
        programOverview: apd.programOverview,
        narrativeHIT: apd.narrativeHIT,
        narrativeHIE: apd.narrativeHIE,
        narrativeMMIS: apd.narrativeMMIS
      },
      keyStatePersonnel: {
        medicareDirector: apd.stateProfile.medicareDirector ?? apd.keyStatePersonnel.medicareDirector,
        medicaidDirector: apd.stateProfile.medicaidDirector ?? apd.keyStatePersonnel.medicaidDirector,
        keyPersonnel: apd.keyPersonnel ?? apd.keyStatePersonnel.keyPerssonel
      },
      previousActivities: {
        previousActivitySummary: apd.previousActivitySummary ?? apd.previousActivities.previousActivitySummary,
        actualExpenditures: apd.previousActivityExpenses ?? apd.previousActivities.actualExpenditures
      },
      activities: [
        ...apd.activities,
        contractorResources: convertContractorResources(apd.activities.contractorResources)
      ],
      proposedBudget: {
        incentivePayments: apd.incentivePayments ?? apd.proposedBudget.incentivePayments
      },
      assurancesAndCompliances: apd.federalCitations ?? apd.assurancesAndCompliances
    }
  })
  
  // Save them as new APDs
  try {
    // insert the updated APDs into the mongo database
    const res = apds.forEach(apd => {
      console.log("id:", apd.id);
      console.log("_id:", apd._id);
      await this('APD').update({_id: apd.id}, apd);
    });
    logger.info(`${res.length} APDs updated`);
  } catch (error) {
    logger.error(error);
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };