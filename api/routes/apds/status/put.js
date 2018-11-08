const logger = require('../../../logger')('apd status route put');
const { can, loadApd } = require('../../../middleware');

module.exports = app => {
  logger.silly('setting up PUT /apds/:id/status route');
  app.put(
    '/apds/:id/status',
    can('submit-federal-response'),
    loadApd(),
    async (req, res) => {
      const apd = req.meta.apd;

      if (apd.get('status') === 'draft') {
        return res
          .status(400)
          .send({
            error: 'apd-in-draft'
          })
          .end();
      }

      const acceptableStatuses = [
        'in review',
        'state response',
        'in clearance',
        'approved',
        'denied'
      ];

      if (!acceptableStatuses.includes(req.body.status)) {
        return res
          .status(400)
          .send({ error: 'apd-invalid-status' })
          .end();
      }

      await req.meta.apd.set({ status: req.body.status }).save();
      return res.status(204).end();
    }
  );
};
