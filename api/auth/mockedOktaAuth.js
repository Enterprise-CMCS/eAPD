const noPermissions = {
  status: 'ACTIVE',
  id: 'no-permissions',
  profile: { displayName: 'No Permissions Test User' }
};

const allPermissions = {
  status: 'ACTIVE',
  id: 'all-permissions',
  profile: { displayName: 'All Permissions' }
};

const allPermissionsNoState = {
  status: 'ACTIVE',
  id: 'all-permissions-no-state',
  profile: { displayName: 'All Permissions No State Test User' }
};

const allPermissionsAndState = {
  status: 'ACTIVE',
  id: 'all-permissions-and-state',
  profile: { displayName: 'All Permissions And State' }
};

const mockOktaClient = {
  listUsers: () => {
    return new Promise(resolve => {
      resolve([
        noPermissions,
        allPermissions,
        allPermissionsNoState,
        allPermissionsAndState
      ]);
    });
  },
  getUser: id => {
    if (id === 'no-permissions') {
      return new Promise(resolve => {
        resolve(noPermissions);
      });
    }
    if (id === 'all-permissions') {
      return new Promise(resolve => {
        resolve(allPermissions);
      });
    }
    if (id === 'all-permissions-no-state') {
      return new Promise(resolve => {
        resolve(allPermissionsNoState);
      });
    }
    if (id === '0') {
      return new Promise(resolve => {
        resolve(null);
      });
    }
    return new Promise(resolve => {
      resolve(allPermissionsAndState);
    });
  }
};

const mockVerifyJWT = token => {
  if (token === 'no-permissions') {
    return new Promise(resolve => {
      resolve({
        sub: 'no-permissions@email.com',
        uid: 'no-permissions'
      });
    });
  }
  if (token === 'all-permissions') {
    return new Promise(resolve => {
      resolve({
        sub: 'all-permissions@email.com',
        uid: 'all-permissions'
      });
    });
  }
  if (token === 'no-permissions-no-state') {
    const uid = 'no-permissions-no-state';
    return new Promise(resolve => {
      resolve({
        sub: 'npno@email.com',
        uid
      });
    });
  }
  if (token === 'all-permissions-no-state') {
    const uid = 'all-permissions-no-state';
    return new Promise(resolve => {
      resolve({
        sub: 'apno@email.com',
        uid
      });
    });
  }
  if (token === 'all-permissions-and-state') {
    const uid = 'all-permissions-and-state';
    return new Promise(resolve => {
      resolve({
        sub: 'apas@email.com',
        uid
      });
    });
  }
  return new Promise(resolve => {
    resolve(false);
  });
};

module.exports = {
  mockOktaClient,
  mockVerifyJWT
};
