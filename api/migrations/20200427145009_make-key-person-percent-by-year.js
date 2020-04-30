exports.up = async knex => {
  const apds = await knex('apds').select('id', 'document');

  apds.map(async apd =>
    knex('apds')
      .where('id', apd.id)
      .update('document', apd.document)
  );

  /*

  apds.map(async apd => {
    const years = apd.document.years;
    knex('apds')
      .where('id', apd.id)
      .update('document', {
        ...apd.document,
        keyPersonnel: apd.document.keyPersonnel.map(kp => {
          const percent = kp.percentTime;

          return {percentTime, ...kp, fte: sss};
          kp.percentTime = years.reduce(
            (o, year) => ({ ...o, [year]: percent / 100.0 }),
            {}
          );
          return kp;
        })
      });
  });
  */
};

exports.down = async () => {};
