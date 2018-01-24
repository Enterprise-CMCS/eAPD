const defaultDB = require('../db')();
const defaultBcrypt = require('bcryptjs');
require('../db/index').setup();
const usersModel = require('../db/user')();

module.exports = (db = defaultDB, bcrypt = defaultBcrypt) => async (
  username,
  password,
  done
) =>
  usersModel
    .where({ email: username })
    .fetch()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.get('password'))) {
        done(null, {
          username: user.get('email'),
          id: user.get('id')
        });
      } else {
        done(null, false);
      }
    })
    .catch(() => {
      done('Database error');
    });

  // db('users')
  //   .where({ email: username })
  //   .first()
  //   .then(user => {
  //     // If there is a matching user, return it
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       usersModel
  //         .where({ email: username })
  //         .fetch({ withRelated: ['role.activities'] })
  //         .then(bookshelfUser => {
  //           console.log({
  //             username: bookshelfUser.get('email'),
  //             id: bookshelfUser.get('id'),
  //             activities: bookshelfUser.activities()
  //           });
  //           // done(null, {
  //           //   username: user.get('email'),
  //           //   id: user.get('id'),
  //           //   activities: user.activities()
  //           // });
  //         })
  //         .catch(() => {
  //           done('Could not deserialize user');
  //         });
  //
  //       done(null, { username: user.email, id: user.id });
  //     } else {
  //       // Otherwise, callback with a false user.  If we
  //       // send an error, Passport will send a status 500,
  //       // but if we send no error and a false user, it will
  //       // send a 401, which is what we really want.  So...
  //       // I guess a failed login isn't an error. :P
  //       done(null, false);
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     done('Database error');
  //   });
