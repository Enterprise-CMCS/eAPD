const tap = require('tap');
const dbMock = require('./dbMock.test');

const { getAllActiveRoles } = require('./roles');

const allRoles = [
  {
    id: 22,
    name: 'eAPD System Admin'
  },
  {
    id: 23,
    name: 'eAPD Federal Admin'
  },
  {
    id: 27,
    name: 'eAPD State Admin'
  },
  {
    id: 28,
    name: 'eAPD State Staff'
  },
  {
    id: 29,
    name: 'eAPD State Contractor'
  }
];

const fedAdminRoles = [
  {
    id: 23,
    name: 'eAPD Federal Admin'
  },
  {
    id: 27,
    name: 'eAPD State Admin'
  }
];

const stateAdminRoles = [
  {
    id: 28,
    name: 'eAPD State Staff'
  },
  {
    id: 29,
    name: 'eAPD State Contractor'
  }
]

tap.test('database wrappers / roles', async rolesTests => {
  const db = dbMock('auth_roles');
  

  rolesTests.beforeEach(async () => {
    dbMock.reset();        
    db.select.withArgs('id', 'name').returnsThis();
    db.where.withArgs({isActive: true}).resolves(allRoles);
  });

  rolesTests.test('gets all roles as System Admin', async test => {        
    const response = await getAllActiveRoles('eAPD System Admin', { db });
    test.same(response, allRoles);
  });
  
  rolesTests.test('gets allowed roles for Federal Admin', async test => {   
    const response = await getAllActiveRoles('eAPD Federal Admin', { db });
    test.same(response, fedAdminRoles);
  });
  
  rolesTests.test('gets allowed roles for State Admin', async test => {        
    const response = await getAllActiveRoles('eAPD State Admin', { db });
    test.same(response, stateAdminRoles);
  });
});