const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { request, getFullPath } = require('../utils');

const url = getFullPath('/log-form');

const testItem = {
  user: 'Bob The Builder',
  form: {
    field1: 'value1',
    field2: 'value2',
    field3: {
      field3a: ['value3aa', 'value3ab', 'value3ac']
    }
  }
};

tap.test('form logging endpoint | POST /log-form', async (postTests) => {
  const { response, body } = await request.post(url, { json: testItem });

  postTests.equal(response.statusCode, 200, 'gives a 200 status code');
  postTests.notOk(body, 'sends an empty body');
});

tap.test('form logging endpoint | GET /log-form', async (getTests) => {
  const { response, body } = await request.get(url);

  getTests.equal(response.statusCode, 200, 'gives a 200 status code');
  getTests.same(
    JSON.parse(body),
    {
      'Bob The Builder': {
        field1: 'value1',
        field2: 'value2',
        field3: {
          field3a: ['value3aa', 'value3ab', 'value3ac']
        }
      }
    },
    'sends back the body from the previous POST'
  );
});
