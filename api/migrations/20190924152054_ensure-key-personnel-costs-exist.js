export const up = async knex => {
  const apds = await knex('apds').select('id', 'document');

  await Promise.all(
    apds.map(({ id, document }) => {
      const years = document.years;

      years.forEach(year => {
        document.keyPersonnel.forEach(kp => {
          /* eslint-disable no-param-reassign */
          if (!kp.costs) {
            kp.costs = [];
          }

          if (!kp.costs.some(cost => cost.year === +year)) {
            kp.costs.push({ year: +year, cost: 0 });
          }
        });
      });

      return knex('apds').where({ id }).update('document', document);
    })
  );
};

export const down = async () => {};
