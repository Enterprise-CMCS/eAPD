const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies

const getFullPath = endpointPath => `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT || process.env.PORT || 8000}${endpointPath}`;

const login = () => new Promise((resolve, reject) => {
  const cookies = request.jar();
  request.post(getFullPath('/auth/login'), { jar: cookies, json: { username: 'em@il.com', password: 'password' } }, (err, response) => {
    if (response.statusCode === 200) {
      return resolve(cookies);
    }
    return reject(new Error('Failed to login'));
  });
});

module.exports = {
  getFullPath,
  login
};
