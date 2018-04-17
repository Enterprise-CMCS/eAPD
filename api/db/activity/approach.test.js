const tap = require('tap');
const sinon = require('sinon');

const approach = require('./approach').apdActivityApproach;

tap.test('approach data model', async approachModelTests => {
  approachModelTests.test('setup', async setupTests => {
    setupTests.match(
      approach,
      {
        tableName: 'activity_approaches',
        static: {
          updateableFields: ['description', 'alternatives', 'explanation']
        }
      },
      'get the expected model definitions'
    );

    setupTests.type(
      approach.activity,
      'function',
      'creates an activity relationship'
    );
  });

  approachModelTests.test(
    'approach model sets up activity relationship',
    async relationTest => {
      const self = {
        belongsTo: sinon.stub().returns('baz')
      };

      const output = approach.activity.bind(self)();

      relationTest.ok(
        self.belongsTo.calledWith('apdActivity'),
        'sets up the relationship mapping to an activity'
      );
      relationTest.equal(output, 'baz', 'returns the expected value');
    }
  );

  approachModelTests.test('has validate method', async validationTests => {
    validationTests.test(
      'throws if description, alternatives, and explanation are all empty',
      async test => {
        test.rejects(
          approach.validate.bind({
            attributes: {
              description: undefined,
              alternatives: undefined,
              explanation: undefined
            }
          }),
          'fails if values are undefined'
        );

        test.rejects(
          approach.validate.bind({
            attributes: {
              description: undefined,
              alternatives: undefined,
              explanation: null
            }
          }),
          'fails if values are null'
        );

        test.rejects(
          approach.validate.bind({
            attributes: {
              description: undefined,
              alternatives: '',
              explanation: null
            }
          }),
          'fails if values are empty strings'
        );

        test.resolves(
          approach.validate.bind({
            attributes: {
              description: 'something',
              alternatives: undefined,
              explanation: undefined
            }
          }),
          'passes if at least one value is not empty'
        );
      }
    );
  });

  approachModelTests.test('overrides toJSON method', async jsonTests => {
    const self = { get: sinon.stub() };
    self.get.withArgs('id').returns('Nick');
    self.get.withArgs('description').returns('Aretakis');
    self.get.withArgs('alternatives').returns('at');
    self.get.withArgs('explanation').returns('CMS');

    const output = approach.toJSON.bind(self)();

    jsonTests.match(output, {
      id: 'Nick',
      description: 'Aretakis',
      alternatives: 'at',
      explanation: 'CMS'
    });
  });
});
