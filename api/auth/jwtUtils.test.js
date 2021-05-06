/* eslint-disable global-require, no-shadow */
const tap = require('tap');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const sandbox = sinon.createSandbox();
const mockVerifier = sandbox.stub();


tap.test('Okta jwtUtils', async t => {
  t.afterEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  t.test('verifyWebToken()', async t => {
    const { verifyWebToken } = require('./jwtUtils');

    t.test('given a valid JWT', async t => {
      const claims = { email: 'test@email.com' };
      mockVerifier.resolves(claims);
      const result = await verifyWebToken('good token', {
        verifier: mockVerifier
      });
      t.equal(result, claims, 'returns a valid claim');
    });

    t.test('given an invalid JWT string', async t => {
      mockVerifier.rejects({ message: 'bad token' });
      const result = await verifyWebToken('bad token', {
        verifier: mockVerifier
      });
      t.equal(result, false, 'returns false');
    });
  });

  t.test('jwtExtractor() Authorization test', async t => {
    const { jwtExtractor } = require('./jwtUtils');
    let request;

    t.beforeEach(async () => {
      request = new Map();
      request.url = '/apds';
    });

    const scenarios = [
      ['Bearer xxx.yyy.zzz', 'xxx.yyy.zzz', 'returns the JWT'],
      ['bearer xxx.yyy.zzz', 'xxx.yyy.zzz', 'returns the JWT'],
      ['bearer', null, 'returns null'],
      ['', null, 'returns null'],
      ['Elephanter xxx.yyy.zzz', null, 'returns null']
    ];

    scenarios.forEach(([header, expected, message]) => {
      t.test(`given Authorization header is '${header}'`, async t => {
        request.set('Authorization', header);
        const result = jwtExtractor(request);
        t.equal(result, expected, message);
      });
    });
  });

  t.test('jwtExtractor() Cookie test', async t => {
    const { jwtExtractor } = require('./jwtUtils');
    let request;

    t.beforeEach(async () => {
      request = new Map();
    });

    const scenarios = [
      [
        '/apds/1/files/12345',
        'gov.cms.eapd.api-token={%22accessToken%22%3A%22example.cookie.value%22%2C%22max-age%22%3A900}',
        'example.cookie.value',
        'returns the JWT'
      ],
      [
        '/apds/1/files/12345',
        'gov.cms.eapd.API-TOKEN={%22accessToken%22%3A%22example.cookie.value%22%2C%22max-age%22%3A900}',
        'example.cookie.value',
        'returns the JWT'
      ],
      [
        '/apds/1/files/12345',
        'gov.cms.eapd.hasConsented=true;',
        null,
        'returns null'
      ],
      ['/apds/1/files/12345', '', null, 'returns null'],
      ['/apds/1/files/12345', 'Elephanter xxx.yyy.zzz', null, 'returns null']
    ];

    scenarios.forEach(([url, cookie, expected, message]) => {
      t.test(`given Authorization cookie is '${cookie}'`, async t => {
        request.url = url;
        request.set('Cookie', cookie);
        const result = jwtExtractor(request);
        t.equal(result, expected, message);
      });
    });
  });
});

tap.test('Local jwtUtils', async t => {
  const { getDefaultOptions, sign, verify } = require('./jwtUtils');

  const payload = {
    user: 'Test User',
    role: 'Some Role',
    foo: 'bar',
    complexObject: {
      foo: 'bar',
      state: {
        id: 'ak'
      }
    }
  }

  t.test('getDefaultOptions', async () => {

    const options = getDefaultOptions()
    tap.matchSnapshot(options, 'output')
  })

  t.test('signing a payload', async t =>{

    const token = sign(payload)

    // a jwt has 3 parts, separated by .
    t.ok(token.match(/\./g).length === 2, 'JWT is 3 parts')

    // Decodes WITHOUT verifying; only use if certain the token is valid
    // using this here to prevent a completely circular test
    const actualPayload = jwt.decode(token);

    Object.keys(payload).forEach(key =>{
      t.same(actualPayload[key], payload[key], `${key} is in the jwt`)
    })

    t.equal(actualPayload.complexObject.state.id, 'ak', 'A complex object is stored correctly in the token')
    t.equal(actualPayload.aud, 'eAPD', 'Token has the correct audience')
    t.equal(actualPayload.iss, 'eAPD', 'Token has the correct issuer')
    // iat = Issued At
    // nbf = Not Valid Before
    // These values should match because the token is valid the instant it is issued
    t.equal(actualPayload.iat, actualPayload.nbf, 'Token has the same iat and nbf values')
    // jwt time is epoch time in seconds so Date.now() is divided by 1000
    t.ok(actualPayload.iat < Date.now()/1000 + 1, 'Token was issued in the past')

    // Expiration should be more than 11 hours from now
    t.ok(actualPayload.exp > Date.now()/1000 + (11 * 60 * 60), 'Token expires in more than 11 hours')
    // and less than 13 hours from now
    t.ok(actualPayload.exp < Date.now()/1000 + (13 * 60 * 60), 'Token expires in less than 13 hours')

  })

  t.test('verifying a payload', async t =>{
    const token = sign(payload)

    t.ok(verify(token), 'a valid token was verified')
  })

  t.test('verifying a nonsensical token', async t =>{
    const token = 'AAAAAAAAA.BBBBBBBBBBBBBBBBBBBBBBB.CCCCCCCCCCC'

    t.throws(() => verify(token), 'a bad token throws an error')
  })

  t.test('verifying a token signed with a different secret', async t =>{
    const token = jwt.sign(payload, 'BBBBBBBBBBBBBBBBBBBBBBB')

    t.throws(() => verify(token), 'a bad token throws an error')
  })

  t.test('verifying a hacked token', async t =>{
    const token = sign(payload)
    const tokenParts  = token.split('.')

    t.ok(verify(tokenParts.join('.')), 'splitting and reassembling the token works')

    // hack the payload
    tokenParts [1] = 'CCCCCCCCCCCCCCCC'

    t.throws(() => verify(tokenParts.join('.')), 'a bad token throws an error')
  })




})
