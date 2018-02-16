const canCache = { };

module.exports.loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).end();
  }
};

module.exports.can = activity => {
  if (!canCache[activity]) {
    canCache[activity] = (req, res, next) => {
      // First check if they're logged in
      module.exports.loggedIn(req, res, () => {
        // Then check if they have the activity
        if (req.user.activities.includes(activity)) {
          next();
        } else {
          res.status(401).end();
        }
      });
    };
  }
  return canCache[activity];
};
