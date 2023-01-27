import { apply_patch as applyPatch } from 'jsonpatch';

export const up = async knex => {
  const apds = await knex('apds').select('id', 'document');

  await Promise.all(
    apds.map(async apd => {
      const activityStandards = apd.document.activities.map(activity => {
        const {
          businessResults,
          documentation,
          industryStandards,
          interoperability,
          keyPersonnel,
          leverage,
          minimizeCost,
          mitigationStrategy,
          modularity,
          mita,
          reporting
        } = activity.standardsAndConditions;

        const newStandards = [];

        if (modularity) {
          newStandards.push(
            `<p><strong>Modularity:</strong> ${modularity}</p>`
          );
        }

        if (mita) {
          newStandards.push(
            `<p><strong>Medicaid Information Technology Architecture (MITA): </strong> ${mita}</p>`
          );
        }

        if (industryStandards) {
          newStandards.push(
            `<p><strong>Industry Standards:</strong> ${industryStandards}</p>`
          );
        }

        if (leverage) {
          newStandards.push(`<p><strong>Leverage:</strong> ${leverage}</p>`);
        }

        if (businessResults) {
          newStandards.push(
            `<p><strong>Business Results:</strong> ${businessResults}</p>`
          );
        }

        if (reporting) {
          newStandards.push(`<p><strong>Reporting:</strong> ${reporting}</p>`);
        }

        if (interoperability) {
          newStandards.push(
            `<p><strong>Interoperability:</strong> ${interoperability}</p>`
          );
        }

        if (mitigationStrategy) {
          newStandards.push(
            `<p><strong>Mitigation Strategy:</strong> ${mitigationStrategy}</p>`
          );
        }

        if (keyPersonnel) {
          newStandards.push(
            `<p><strong>Key Personnel:</strong> ${keyPersonnel}</p>`
          );
        }

        if (documentation) {
          newStandards.push(
            `<p><strong>Documentation:</strong> ${documentation}</p>`
          );
        }

        if (minimizeCost) {
          newStandards.push(
            `<p><strong>Strategies to Minimize Cost and Difficulty on Alternative Hardward or Operating System:</strong> ${minimizeCost}</p>`
          );
        }

        return newStandards.join('');
      });

      const newDoc = applyPatch(
        apd.document,
        activityStandards
          .map((standard, i) => [
            {
              path: `/activities/${i}/standardsAndConditions`,
              op: 'remove'
            },
            {
              path: `/activities/${i}/standardsAndConditions`,
              op: 'add',
              value: { doesNotSupport: '', supports: standard }
            }
          ])
          .reduce((arr, actions) => [...arr, ...actions], [])
      );

      await knex('apds').where('id', apd.id).update('document', newDoc);
    })
  );
};

export const down = async () => {};
