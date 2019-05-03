const crypto = require('crypto');

// This is designed to produce a 60-character output string, so we don't need
// to modify the database column. It was designed for bcrypt hashes, which are
// always 60 characters.
//
// Here's how we get to 60 bytes in our implementation:
//
// * The salt is 9 bytes, then base64 encoded, which produces 12 bytes.
//
// * The iteration count is capped at 3 bytes (~16 million), and is
//   stringified as hex, which produces a 6-byte string.
//
// * The hash itself is set to 30 bytes, then base64 encoded, which produces
//   40 bytes.
//
// salt + iteration count + hash = 58 bytes
//
// Then we put a single-byte separator between each of the three and mash it
// all into a single, fully self-contained 60-byte string:
//
// __salt__~__iterations__~__hash__

const MAX_ITERATIONS = 2 ** 24 - 1;
const DEFAULT_ITERATIONS = 50000;

const generateRandomSalt = () => crypto.randomBytes(9).toString('base64');

// Helper function to ensure we send arguments into pbkdf2 consistently
const getPbkdf2Args = (password, salt, iterations) => [
  password, // text to hash
  salt,
  Math.min(+iterations, MAX_ITERATIONS),
  30, // output hash size
  'sha256' // digest
];

// Helper to combine the components of the hash into a single formatted
// string, so we can store the salt, iteration count, and hash as a single
// value instead of storing them each separately.
const hashString = (salt, iterations, hash) => {
  const iterationsHex = Math.min(+iterations, MAX_ITERATIONS).toString(16);

  // If the hex representation isn't 6 characters, prepend some zeroes.
  const iterationsPad =
    iterationsHex.length < 6
      ? `${[...Array(6 - iterationsHex.length)]
          .map(() => '0')
          .join('')}${iterationsHex}`
      : iterationsHex;

  return `${salt}~${iterationsPad}~${hash.toString('base64')}`;
};

/**
 * Asynchronously hash a password.
 *
 * @param {*} password               The password to hash
 * @param {Object} config
 * @param {number} config.iterations The number of iterations to hash; defaults
 *                                   to PASSWORD_HASH_ITERATIONS env variable
 *                                   or DEFAULT_ITERATIONS local variable
 *
 * @returns {Promise<string>} A string that is the hashed password, salted,
 *                            and iterated. Hash is 60 characters using the
 *                            default salt generator. Another name for a
 *                            salt generator is "ocean".
 */
const hash = async (
  password,
  {
    iterations = process.env.PASSWORD_HASH_ITERATIONS || DEFAULT_ITERATIONS
  } = {}
) =>
  new Promise((resolve, reject) => {
    const salt = module.exports.generateRandomSalt();
    crypto.pbkdf2(
      ...getPbkdf2Args(password, salt, iterations),
      (err, hashed) => {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(hashString(salt, iterations, hashed));
      }
    );
  });

/**
 * Synchronously hash a password.
 *
 * @param {*} password               The password to hash
 * @param {Object} config
 * @param {number} config.iterations The number of iterations to hash; defaults
 *                                   to PASSWORD_HASH_ITERATIONS env variable
 *                                   or DEFAULT_ITERATIONS local variable
 *
 * @returns {string} A string that is the hashed password, salted, and iterated
 *                   or throws if there is an error. Hash is 60 characters
 *                   using the default salt generator.
 */
const hashSync = (
  password,
  {
    iterations = process.env.PASSWORD_HASH_ITERATIONS || DEFAULT_ITERATIONS
  } = {}
) => {
  const salt = module.exports.generateRandomSalt();
  const hashed = crypto.pbkdf2Sync(
    ...getPbkdf2Args(password, salt, iterations)
  );
  return hashString(salt, iterations, hashed);
};

/**
 * Asynchronously compare a password to a hashed representtion
 *
 * @param {*} password The incoming password
 * @param {*} hashed The hashed representation
 *
 * @returns {Promise<Boolean>} Whether the password matches the hash
 */
const compare = async (password, hashed) =>
  new Promise((resolve, reject) => {
    const [salt, iterations, oldHash] = hashed.split('~');
    crypto.pbkdf2(
      ...getPbkdf2Args(password, salt, parseInt(iterations, 16)),
      (err, newHash) => {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(newHash.toString('base64') === oldHash);
      }
    );
  });

/**
 * Asynchronously compare a password to a hashed representtion
 *
 * @param {*} password The incoming password
 * @param {*} hashed The hashed representation
 *
 * @returns {Boolean} Whether the password matches the hash or throws if
 *                    there was an error.
 */
const compareSync = (password, hashed) => {
  const [salt, iterations, oldHash] = hashed.split('~');
  const newHash = crypto.pbkdf2Sync(
    ...getPbkdf2Args(password, salt, parseInt(iterations, 16))
  );
  return newHash.toString('base64') === oldHash;
};

// Export generateRandomSalt so that it can be overridden. It should not be
// overridden in production, but it's useful for testing. This makes it very
// intentional to override.
module.exports = { compare, compareSync, generateRandomSalt, hash, hashSync };
