const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../middleware');
const postEndpoint = require('./post');

tap.test('apds POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { post: sinon.stub() };

  const ApdModel = {
    forge: sandbox.stub(),
    save: sandbox.stub(),
    where: sandbox.stub()
  };

  const POCModel = {
    forge: sandbox.stub(),
    save: sandbox.stub()
  };

  const StateModel = {
    where: sandbox.stub(),
    fetch: sandbox.stub()
  };

  endpointTest.test('setup', async test => {
    postEndpoint(app, ApdModel, POCModel, StateModel);

    test.ok(
      app.post.calledWith('/apds', can('edit-document'), sinon.match.func),
      'apds POST endpoint is registered'
    );
  });

  endpointTest.test('handler tests', async tests => {
    let handler;

    const req = { user: { state: 'st' } };

    const res = {
      send: sandbox.stub(),
      status: sandbox.stub(),
      end: sandbox.stub()
    };

    const set = sinon.stub();

    tests.beforeEach(async () => {
      sandbox.resetBehavior();
      sandbox.resetHistory();

      res.send.returns(res);
      res.status.returns(res);
      res.end.returns(res);

      ApdModel.forge.returns({
        get: sandbox
          .stub()
          .withArgs('id')
          .returns('new-apd-id'),
        set,
        save: ApdModel.save
      });

      ApdModel.where.returns({
        fetch: sandbox.stub().resolves('this is the new APD')
      });

      POCModel.forge.returns({
        save: POCModel.save
      });
      POCModel.save.resolves();

      StateModel.where.returns(StateModel);

      postEndpoint(app, ApdModel, StateModel);
      handler = app.post.args[0].slice(-1).pop();
    });

    tests.test('sends a 500 code for database errors', async test => {
      ApdModel.forge.throws(new Error('boop'));
      await handler(req, res);

      test.ok(res.status.calledWith(500), 'HTTP status set to 500');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    tests.test('sends back the new APD if everything works', async test => {
      const get = sinon.stub();
      get.withArgs('medicaid_office').returns({
        medicaidDirector: {
          name: 'Abraham Lincoln',
          email: 'honestabe@presidents.gov',
          phone: '555-ABE-LNCN'
        },
        medicaidOffice: {
          address1: '1600 Pennsylvania Ave',
          address2: 'c/o 1865',
          city: 'Washington',
          state: 'DC',
          zip: '20500'
        }
      });
      get
        .withArgs('state_pocs')
        .returns([{ name: 'bloop' }, { name: 'blorp' }]);

      StateModel.fetch.resolves({ get });
      POCModel.forge.returns({ save: sinon.stub() });

      await handler(req, res);

      test.ok(
        ApdModel.forge.calledWith({
          state_id: 'st',
          status: 'draft'
        }),
        'new APD is created'
      );

      test.ok(
        set.calledWith({
          stateProfile: {
            medicaidDirector: {
              name: 'Abraham Lincoln',
              email: 'honestabe@presidents.gov',
              phone: '555-ABE-LNCN'
            },
            medicaidOffice: {
              address1: '1600 Pennsylvania Ave',
              address2: 'c/o 1865',
              city: 'Washington',
              state: 'DC',
              zip: '20500'
            }
          }
        }),
        'state profile is populated'
      );

      test.ok(ApdModel.save.calledOnce, 'apd is saved');
      test.ok(
        ApdModel.save.calledBefore(POCModel.forge),
        'APD must be saved before POCs are created because they need the APD ID'
      );

      test.ok(
        POCModel.forge.calledWith({ name: 'bloop', apd_id: 'new-apd-id' }),
        'creates POC model'
      );
      test.ok(
        POCModel.forge.calledWith({ name: 'blorp', apd_id: 'new-apd-id' }),
        'creates POC model'
      );

      test.ok(
        res.send.calledWith('this is the new APD'),
        'sends back the new APD'
      );
    });
  });
});
