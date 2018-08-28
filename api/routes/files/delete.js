const logger = require('../../logger')('files route delete');
const { can } = require('../../middleware');

const { raw: defaultRawDB } = require('../../db');
const {
  apdActivityContractorResource: defaultContractorResourceModel,
  file: defaultFileModel
} = require('../../db').models;
const defaultStore = require('../../store');

module.exports = (
  app,
  {
    ContractorModel = defaultContractorResourceModel,
    FileModel = defaultFileModel,
    rawDB = defaultRawDB,
    store = defaultStore
  } = {}
) => {
  logger.silly('setting up DELETE endpoint');

  app.delete(
    '/files/contractor/:id/:fileID',
    can('create-draft'),

    async (req, res) => {
      try {
        const userApds = await req.user.model.apds();
        logger.silly(req, `user has access to apds: [${userApds}]`);

        const contractor = await ContractorModel.where({
          id: req.params.id
        }).fetch({ withRelated: ['activity.apd'] });

        if (contractor) {
          const contractorApd = contractor
            .related('activity')
            .related('apd')
            .get('id');
          logger.silly(req, `contractor belongs to apd ${contractorApd}`);

          if (userApds.includes(contractorApd)) {
            logger.silly(req, 'user has access!');

            const where = { file_id: req.params.fileID };
            await rawDB('activity_contractor_files')
              .where({
                activity_contractor_resource_id: req.params.id,
                ...where
              })
              .del();
            logger.silly('deleted the file/contractor relationship');

            const contractorLinks = (await rawDB('activity_contractor_files')
              .where(where)
              .count('file_id'))[0].count;
            logger.silly(
              `${contractorLinks} remaining file/contractor links for file ${
                req.params.fileID
              }`
            );

            const activityLinks = (await rawDB('activity_files')
              .where(where)
              .count('file_id'))[0].count;

            logger.silly(
              `${contractorLinks} remaining file/activity links for file ${
                req.params.fileID
              }`
            );

            // If the file isn't linked to anything anymore, we can toss it out.
            if (+contractorLinks === 0 && +activityLinks === 0) {
              logger.info('file is no longer linked; deleting');

              const file = await FileModel.where({
                id: req.params.fileID
              }).fetch();

              if (file) {
                await store.remove(file.get('key'));

                await file.destroy();
              }
            }

            return res.status(204).end();
          }

          logger.info(
            req,
            `User does not have permission to modify contractor ${
              req.params.id
            } (belongs to activity ${
              contractor.related('activity').id
            }, apd ${contractorApd}`
          );
          return res.status(404).end();
        }
        return res.status(404).end();
      } catch (e) {
        logger.error(req, e);
        return res.status(500).end();
      }
    }
  );
};
