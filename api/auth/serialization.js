// Serialize a user into a stringy type that will get
// pushed into their session cookie.
module.exports.serializeUser = (user, done) => {
  done(null, user.id);
};

// Deserialize a stringy from the user's session cookie
// into a user object.
module.exports.deserializeUser = (userID, done) => {
  done(null, { username: 'hello', email: 'hello@world.com', id: userID });
};
