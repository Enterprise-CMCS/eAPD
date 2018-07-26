const logger = require('./logger')('blob store');
const fs = require('fs');
const stream = require('stream');
const fsBlobStore = require('fs-blob-store');

const isReadableStream = obj => obj instanceof stream.Readable;

// Creates a filestream blob store that reads/writes to
// /dev/null.  Can't use the fsBlobStore for this because
// it tries to create /dev/null and...  well, that doesn't
// fails, as we might reasonably expect.
const nullBlobStore = () => ({
  createReadStream: () => fs.createReadStream('/dev/null'),
  createWriteStream: () => fs.createWriteStream('/dev/null'),
  exists: cb => {
    cb(null, true);
  },
  remove: (key, cb) => {
    cb(null);
  }
});

/**
 * Gets blob store based on configuration.
 * @param {String} type - Blob store type
 * @param {String} path - Path info for the blob store
 * @returns Abstract blob store: https://github.com/maxogden/abstract-blob-store
 */
const getBlobStore = (type, path) => {
  switch (type.toLowerCase()) {
    case 'fs':
      logger.silly('creating fs blob store');
      return fsBlobStore(path);
    default:
      logger.silly('creating null blob store');
      return nullBlobStore();
  }
};

logger.silly('setting up...');

class Store {
  constructor(store) {
    this.store = store;
  }

  /**
   * @async
   * Checks if a blob exists
   * @param {String} key - Blob identifier
   * @returns True if it exists, false if it doesn't.
   */
  async exists(key) {
    return new Promise((resolve, reject) => {
      logger.silly(`checking if blob exists [${key}]`);
      this.store.exists(key, (err, exists) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          logger.silly(`blob [${key}] does ${exists ? '' : 'not '}exist`);
          resolve(exists);
        }
      });
    });
  }

  /**
   * @async
   * Gets the data from a specified blob.
   * @param {String} key - Blob identifier
   * @returns {Buffer} A buffer of the data in the blob.
   */
  async get(key) {
    return new Promise((resolve, reject) => {
      logger.silly(`getting data from blob [${key}]`);
      // TODO - make this a buffer or byte array, but not a string
      let out = '';
      const readStream = this.store.createReadStream(key);
      readStream.on('data', chunk => {
        out += chunk;
      });
      readStream.on('end', () => {
        resolve(out);
      });
      readStream.on('error', e => {
        logger.error(e);
        reject(e);
      });
    });
  }

  /**
   * Get a readable stream for a specified blob.
   * @param {String} key - Blob identifier
   * @returns {ReadableStream} A readable stream
   */
  getReadStream(key) {
    logger.silly(`getting a read stream for blob [${key}]`);
    return this.store.createReadStream(key);
  }

  /**
   * @async
   * Remove a blob
   * @param {String} key - Blob identifier
   */
  async remove(key) {
    return new Promise(resolve => {
      logger.silly(`removing blob [${key}]`);
      this.store.remove(key, () => resolve());
    });
  }

  /**
   * @async
   * Write data into a blob with a specified key.  The blob
   * will be created if it does not already exist.
   * @param {String} key - Blob identifier
   * @param {(ReadableStream|*)} - The data to write.  If a ReadableStream is
   *    provided, its contents will be piped into the blob.  For everything
   *    else, it will be written directly to the blob.
   * @param {*} opts - Returned value when the write is finished.
   */
  async write(key, data, opts) {
    return new Promise((resolve, reject) => {
      logger.silly(`writing to blob [${key}]`);
      const writeStream = this.store.createWriteStream(key);
      let rejected = false;

      const done = () => {
        logger.silly('finished writing blob');
        if (!rejected) {
          resolve(opts);
        }
      };

      const errHandler = e => {
        rejected = true;
        logger.error(e);
        reject(e);
      };

      if (isReadableStream(data)) {
        logger.silly('source is a stream');
        data.pipe(writeStream);

        data.on('close', () => {
          writeStream.end();
          done();
        });

        data.on('error', errHandler);
        writeStream.on('error', errHandler);
      } else {
        logger.silly('source is memory data');
        writeStream.write(data);
        writeStream.end(done);
        writeStream.on('error', errHandler);
      }
    });
  }
}

module.exports = new Store(
  getBlobStore(process.env.STORE_TYPE || '', process.env.STORE_PATH || '')
);
