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
  profile: {
    displayName: 'Federal Admin',
    email: 'fedadmin@email.com'
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
        fedAdmin
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
    if (id === 'fed-admin') {
      return new Promise(resolve => {
        resolve(fedAdmin);
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
    return new Promise(resolve => {
      resolve({
        sub: 'npno@email.com',
        uid: 'no-permissions-no-state'
      });
    });
  }
  if (token === 'all-permissions-no-state') {
    return new Promise(resolve => {
      resolve({
        sub: 'apno@email.com',
        uid: 'all-permissions-no-state'
      });
    });
  }
  if (token === 'all-permissions-and-state') {
    return new Promise(resolve => {
      resolve({
        sub: 'apas@email.com',
        uid: 'all-permissions-and-state'
      });
    });
  }
  if (token === 'fed-admin') {
    return new Promise(resolve => {
      resolve({
        sub: 'fedadmin@email.com',
        uid: 'fed-admin'
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
