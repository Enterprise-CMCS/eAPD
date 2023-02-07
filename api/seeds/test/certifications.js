const seed = async knex => {
  await knex('state_admin_certifications').insert([
    {
      id: 5004, // manually set for testing
      state: 'ak',
      ffy: 2023,
      name: 'State Admin Test',
      email: 'stateadminmatch@email.com',
      fileUrl: 'http://localhost:8081/auth/certifications/files/test-123',
      uploadedBy: 'fed-admin',
      uploadedOn: new Date(),
      affiliationId: null,
      status: 'active'
    }
  ]);
};

export default seed;
