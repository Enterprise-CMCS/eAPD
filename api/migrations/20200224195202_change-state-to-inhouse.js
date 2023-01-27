export const up = async knex =>
  knex('apds')
    .select('document', 'id')
    .then(apds =>
      Promise.all(
        apds.map(({ document, id }) =>
          knex('apds')
            .where('id', id)
            .update({
              document: {
                ...document,
                activities: document.activities.map(
                  ({ quarterlyFFP, ...activity }) => ({
                    quarterlyFFP: Object.entries(quarterlyFFP).reduce(
                      (quarterlyFFPObj, [ffy, quarters]) => ({
                        ...quarterlyFFPObj,
                        [ffy]: Object.entries(quarters).reduce(
                          (ffyObj, [quarter, { contractors, state }]) => ({
                            ...ffyObj,
                            [quarter]: {
                              contractors,
                              inHouse: state
                            }
                          }),
                          {}
                        )
                      }),
                      {}
                    ),
                    ...activity
                  })
                )
              }
            })
        )
      )
    );

export const down = async () => {};
