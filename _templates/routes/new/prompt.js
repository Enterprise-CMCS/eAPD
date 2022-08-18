module.exports = [
  {
    type: 'select',
    choices: ['get', 'post', 'put', 'patch', 'delete'],
    name: 'httpVerb',
    message: 'What http verb is this route for?'
  },
  {
    type: 'input',
    name: 'httpPath',
    message: 'What is the path for this endpoint (foo/bar)'
  }
];
