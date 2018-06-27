const tap = require('tap');
const sinon = require('sinon');

const apd = require('./apd')();

tap.test('apd data model', async apdModelTests => {
  apdModelTests.test('setup', async setupTests => {
    setupTests.match(
      apd,
      {
        apd: {
          tableName: 'apds',
          activities: Function,
          keyPersonnel: Function,
          previousActivityExpenses: Function,
          state: Function,
          versions: Function,
          format: Function,
          toJSON: Function,
          static: {
            updateableFields: [
              'status',
              'period',
              'federalCitations',
              'previousActivitySummary',
              'programOverview',
              'narrativeHIE',
              'narrativeHIT',
              'narrativeMMIS',
              'stateProfile',
              'years'
            ],
            foreignKey: 'apd_id',
            owns: {
              activities: 'apdActivity',
              keyPersonnel: 'apdKeyPersonnel'
            },
            withRelated: [
              { activities: Function },
              'activities.contractorResources',
              'activities.contractorResources.years',
              'activities.costAllocation',
              'activities.goals',
              'activities.expenses',
              'activities.expenses.entries',
              'activities.schedule',
              'activities.statePersonnel',
              'activities.statePersonnel.years',
              'keyPersonnel',
              'keyPersonnel.years',
              'previousActivityExpenses'
            ]
          }
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      apd.apd.activities,
      'function',
      'creates an activities relationship for the apd model'
    );

    setupTests.type(
      apd.apd.keyPersonnel,
      'function',
      'creates a key personnel relationship for the apd model'
    );

    setupTests.type(
      apd.apd.previousActivityExpenses,
      'function',
      'creates a previous activity expenses relationship for the apd model'
    );

    setupTests.type(
      apd.apd.state,
      'function',
      'creates a state relationship for the apd model'
    );

    setupTests.type(
      apd.apd.versions,
      'function',
      'creates a versions relationship for the apd model'
    );
  });

  apdModelTests.test('with-related fields order themselves', async test => {
    const query = { orderBy: sinon.stub() };
    const withRelated = apd.apd.static.withRelated;

    withRelated.filter(w => typeof w === 'object').forEach(related => {
      Object.keys(related).forEach(relation => {
        related[relation](query);
        test.ok(query.orderBy.calledWith('id'), `${relation} is ordered by ID`);
        query.orderBy.resetHistory();
      });
    });
  });

  apdModelTests.test(
    'apd model sets up activities relationship',
    async activitiesTests => {
      const self = {
        hasMany: sinon.stub().returns('florp')
      };

      const output = apd.apd.activities.bind(self)();

      activitiesTests.ok(
        self.hasMany.calledWith('apdActivity'),
        'sets up the relationship mapping to activities'
      );
      activitiesTests.equal(output, 'florp', 'returns the expected value');
    }
  );

  apdModelTests.test(
    'apd model sets up key personnel relationship',
    async activitiesTests => {
      const self = {
        hasMany: sinon.stub().returns('florp')
      };

      const output = apd.apd.keyPersonnel.bind(self)();

      activitiesTests.ok(
        self.hasMany.calledWith('apdKeyPersonnel'),
        'sets up the relationship mapping to key personnel'
      );
      activitiesTests.equal(output, 'florp', 'returns the expected value');
    }
  );

  apdModelTests.test(
    'apd model sets up previous activity expenses relationship',
    async activitiesTests => {
      const self = {
        hasMany: sinon.stub().returns('florp')
      };

      const output = apd.apd.previousActivityExpenses.bind(self)();

      activitiesTests.ok(
        self.hasMany.calledWith('apdPreviousActivityExpense'),
        'sets up the relationship mapping to previous activity expenses'
      );
      activitiesTests.equal(output, 'florp', 'returns the expected value');
    }
  );

  apdModelTests.test(
    'apd model sets up state relationship',
    async stateTests => {
      const self = {
        belongsTo: sinon.stub().returns('beep')
      };

      const output = apd.apd.state.bind(self)();

      stateTests.ok(
        self.belongsTo.calledWith('state'),
        'sets up the relationship mapping to a state'
      );
      stateTests.equal(output, 'beep', 'returns the expected value');
    }
  );

  apdModelTests.test('apd model sets up versions relationship', async test => {
    const self = {
      hasMany: sinon.stub().returns('beep')
    };

    const output = apd.apd.versions.bind(self)();

    test.ok(
      self.hasMany.calledWith('apdVersion'),
      'sets up the relationship mapping to versions'
    );
    test.equal(output, 'beep', 'returns the expected value');
  });

  apdModelTests.test(
    'converts from camel case to snake case and stringifies',
    async test => {
      const attributes = {
        fine: 'no change',
        good: 'also no change',
        federalCitations: { obj: 'gets converted', toJson: 3 },
        programOverview: 'changed over',
        narrativeHIE: undefined,
        narrativeHIT: null,
        narrativeMMIS: 'also changed',
        previousActivitySummary: 'blip blop',
        stateProfile: {
          medicaidDirector: {
            name: 'their name'
          },
          medicaidOffice: {
            address2: 'skip address 1',
            city: 'city',
            state: 'somewhere',
            zip: 'hello'
          }
        },
        years: { key: 'value' }
      };

      const out = apd.apd.format(attributes);

      test.same(
        out,
        {
          fine: 'no change',
          good: 'also no change',
          federal_citations: '{"obj":"gets converted","toJson":3}',
          previous_activity_summary: 'blip blop',
          program_overview: 'changed over',
          medicaid_director_name: 'their name',
          medicaid_director_email: null,
          medicaid_director_phone: null,
          medicaid_office_address1: null,
          medicaid_office_address2: 'skip address 1',
          medicaid_office_city: 'city',
          medicaid_office_state: 'somewhere',
          medicaid_office_zip: 'hello',
          narrative_hit: null,
          narrative_mmis: 'also changed',
          years: '{"key":"value"}'
        },
        'converts to snake case, if defined'
      );
    }
  );

  apdModelTests.test('converts to JSON', async test => {
    const self = {
      get: sinon.stub(),
      related: sinon.stub()
    };

    self.related
      .withArgs('activities')
      .returns({ toJSON: sinon.stub().returns('apd-activities') });
    self.related
      .withArgs('keyPersonnel')
      .returns({ toJSON: sinon.stub().returns('key-personnel') });
    self.get.withArgs('id').returns('apd-id');
    self.get.withArgs('state_id').returns('apd-state');
    self.get.withArgs('status').returns('apd-status');
    self.get.withArgs('federal_citations').returns('assurances and stuff');
    self.get.withArgs('period').returns('apd-period');
    self.get
      .withArgs('previous_activity_summary')
      .returns('apd-previous-activity-summary');
    self.related.withArgs('previousActivityExpenses').returns({
      toJSON: sinon.stub().returns('apd-previous-activity-expenses')
    });
    self.get.withArgs('program_overview').returns('apd-overview');
    self.get.withArgs('narrative_hie').returns('apd-hie');
    self.get.withArgs('narrative_hit').returns('apd-hit');
    self.get.withArgs('narrative_mmis').returns('apd-mmis');
    self.get.withArgs('years').returns('apd-years');
    self.get.withArgs('medicaid_director_name').returns('Carrie Feher');
    self.get.withArgs('medicaid_director_email').returns('em@il');
    self.get.withArgs('medicaid_director_phone').returns('☎️');
    self.get.withArgs('medicaid_office_address1').returns('place for street');
    self.get
      .withArgs('medicaid_office_address2')
      .returns('office, po box, whatever');
    self.get.withArgs('medicaid_office_city').returns('a place within a state');
    self.get.withArgs('medicaid_office_state').returns('a state');
    self.get
      .withArgs('medicaid_office_zip')
      .returns('a code to help the USPS get stuff there');

    const output = apd.apd.toJSON.bind(self)();

    test.same(
      output,
      {
        id: 'apd-id',
        activities: 'apd-activities',
        federalCitations: 'assurances and stuff',
        keyPersonnel: 'key-personnel',
        narrativeHIE: 'apd-hie',
        narrativeHIT: 'apd-hit',
        narrativeMMIS: 'apd-mmis',
        period: 'apd-period',
        previousActivitySummary: 'apd-previous-activity-summary',
        previousActivityExpenses: 'apd-previous-activity-expenses',
        programOverview: 'apd-overview',
        state: 'apd-state',
        stateProfile: {
          medicaidDirector: {
            name: 'Carrie Feher',
            email: 'em@il',
            phone: '☎️'
          },
          medicaidOffice: {
            address1: 'place for street',
            address2: 'office, po box, whatever',
            city: 'a place within a state',
            state: 'a state',
            zip: 'a code to help the USPS get stuff there'
          }
        },
        status: 'apd-status',
        years: 'apd-years'
      },
      'gives the expected JSON'
    );
  });
});
