const defaultUserModel = require('../db').models.user;

// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = (user, done) => {
  done(null, user.id);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = async (
  userID,
  done,
  userModel = defaultUserModel
) => {
  try {
    const user = await userModel.where({ id: userID }).fetch();
    if (user) {
      done(null, {
        username: user.get('email'),
        id: user.get('id'),
        role: user.get('auth_role'),
        activities: await user.activities()
      });
    } else {
      done(null, null);
    }
  } catch (e) {
    done('Could not deserialize user');
  }
};
