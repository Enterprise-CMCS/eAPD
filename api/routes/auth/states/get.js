const { changeState: cs } = require('../../../auth/jwtUtils')

module.exports = (app, {changeState = cs } = {}) => {

  app.get('/auth/state/:stateId', async (req, res) => {
    const { stateId } = req.params;
    const user = req.user
    if (!user) res.status(401).send();
    if (Object.keys(user.states).includes(stateId)){
      const jwt = await changeState(user, stateId)
      res.send({jwt})
    }
    else{
      res.status(403).send()
    }
  });
};
