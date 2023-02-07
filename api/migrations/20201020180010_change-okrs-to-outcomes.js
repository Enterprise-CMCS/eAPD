export const up = async knex => {
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
                  // Destructure objectives separately so it's not part of the
                  // activity variable. Then when we spread the activity
                  // in the mapped result, objectives won't be there. Yay!
                  ({ objectives = [], ...activity }) => ({
                    ...activity,
                    outcomes: objectives.map(objective => ({
                      outcome: objective.objective,
                      metrics: objective.keyResults.map(keyResult => ({
                        metric: keyResult.keyResult
                      }))
                    }))
                  })
                )
              }
            })
        )
      )
    );
};

export const down = async () => {};
