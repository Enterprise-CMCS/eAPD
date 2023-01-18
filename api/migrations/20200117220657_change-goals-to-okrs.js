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
                  // Destructure goals separately so it's not part of the
                  // activity variable. Then when we spread the activity
                  // in the mapped result, goals won't be there. Yay!
                  ({ goals, ...activity }) => ({
                    ...activity,
                    objectives: goals.map(goal => ({
                      objective: goal.description,
                      keyResults: [
                        {
                          keyResult: goal.objective,
                          target: '',
                          baseline: ''
                        }
                      ]
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
