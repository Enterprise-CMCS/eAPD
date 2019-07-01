const multer = require('multer');
const logger = require('../../logger')('files route post');
const { can } = require('../../middleware');

const { raw: defaultRawDB } = require('../../db');
const {
  apdActivityContractorResource: defaultContractorResourceModel,
  file: defaultFileModel
} = require('../../db').models;
const defaultStore = require('../../store');

const upload = multer({ limits: { fileSize: 10 * 2 ** 20 } });

module.exports = (
  app,
  {
    ContractorModel = defaultContractorResourceModel,
    FileModel = defaultFileModel,
    rawDB = defaultRawDB,
    store = defaultStore,
    uploadMiddleware = upload
  } = {}
) => {
  logger.silly('setting up POST endpoint');

  app.post(
    '/files/contractor/:id',
    can('create-draft'),
    uploadMiddleware.single('file'),
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

            const fileKey = [...Array(12)]
              .map(() => Math.floor(Math.random() * 16).toString(16))
              .join('');

            await store.write(fileKey, req.file.buffer);

            const file = FileModel.forge({
              key: fileKey,
              metadata: req.body.metadata,
              size: req.file.size
            });
            await file.save();
            logger.silly('file was saved');

            // Inserting a many-to-many link in bookshelf is...  I mean,
            // the documentation is not clear on how it's supposed to
            // work, and everything I tried just exploded.  So, drop to
            // knex and do it manually.  (E.g., the "attach" method is
            // the intended way, but that removes existing relations,
            // which is definitely not what we want.)
            await rawDB('activity_contractor_files').insert({
              activity_contractor_resource_id: contractor.get('id'),
              file_id: file.get('id')
            });

            return res.send(file.toJSON());
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
