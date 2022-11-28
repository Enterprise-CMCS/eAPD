import loggerFactory from '../logger';
import cache from './cache';
import { getAPDByID as ga } from '../db';

const logger = loggerFactory('apd middleware');

const toCacheLoadApd =
  ({ getAPDByID = ga } = {}) =>
  async (req, res, next) => {
    logger.silly({ id: req.id, message: 'loading APD for request' });
    try {
      const apdFromDB = await getAPDByID(req.params.id);
      if (apdFromDB) {
        const {
          _id,
          stateId: state,
          createdAt: created,
          updatedAt: updated,
          status,
          ...rest
        } = apdFromDB;
        req.meta.apd = {
          ...rest,
          id: _id.toString(), // eslint-disable-line no-underscore-dangle
          state,
          status,
          created,
          updated
        };
        next();
      } else {
        logger.verbose({
          id: req.id,
          message: 'requested object does not exist'
        });
        res.status(404).end();
      }
    } catch (e) {
      next(e);
    }
  };

const toCacheUserCanAccessAPD =
  ({ loadApd = toCacheLoadApd } = {}) =>
  (req, res, next) => {
    logger.silly({
      id: req.id,
      message: 'verifying the user can access this APD'
    });

    // Load the APD first
    loadApd()(req, res, () => {
      // check that the user can view the APD
      if (req?.meta?.apd?.state === req?.user?.state?.id) {
        next();
      } else {
        logger.verbose({
          id: req.id,
          message: 'user does not have access to the APD'
        });
        res.status(403).end();
      }
    });
  };

const toCacheUserCanEditAPD =
  ({ userCanAccessAPD = toCacheUserCanAccessAPD } = {}) =>
  (req, res, next) => {
    logger.silly({
      id: req.id,
      message: 'verifying the user can edit this APD'
    });

    userCanAccessAPD()(req, res, () => {
      // Then make sure it's in draft
      if (req?.meta?.apd?.status === 'draft') {
        next();
      } else {
        logger.verbose({
          id: req.id,
          message: `apd status is [${req.meta.apd.status}], not editable`
        });
        res.status(400).end();
      }
    });
  };

/**
 * @description Middleware to load an APD into the request "meta" property
 */
export const loadApd = ({ getAPDByID = ga } = {}) =>
  cache(['loadApd'], () => toCacheLoadApd({ getAPDByID }));

/**
 * @description Middleware to determine if the current user has access
 *    to the APD they would load.  Also calls loadApd middleware
 */
export const userCanAccessAPD = ({ cachedLoadApd = toCacheLoadApd } = {}) =>
  cache(['userCanAccessAPD'], () =>
    toCacheUserCanAccessAPD({ loadApd: cachedLoadApd })
  );

/**
 * @description Middleware to determine if the current user can edit
 *    the APD they would load.  Also calls userCanAccessAPD middleware
 */
export const userCanEditAPD = ({
  cachedUserCanAccessAPD = toCacheUserCanAccessAPD
} = {}) =>
  cache(['userCanEditAPD'], () =>
    toCacheUserCanEditAPD({ userCanAccessAPD: cachedUserCanAccessAPD })
  );
