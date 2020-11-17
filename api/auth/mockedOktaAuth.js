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

const getGroups = userId => {
  if (
    userId === 'all-permissions-no-state' ||
    userId === 'all-permissions-and-state'
  ) {
    return ['eAPD Admin', 'eAPD State Coordinator'];
  }
  return [];
};

const getAffiliations = userId => {
  if (userId === 'all-permissions-and-state') {
    return ['MN'];
  }
  return [];
};

const mockCallOktaEndpoint = async endpoint => {
  if (endpoint) {
    if (endpoint.test(/\/api\/v1\/users\/[a-zA-Z0-9]+\/groups/)) {
      const urlPaths = endpoint.split('/');
      const userId = urlPaths[3];
      const groups = getGroups(userId);
      return new Promise(resolve => {
        resolve(groups);
      });
    }
    if (endpoint.test(/\/api\/v1\/apps\/[a-zA-Z0-9]+\/users\/[a-zA-Z0-9]+/)) {
      const urlPaths = endpoint.split('/');
      const userId = urlPaths[5];
      const affiliations = getAffiliations(userId);
      return new Promise(resolve => {
        resolve({
          affiliations
        });
      });
    }
  }
  return new Promise(resolve => {
    resolve();
  });
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
  if (token === 'no.permissions.nostate') {
    const uid = 'no-permissions-no-state';
    return new Promise(resolve => {
      resolve({
        sub: 'npno@email.com',
        uid
      });
    });
  }
  if (token === 'all.permissions.nostate') {
    const uid = 'all-permissions-no-state';
    return new Promise(resolve => {
      resolve({
        sub: 'apno@email.com',
        uid
      });
    });
  }
  if (token === 'all.permissions.andstate') {
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
  mockCallOktaEndpoint,
  mockOktaClient,
  mockVerifyJWT
};
