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

const eapdStateAdmin = {
  status: 'ACTIVE',
  id: 'eapd-state-admin',
  profile: { displayName: 'eAPD State Admin' }
};

const mockOktaClient = {
  listUsers: () => {
    return new Promise(resolve => {
      resolve([
        noPermissions,
        allPermissions,
        allPermissionsNoState,
        allPermissionsAndState,
        eapdStateAdmin
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
    if (id === 'eapd-state-admin') {
      return new Promise(resolve => {
        resolve(eapdStateAdmin);
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
  if (token === 'eapd-state-admin') {
    const uid = 'eapd-state-admin';
    return new Promise(resolve => {
      resolve({
        sub: 'stateadmin@state.gov',
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
