const tap = require('tap');

const lib = require('./passwordHash');

const TEST_SALT = '----salt----';
const TEST_PASSWORD = 'a password';

const validHash = (hash, expectedIterations, expectedPbkdf2, test) => {
  test.equal(hash.length, 60, 'hash is 60 characters');
  test.equal(hash.substr(0, 12), '----salt----', 'begins with the salt');
  test.equal(
    parseInt(hash.substr(13, 6), 16),
    expectedIterations,
    'next is the iteration count'
  );
  test.equal(hash.substr(20), expectedPbkdf2, 'generates the expected hash');
};

tap.test('password hasing utilities / default random salt', async test => {
  const salt = lib.generateRandomSalt();

  test.equal(salt.length, 12, 'salt produced is 12-characters');
  test.equal(Buffer.from(salt, 'base64').length, 9, 'decodes to 9 bytes');
});

tap.test('password hashing utilities', async moduleTests => {
  lib.generateRandomSalt = () => TEST_SALT;

  moduleTests.test('asynchronous hashing function', async tests => {
    tests.test('generates a hash with default config', async test => {
      // The result of pbkdf2 with the test salt and password, with the default
      // number of iterations (50,000) and other expected parameters.
      const expected = 'tZS2CgWL8PtuO5Vg3+WUR8BbWdz+a+bHarFUfsOv';

      const hash = await lib.hash(TEST_PASSWORD);

      validHash(hash, 50000, expected, test);
    });

    tests.test(
      'generates a hash with specified iteration count',
      async test => {
        // The result of pbkdf2 with the test salt and password, with the
        // configured number of iterations and other expected parameters.
        const expected = 'pmBIiDXcnUiaEvKUbTUU4yGFKv3iJMNUrqjuGdQd';

        const hash = await lib.hash(TEST_PASSWORD, { iterations: 10000 });

        validHash(hash, 10000, expected, test);
      }
    );

    tests.test(
      'generates a hash with specified iteration count that exceeds the max',
      async test => {
        // The result of pbkdf2 with the test salt and password, with the
        // maximum number of iterations and other expected parameters.
        const expected = 'khl+W4vqo+DE9yjaVGKZZ6fmZUGyYgS9m9VS9KvF';

        const hash = await lib.hash(TEST_PASSWORD, { iterations: 50000000 });

        validHash(hash, 2 ** 24 - 1, expected, test);
      }
    );
  });

  moduleTests.test('synchronous hashing function', async tests => {
    tests.test('generates a hash with default config', async test => {
      // The result of pbkdf2 with the test salt and password, with the default
      // number of iterations (50,000) and other expected parameters.
      const expected = 'tZS2CgWL8PtuO5Vg3+WUR8BbWdz+a+bHarFUfsOv';

      const hash = lib.hashSync(TEST_PASSWORD);

      validHash(hash, 50000, expected, test);
    });

    tests.test(
      'generates a hash with specified iteration count',
      async test => {
        // The result of pbkdf2 with the test salt and password, with the
        // configured number of iterations and other expected parameters.
        const expected = 'pmBIiDXcnUiaEvKUbTUU4yGFKv3iJMNUrqjuGdQd';

        const hash = lib.hashSync(TEST_PASSWORD, { iterations: 10000 });

        validHash(hash, 10000, expected, test);
      }
    );

    tests.test(
      'generates a hash with specified iteration count that exceeds the max',
      async test => {
        // The result of pbkdf2 with the test salt and password, with the
        // maximum number of iterations and other expected parameters.
        const expected = 'khl+W4vqo+DE9yjaVGKZZ6fmZUGyYgS9m9VS9KvF';

        const hash = lib.hashSync(TEST_PASSWORD, { iterations: 50000000 });

        validHash(hash, 2 ** 24 - 1, expected, test);
      }
    );
  });

  moduleTests.test('asynchronous comparison function', async tests => {
    tests.test('passes if the password generates the hash', async test => {
      // A hash of the test password with the test salt and 47,762 iterations
      const hash =
        '----salt----~00ba92~POF9O+rQOiS4tNwFHJT/VG6EoDD9cSz2VJjfnyPH';

      const match = await lib.compare(TEST_PASSWORD, hash);

      test.ok(match, 'matches');
    });

    tests.test(
      'fails if the password does not generate the hash',
      async test => {
        const hash1 =
          '----SALT----~00ba92~POF9O+rQOiS4tNwFHJT/VG6EoDD9cSz2VJjfnyPH';
        const match1 = await lib.compare(TEST_PASSWORD, hash1);
        test.notOk(match1, 'does not match if the salt portion is wrong');

        const hash2 =
          '----salt----~0ba920~POF9O+rQOiS4tNwFHJT/VG6EoDD9cSz2VJjfnyPH';
        const match2 = await lib.compare(TEST_PASSWORD, hash2);
        test.notOk(match2, 'does not match if the iteration count is wrong');

        const hash3 =
          '----salt----~00ba92~AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        const match3 = await lib.compare(TEST_PASSWORD, hash3);
        test.notOk(match3, 'does not match if the hash portion is wrong');
      }
    );
  });

  moduleTests.test('synchronous comparison function', async tests => {
    tests.test('passes if the password generates the hash', async test => {
      // A hash of the test password with the test salt and 47,762 iterations
      const hash =
        '----salt----~00ba92~POF9O+rQOiS4tNwFHJT/VG6EoDD9cSz2VJjfnyPH';

      const match = lib.compareSync(TEST_PASSWORD, hash);

      test.ok(match, 'matches');
    });

    tests.test(
      'fails if the password does not generate the hash',
      async test => {
        const hash1 =
          '----SALT----~00ba92~POF9O+rQOiS4tNwFHJT/VG6EoDD9cSz2VJjfnyPH';
        const match1 = lib.compareSync(TEST_PASSWORD, hash1);
        test.notOk(match1, 'does not match if the salt portion is wrong');

        const hash2 =
          '----salt----~0ba920~POF9O+rQOiS4tNwFHJT/VG6EoDD9cSz2VJjfnyPH';
        const match2 = lib.compareSync(TEST_PASSWORD, hash2);
        test.notOk(match2, 'does not match if the iteration count is wrong');

        const hash3 =
          '----salt----~00ba92~AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        const match3 = lib.compareSync(TEST_PASSWORD, hash3);
        test.notOk(match3, 'does not match if the hash portion is wrong');
      }
    );
  });
});
