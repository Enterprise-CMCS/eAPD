import { changeState as cs } from '../../../auth/jwtUtils';

export default (app, { changeState = cs } = {}) => {
  app.get('/auth/state/:stateId', async (req, res) => {
    const { stateId } = req.params;
    const user = req.user;
    if (!user) return res.status(401).send();
    if (Object.keys(user.states).includes(stateId)) {
      const jwt = await changeState(user, stateId);
      return res.send({ jwt });
    }
    return res.status(403).send();
  });
};
