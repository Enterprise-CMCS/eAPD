export const up = async knex => {
  const apds = await knex('apds').select('id', 'document');
  apds.map(async apd =>
    knex('apds')
      .where('id', apd.id)
      .update('document', { ...apd.document, name: 'HITECH IAPD' })
  );
};

export const down = () => {};
