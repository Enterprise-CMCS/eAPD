export const up = async knex =>
  knex('apds')
    .select('document', 'id')
    .then(apds =>
      Promise.all(
        apds.map(({ document, id }) => {
          const years = document.years;
          return knex('apds')
            .where('id', id)
            .update({
              document: {
                ...document,
                keyPersonnel: document.keyPersonnel.map(
                  ({ percentTime, ...kp }) => {
                    return {
                      ...kp,
                      fte: years.reduce(
                        (o, year) => ({
                          ...o,
                          [year]: percentTime / 100.0 || 0
                        }),
                        {}
                      )
                    };
                  }
                )
              }
            });
        })
      )
    );

export const down = async () => {};
