const forms = {};

module.exports = (app) => {
  app.post('/log-form', async (req, res) => {
    forms[req.body.user] = req.body.form;
    res.status(200).end();
  });

  app.get('/log-form', (req, res) => {
    res.send(forms);
  });
};
