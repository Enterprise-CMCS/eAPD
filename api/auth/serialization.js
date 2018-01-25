const defaultUserModel = require('../db/bookshelf').models.user;

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
    done(null, {
      username: user.get('email'),
      id: user.get('id'),
      activities: await user.activities()
    });
  } catch (e) {
    done('Could not deserialize user');
  }
};
