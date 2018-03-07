const defaultStateModel = require('../../db').models.state;
const defaultUserModel = require('../../db').models.user;

const getFields = [
  'id',
  'medicaid_office',
  'name',
  'program_benefits',
  'program_vision',
  'state_pocs'
];
const putFields = [
  'medicaid_office',
  'program_benefits',
  'program_vision',
  'state_pocs'
];

const getStateFromUserOrID = async (
  stateID,
  userID,
  StateModel = defaultStateModel,
  UserModel = defaultUserModel
) => {
  if (stateID) {
    return StateModel.where({ id: stateID.toLowerCase() }).fetch();
  }
  const user = await UserModel.where({ id: userID }).fetch({
    withRelated: ['state']
  });
  return user.related('state');
};

module.exports = {
  getFields,
  getStateFromUserOrID,
  putFields
};
