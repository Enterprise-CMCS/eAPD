const replaceNulls = (obj, newValue = '') => {
  const replace = o => {
    Object.keys(o).forEach(k => {
      // eslint-disable-next-line no-param-reassign
      if (o[k] === null) o[k] = newValue;
      else if (typeof o[k] === 'object') replace(o[k]);
    });
  };

  const objNew = JSON.parse(JSON.stringify(obj));
  replace(objNew);
  return objNew;
};

export const up = async knex => {
  const apds = await knex('apds').select('id', 'document');

  await Promise.all(
    apds.map(({ id, document }) => {
      /* eslint-disable no-param-reassign */

      document.activities.forEach(activity => {
        activity.contractorResources.forEach(c => {
          delete c.files;

          c.hourly = {
            useHourly: c.useHourly || false,
            data: (c.hourlyData || []).reduce(
              (acc, h) => ({
                ...acc,
                [h.year]: { hours: +h.hours || '', rate: +h.rate || '' }
              }),
              {}
            )
          };

          delete c.useHourly;
          delete c.hourlyData;

          c.totalCost = +c.totalCost;

          c.years = c.years.reduce(
            (acc, y) => ({
              ...acc,
              [y.year]: y.cost
            }),
            {}
          );
        });

        activity.costAllocation = activity.costAllocation.reduce(
          (acc, ffp) => ({
            ...acc,
            [ffp.year]: {
              other: ffp.otherAmount || 0,
              ffp: {
                federal: ffp.federalPercent * 100,
                state: ffp.statePercent * 100
              }
            }
          }),
          {}
        );

        activity.expenses.forEach(e => {
          e.years = e.entries.reduce(
            (acc, y) => ({
              ...acc,
              [y.year]: y.amount
            }),
            {}
          );
          delete e.entries;
        });

        activity.statePersonnel.forEach(s => {
          s.years = s.years.reduce(
            (acc, y) => ({
              ...acc,
              [y.year]: {
                amt: y.cost,
                perc: y.fte
              }
            }),
            {}
          );
        });

        activity.quarterlyFFP = activity.quarterlyFFP.reduce(
          (acc, ffy) => ({
            ...acc,
            [ffy.year]: {
              1: {
                contractors: ffy.q1.contractors * 100,
                state: ffy.q1.state * 100
              },
              2: {
                contractors: ffy.q2.contractors * 100,
                state: ffy.q2.state * 100
              },
              3: {
                contractors: ffy.q3.contractors * 100,
                state: ffy.q3.state * 100
              },
              4: {
                contractors: ffy.q4.contractors * 100,
                state: ffy.q4.state * 100
              }
            }
          }),
          {}
        );

        delete activity.years;
      });

      document.incentivePayments = document.incentivePayments.reduce(
        (obj, paymentByQuarter) => {
          const ip = obj;

          [
            ['ehAmt', 'ehPayment'],
            ['ehCt', 'ehCount'],
            ['epAmt', 'epPayment'],
            ['epCt', 'epCount']
          ].forEach(([stateName, apiName]) => {
            const payments = {};
            [...Array(4)].forEach((_, i) => {
              payments[i + 1] = paymentByQuarter[`q${i + 1}`][apiName];
            });
            ip[stateName][paymentByQuarter.year] = payments;
          });

          return obj;
        },
        {
          ehAmt: {},
          ehCt: {},
          epAmt: {},
          epCt: {}
        }
      );

      document.keyPersonnel.forEach(kp => {
        kp.costs = kp.costs.reduce(
          (o, { year, cost }) => ({ ...o, [year]: cost }),
          {}
        );
        kp.percentTime = `${kp.percentTime * 100}`;
      });

      document.previousActivityExpenses =
        document.previousActivityExpenses.reduce(
          (previous, year) => ({
            ...previous,
            [year.year]: {
              hithie: year.hithie,
              mmis: year.mmis
            }
          }),
          {}
        );

      document.years = document.years.map(y => `${y}`);

      return knex('apds')
        .where({ id })
        .update('document', replaceNulls(document));
    })
  );
};

export const down = async () => {};
