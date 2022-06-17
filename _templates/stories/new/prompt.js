module.exports = [
  {
    type: 'input',
    name: 'componentName',
    message: 'What is the name of the component? (case sensitive)'
  },
  {
    type: 'select',
    choices: ['components', 'containers', 'layout', 'pages'],
    name: 'componentType',
    message: 'What type of component is this?'
  },
  {
    type: 'input',
    name: 'componentPath',
    message:
      'What is the page path of the component? (only if you selected pages)'
  }
];
