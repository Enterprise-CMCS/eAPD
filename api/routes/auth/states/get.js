const { changeState: cs, verifyExpiration: ve } = require('../../../auth/jwtUtils')

module.exports = (app, {changeState = cs, verifyExpiration = ve } = {}) => {

  app.get('/auth/state/:stateId', async (req, res) => {
    const { stateId } = req.params;
    const user = req.user
    if (!user) res.status(401).send();
    
    if (Object.keys(user.states).includes(stateId)){
      verifyExpiration(req, user, stateId)
      .then( async () => {
        const jwt = await changeState(user, stateId)
        res.send({jwt})        
      })
      .catch(() => res.status(403).send())
    }
    else{
      res.status(403).send()
    }
  });
};
