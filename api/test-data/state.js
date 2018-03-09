module.exports.invalid = [
  {
    name: 'with an empty medicaid office',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {}
    }
  },
  {
    name: 'with a medicaid office with an invalid address1',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 0xdeadbeef,
        city: 'city',
        state: 'state',
        zip: 'zip'
      }
    }
  },
  {
    name: 'with a medicaid office with an invalid address2',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        address2: 0xdeadbeef,
        city: 'city',
        state: 'state',
        zip: 'zip'
      }
    }
  },
  {
    name: 'with a medicaid office with an invalid city',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        city: 0xdeadbeef,
        state: 'state',
        zip: 'zip'
      }
    }
  },
  {
    name: 'with a medicaid office with an invalid city',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        city: 'city',
        state: 0xdeadbeef,
        zip: 'zip'
      }
    }
  },
  {
    name: 'with a medicaid office with an invalid zip',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        city: 'city',
        state: 'state',
        zip: 0xdeadbeef
      }
    }
  },
  {
    name: 'with a medicaid director with an invalid name',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        city: 'city',
        state: 'state',
        zip: 'zip',
        directory: {
          name: 0xdeadbeef,
          email: 'email',
          phone: 'phone'
        }
      }
    }
  },
  {
    name: 'with a medicaid director with an invalid email',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        city: 'city',
        state: 'state',
        zip: 'zip',
        directory: {
          name: 'name',
          email: 0xdeadbeef,
          phone: 'phone'
        }
      }
    }
  },
  {
    name: 'with a medicaid director with an invalid phone',
    token: 'edit-state-invalid-medicaid-office',
    body: {
      medicaid_office: {
        address1: 'address',
        city: 'city',
        state: 'state',
        zip: 'zip',
        directory: {
          name: 'name',
          email: 'email',
          phone: 0xdeadbeef
        }
      }
    }
  },
  {
    name: 'with an invalid program benefits statement',
    token: 'edit-state-invalid-benefits',
    body: {
      program_benefits: 0xdeadbeef
    }
  },
  {
    name: 'with an invalid program vision statement',
    token: 'edit-state-invalid-vision',
    body: {
      program_vision: 0xdeadbeef
    }
  },
  {
    name: 'with points of contact with invalid name',
    token: 'edit-state-invalid-state-pocs',
    body: {
      state_pocs: [
        {
          name: 0xdeadbeef,
          email: 'em@il',
          position: 'position'
        }
      ]
    }
  },
  {
    name: 'with points of contact with invalid email',
    token: 'edit-state-invalid-state-pocs',
    body: {
      state_pocs: [
        {
          name: 'name',
          email: 'email',
          position: 'position'
        }
      ]
    }
  },
  {
    name: 'with points of contact with invalid position',
    token: 'edit-state-invalid-state-pocs',
    body: {
      state_pocs: [
        {
          name: 'name',
          email: 'em@il',
          position: 0xdeadbeef
        }
      ]
    }
  }
];
