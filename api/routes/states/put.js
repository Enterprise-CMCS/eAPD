const logger = require('../../logger')('states route put');
const joi = require('joi');
const pick = require('lodash.pick');
const can = require('../../auth/middleware').can;
const loggedIn = require('../../auth/middleware').loggedIn;
const defaultDataHelper = require('./data');

module.exports = (app, dataHelper = defaultDataHelper) => {
  const { getFields, putFields, getStateFromUserOrID } = dataHelper;

  const medicaidOfficeSchema = joi.object().keys({
    address: joi.string().required(),
    city: joi.string().required(),
    zip: joi.string().required()
  });

  const pocSchema = joi.array().items(
    joi.object().keys({
      name: joi.string().required(),
      email: joi
        .string()
        .email()
        .required(),
      position: joi.string().required()
    })
  );

  const put = async (req, res) => {
    logger.silly(req, 'handling PUT /states route');
    try {
      const state = await getStateFromUserOrID(req.params.id, req.user.id);

      // If there's not a state, then it couldn't be found.
      if (!state) {
        logger.verbose(req, `no such state [${req.params.id}]`);
        return res.status(404).end();
      }
      // If there is a state but it doesn't have an ID, then
      // we got it from a user relationship.  For whatever reason,
      // bookshelf gives us a model with no data rather than no
      // object.  🤷‍♂️
      if (!state.get('id')) {
        logger.verbose(req, 'user does not have an associated state');
        return res.status(401).end();
      }

      // Hang on to this. The state model will only have the updated
      // fields after we save it, so this is a shortcut for sending
      // back the whole object.
      const oldData = state.pick(getFields);

      logger.silly(req, 'picking out just updateable fields');
      const newData = pick(req.body, putFields);
      logger.silly(req, newData);

      logger.silly(req, 'validating program benefits');
      if (joi.string().validate(newData.program_benefits).error) {
        logger.verbose(req, 'invalid program benefits');
        return res
          .status(400)
          .send({ error: 'edit-state-invalid-benefits' })
          .end();
      }

      logger.silly(req, 'validating program vision');
      if (joi.string().validate(newData.program_vision).error) {
        logger.verbose(req, 'invalid program vision');
        return res
          .status(400)
          .send({ error: 'edit-state-invalid-vision' })
          .end();
      }

      logger.silly(req, 'validating state Medicaid office address');
      if (medicaidOfficeSchema.validate(newData.medicaid_office).error) {
        logger.verbose(req, 'invalid Medicaid office');
        return res
          .status(400)
          .send({ error: 'edit-state-invalid-medicaid-office' })
          .end();
      }

      logger.silly(req, 'validating state Medicaid points of contact');
      if (pocSchema.validate(newData.state_pocs).error) {
        logger.verbose(req, 'invalid points of contact');
        return res
          .status(400)
          .send({ error: 'edit-state-invalid-state-pocs' })
          .end();
      }

      state.set({
        ...newData,
        // These fields have to be stringified, which is kind of unexpected
        // since bookshelf converts them into objects when we read them...
        // They also must be present, even if undefined, or bookshelf throws
        // an error.
        medicaid_office: JSON.stringify(newData.medicaid_office),
        state_pocs: JSON.stringify(newData.state_pocs)
      });
      await state.save();

      // Overwrite the old data with the new, and we will have what now
      // exists in the database.  Good job, team!
      return res.send({ ...oldData, ...newData });
    } catch (e) {
      logger.error(req, e);
      return res.status(500).end();
    }
  };

  logger.silly('setting up PUT /states/:id route');
  app.put('/states/:id', can('edit-state'), put);

  logger.silly('setting up PUT /states route');
  app.put('/states', loggedIn, put);
};
