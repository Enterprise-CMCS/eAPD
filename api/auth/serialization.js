module.exports.serializeUser = (user, done) => {
  done(null, user.id);
};

module.exports.deserializeUser = (userID, done) => {
  done(null, { username: 'hello', email: 'hello@world.com', id: userID });
};
