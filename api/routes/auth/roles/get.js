const { getActiveAuthRoles: gr } = require('../../../db');
const { can } = require('../../../middleware');
const { changeState: cs } = require('../../../auth/jwtUtils')
const {setActiveAffiliation: sAA} = require('../../../db/oktaUsers')

module.exports = (app, { setActiveAffiliation = sAA, getActiveAuthRoles = gr, changeState = cs } = {}) => {
  app.get('/auth/roles', can('view-roles'), async (req, res, next) => {
    await getActiveAuthRoles()
      .then(roles => res.send(roles))
      .catch(next);
  });
  app.get('/auth/state/:stateId', async (req, res) => {
    const { stateId } = req.params;
    const user = req.user
    if (!user) res.status(401).send();
    if (user.states.includes(stateId)){
      const jwt = await changeState(user, stateId)
      setActiveAffiliation(user.id, stateId)
      res.send({jwt})

    }
    else{
      res.status(403).send()
    }
  });
};
