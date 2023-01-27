export const up = async knex => {
  const apds = await knex('apds').select('id', 'document');

  // In the old model, some string values defaulted to null. In the new
  // model, they should always be strings. This migration updates any of
  // those from nulls to empty strings.

  await Promise.all(
    apds.map(apd => {
      const document = apd.document;

      document.activities = document.activities.map(activity => ({
        ...activity,
        costAllocationNarrative: {
          ...activity.costAllocationNarrative,
          methodology: activity.costAllocationNarrative.methodology || '',
          otherSources: activity.costAllocationNarrative.otherSources || ''
        }
      }));

      if (!document.federalCitations) {
        document.federalCitations = {};
      }
      if (!document.stateProfile.medicaidOffice.address2) {
        document.stateProfile.medicaidOffice.address2 = '';
      }

      return knex('apds').where({ id: apd.id }).update('document', document);
    })
  );
};

export const down = async () => {};
