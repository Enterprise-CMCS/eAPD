const defaultDB = require('../db')();

const usersModel = require('../db/user')();

// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = (user, done) => {
  done(null, user.id);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = async (userID, done) => {
  try {
    const user = await usersModel.where({ id: userID }).fetch();
    done(null, {
      username: user.get('email'),
      id: user.get('id'),
      activities: await user.activities()
    });
  } catch (e) {
    done('Could not deserialize user');
  }
};

// module.exports.deserializeUser = (userID, done, db = defaultDB) =>
//   db('users')
//     .where({ id: userID })
//     .select()
//     .then(users => {
//       if (users.length) {
//         const role = users[0].auth_role;
//         if (role) {
//           db('auth_role_activity_mapping')
//             .fullOuterJoin(
//               'auth_roles',
//               'auth_roles.id',
//               'auth_role_activity_mapping.role_id'
//             )
//             .where({ 'auth_roles.name': role })
//             .innerJoin(
//               'auth_activities',
//               'auth_activities.id',
//               'auth_role_activity_mapping.activity_id'
//             )
//             .select()
//             .then(activityRows => {
//               const activities = activityRows.map(row => row.name);
//               done(null, {
//                 username: users[0].email,
//                 id: users[0].id,
//                 activities
//               });
//             });
//         } else {
//           done(null, {
//             username: users[0].email,
//             id: users[0].id,
//             activities: []
//           });
//         }
//       } else {
//         done('Could not deserialize user');
//       }
//     });
