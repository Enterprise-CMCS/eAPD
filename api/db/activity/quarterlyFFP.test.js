const tap = require('tap');
const sinon = require('sinon');

const quarterlyFFP = require('./quarterlyFFP').apdActivityQuarterlyFFP;

tap.test('activity quarterly FFP data model', async tests => {
  tests.test('setup', async test => {
    test.match(
      quarterlyFFP,
      {
        tableName: 'activity_quarterly_ffp',
        activity: Function,
        format: Function,
        validate: Function,
        toJSON: Function,
        static: {
          updateableFields: ['q1', 'q2', 'q3', 'q4', 'year']
        }
      },
      'get the expected model definitions'
    );
  });

  tests.test('approach model sets up activity relationship', async test => {
    const self = {
      belongsTo: sinon.stub().returns('baz')
    };

    const output = quarterlyFFP.activity.bind(self)();

    test.ok(
      self.belongsTo.calledWith('apdActivity'),
      'sets up the relationship mapping to an activity'
    );
    test.equal(output, 'baz', 'returns the expected value');
  });

  tests.test(
    'formats attributes for insertion into the database',
    async test => {
      test.match(
        quarterlyFFP.format({
          activity_id: '0U812',
          q1: {
            combined: 0,
            contractors: 1,
            state: 2
          },
          q2: {
            combined: 3,
            contractors: '4',
            state: '5'
          },
          q4: {
            combined: 6,
            contractors: 7,
            state: '8'
          },
          year: 1927,
          someOtherJunk: 'gets thrown out'
        }),
        {
          activity_id: '0U812',
          q1_combined: 0,
          q1_contractors: 1,
          q1_state: 2,
          q2_combined: 3,
          q2_contractors: 4,
          q2_state: 5,
          q4_combined: 6,
          q4_contractors: 7,
          q4_state: 8,
          year: 1927
        },
        'formats data'
      );
    }
  );

  tests.test('has validate method', async validationTests => {
    validationTests.test('throws if year is empty', async test => {
      test.rejects(
        quarterlyFFP.validate.bind({
          attributes: {
            year: undefined
          }
        }),
        'fails if year is undefined'
      );

      test.rejects(
        quarterlyFFP.validate.bind({
          attributes: {
            year: null
          }
        }),
        'fails if value is null'
      );

      test.rejects(
        quarterlyFFP.validate.bind({
          attributes: {
            year: ''
          }
        }),
        'fails if value is empty string'
      );

      test.resolves(
        quarterlyFFP.validate.bind({
          attributes: {
            year: 2001
          }
        }),
        'passes if at year is not empty'
      );
    });
  });

  tests.test('overrides toJSON method', async test => {
    const self = { get: sinon.stub() };
    self.get.withArgs('q1_combined').returns('100');
    self.get.withArgs('q1_contractors').returns('200');
    self.get.withArgs('q1_state').returns(300);
    self.get.withArgs('q2_combined').returns(400);
    self.get.withArgs('q2_contractors').returns(500);
    self.get.withArgs('q2_state').returns(600);
    self.get.withArgs('q3_combined').returns(700);
    self.get.withArgs('q3_contractors').returns(800);
    self.get.withArgs('q3_state').returns(900);
    self.get.withArgs('q4_combined').returns(150);
    self.get.withArgs('q4_contractors').returns(250);
    self.get.withArgs('q4_state').returns(350);
    self.get.withArgs('year').returns('THE FEDERAL FISCAL YEAR');

    const output = quarterlyFFP.toJSON.bind(self)();

    test.match(output, {
      q1: {
        combined: 100,
        contractors: 200,
        state: 300
      },
      q2: {
        combined: 400,
        contractors: 500,
        state: 600
      },
      q3: {
        combined: 700,
        contractors: 800,
        state: 900
      },
      q4: {
        combined: 150,
        contractors: 250,
        state: 350
      },
      year: 'THE FEDERAL FISCAL YEAR'
    });
  });
});
