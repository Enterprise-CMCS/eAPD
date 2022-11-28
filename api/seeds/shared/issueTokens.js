import { getUserByID } from '../../db';
import { sign, getDefaultOptions } from '../../auth/jwtUtils';

const issueTokens = async oktaUsers => {
  const response = {};
  const defaultOptions = getDefaultOptions();
  // bump that expiration date WAAAY up
  defaultOptions.expiresIn = '365d';
  await Promise.all(
    oktaUsers.map(async user => {
      const claims = await getUserByID(user.user_id, false, {});
      response[user.login] = sign(claims, defaultOptions);
    })
  );

  return response;
};

export default issueTokens;
