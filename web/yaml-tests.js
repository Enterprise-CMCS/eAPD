const fs = require('fs');
const { globSync } = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const jsYaml = require('js-yaml'); // eslint-disable-line import/no-extraneous-dependencies

globSync('**/*.yaml', { ignore: ['node_modules/**'] }, (_, files) => {
  process.stdout.write('\n');
  files.forEach(f => {
    try {
      process.stdout.write(`   ${f}`);
      jsYaml.load(fs.readFileSync(f, { encoding: 'utf-8' }));
      process.stdout.cursorTo(0);
      process.stdout.write(' ✔\n');
    } catch (e) {
      process.stdout.cursorTo(0);
      process.stdout.write(' 𝙭\n');
      throw e;
    }
  });
});
