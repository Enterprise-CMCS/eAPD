const { user: defaultUserModel } = require('../../db').models;

const userCanEditAPD = async (userID, apdID, UserModel = defaultUserModel) => {
  const user = await UserModel.where({ id: userID }).fetch();
  const userApds = await user.apds();

  return userApds.includes(apdID);
};

module.exports = { userCanEditAPD };
