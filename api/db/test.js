require('../env');

require('./index').setup();

const users = require('./user')();

users.fetchAll({ withRelated: ['role.activities'] })
  .then(dbusers => {
    console.log(dbusers.length);
    const user = dbusers.at(0);
    console.log(user.related('role').related('activities').at(0).get('name'));
    console.log(user.activities());
    process.exit();
  });
