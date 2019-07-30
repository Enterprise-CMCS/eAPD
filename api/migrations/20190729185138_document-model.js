require('../db').setup();
const apdModel = require('../db').models.apd;

exports.up = async knex => {
  // await knex.schema.alterTable('apds', table => {
  //   table.json('document').comment('APD as a single document object');
  // });

  const apds = (await apdModel.fetchAll({
    withRelated: apdModel.withRelated
  })).toJSON();

  apds.forEach(apd => {
    apd.activities = apd.activities.map(activity => ({
      ...activity,
      contractorResources: activity.contractorResources
        .toJSON()
        .map(contractor => ({
          ...contractor,
          hourlyData: contractor.hourlyData.toJSON().map(hourly => ({
            ...hourly,
            id: undefined
          })),
          id: undefined,
          years: contractor.years.toJSON().map(years => ({
            ...years,
            id: undefined
          }))
        })),
      expenses: activity.expenses.toJSON().map(expense => ({
        ...expense,
        entries: expense.entries
          .toJSON()
          .map(entry => ({ ...entry, id: undefined })),
        id: undefined
      })),
      goals: activity.goals.toJSON().map(goal => ({ ...goal, id: undefined })),
      id: undefined,
      schedule: activity.schedule
        .toJSON()
        .map(schedule => ({ ...schedule, id: undefined })),
      statePersonnel: activity.statePersonnel.toJSON().map(personnel => ({
        ...personnel,
        id: undefined,
        years: personnel.years
          .toJSON()
          .map(years => ({ ...years, id: undefined }))
      }))
    }));

    apd.keyPersonnel = apd.keyPersonnel.map(personnel => ({
      ...personnel,
      id: undefined
    }));
  });

  console.log(JSON.stringify(apds[0], null, 2));

  throw new Error('no');
};

exports.down = async () => {};
