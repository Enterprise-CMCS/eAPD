/* eslint-disable no-param-reassign */
exports.up = async knex => {
  const apdRecords = await knex('apds').select('document', 'id', 'years');

  apdRecords.forEach(({ document, id }) => {
    const years = document.years;

    document.activities.forEach(activity => {
      const otherSources = activity.costAllocationNarrative.otherSources || '';
      years.forEach(year => {
        activity.costAllocationNarrative[year] = {
          otherSources
        };
      });
      delete activity.costAllocationNarrative.otherSources;
    });

    knex('apds').where('id', id).update({ document });
  });
};

exports.down = async () => {};
