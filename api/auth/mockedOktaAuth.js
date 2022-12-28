const noPermissions = {
  status: 'ACTIVE',
  id: 'no-permissions',
  profile: {
    displayName: 'No Permissions Test User',
    email: 'no-permissions@email.com'
  }
};

const allPermissions = {
  status: 'ACTIVE',
  id: 'all-permissions',
  profile: {
    displayName: 'All Permissions',
    email: 'all-permissions@email.com'
  }
};

const fedAdmin = {
  status: 'ACTIVE',
  id: 'fed-admin',
  role: 'eAPD Federal Admin',
  profile: {
    displayName: 'Federal Admin',
    email: 'fedadmin@email.com'
  }
};

const stateAdmin = {
  status: 'ACTIVE',
  id: 'state-admin',
  profile: {
    displayName: 'State Admin',
    email: 'stateadmin@email.com'
  }
};

const allPermissionsNoState = {
  status: 'ACTIVE',
  id: 'all-permissions-no-state',
  profile: {
    displayName: 'All Permissions No State Test User',
    email: 'apno@email.com'
  }
};

const allPermissionsAndState = {
  status: 'ACTIVE',
  id: 'all-permissions-and-state',
  profile: {
    displayName: 'All Permissions And State',
    email: 'apas@email.com'
  }
};

const mockOktaClient = {
  listUsers: () => {
    return new Promise(resolve => {
      resolve([
        noPermissions,
        allPermissions,
        allPermissionsNoState,
        allPermissionsAndState,
        fedAdmin,
        stateAdmin
      ]);
    });
  },
  getUser: id => {
    if (id === 'no-permissions') {
      return Promise.resolve(noPermissions);
    }
    if (id === 'all-permissions') {
      return Promise.resolve(allPermissions);
    }
    if (id === 'all-permissions-no-state') {
      return Promise.resolve(allPermissionsNoState);
    }
    if (id === '0') {
      return Promise.resolve(null);
    }
    if (id === 'fed-admin') {
      return Promise.resolve(fedAdmin);
    }
    if (id === 'state-admin') {
      return new Promise(resolve => {
        resolve(stateAdmin);
      });
    }
    return new Promise(resolve => {
      resolve(allPermissionsAndState);
    });
  }
};

const mockVerifyJWT = token => {
  if (token === 'no-permissions') {
    return {
      sub: 'no-permissions@email.com',
      uid: 'no-permissions'
    };
  }
  if (token === 'all-permissions') {
    return {
      sub: 'all-permissions@email.com',
      uid: 'all-permissions'
    };
  }
  if (token === 'no-permissions-no-state') {
    return {
      sub: 'npno@email.com',
      uid: 'no-permissions-no-state'
    };
  }
  if (token === 'all-permissions-no-state') {
    return {
      sub: 'apno@email.com',
      uid: 'all-permissions-no-state'
    };
  }
  if (token === 'all-permissions-and-state') {
    return {
      sub: 'apas@email.com',
      uid: 'all-permissions-and-state'
    };
  }
  if (token === 'fed-admin') {
    return {
      sub: 'fedadmin@email.com',
      uid: 'fed-admin'
    };
  }
  if (token === 'state-admin') {
    return {
      sub: 'stateadmin@email.com',
      uid: 'state-admin'
    };
  }
  if (token === 'state-admin') {
    return {
      sub: 'stateadmin@email.com',
      uid: 'state-admin'
    };
  }
  return false;
};

module.exports = {
  mockOktaClient,
  mockVerifyJWT
};
