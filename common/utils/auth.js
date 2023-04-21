// This was previously handled in LaunchDarkly so that we could
// manage the list of support state users without having to
// update the code or the database. We recommend using that
// option if you have LaunchDarkly or a feature flag service like it.
export const isSysAdmin = name => {
  if (name) {
    return name === 'sysadmin';
  }
  return false;
};

// This was previously handled in LaunchDarkly so that we could
// manage the list of support state users without having to
// update the code or the database. We recommend using that
// option if you have LaunchDarkly or a feature flag service like it.
export const hasSupportState = name => {
  if (name) {
    // all shared test users
    // 'em@il.com', 'fedadmin', 'stateadmin', 'statestaff', 'statecontractor',
    // 'sysadmin', 'requestedrole', 'deniedrole', 'revokedrole', 'norole',
    // 'expiredadmin', 'pendingadmin', 'betauser', 'notingroupmfa', 'lockedout',
    // 'expired', 'mfa@email.com', 'lockedoutmfa', 'resetmfa', 'norolemfa', 'expiredmfa'
    return [
      'em@il.com',
      'fedadmin',
      'stateadmin',
      'statestaff',
      'statecontractor',
      'sysadmin',
      'requestedrole',
      'deniedrole',
      'revokedrole',
      'norole',
      'expiredadmin',
      'pendingadmin',
      'mfa@email.com',
      'resetmfa',
      'norolemfa'
    ].includes(name);
  }
  return false;
};
