module.exports.loggedIn = (req, res, next) => {
  if (!req.user) {
    res.status(403).end();
  } else {
    next();
  }
};
