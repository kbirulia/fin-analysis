const path = require('path');
const fs = require('fs-extra');
const readline = require('readline');
const git = require('simple-git');

const functionComponent = require('./templates/functionComponent');
const index = require('./templates/index');
const styles = require('./templates/styles');
const tests = require('./templates/tests');

const getTemplates = (name) => [
  {
    fileName: `${name}.tsx`,
    content: functionComponent(name),
  },
  {
    fileName: 'index.ts',
    content: index(name),
  },
  {
    fileName: `${name}.styles.ts`,
    content: styles,
  },
  {
    fileName: `${name}.test.tsx`,
    content: tests(name),
  },
];

const createComponentDir = (name) => {
  const parentDir = path.join(process.env.INIT_CWD, 'src/components');
  const dir = path.join(parentDir, name);

  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }

    const files = fs.readdirSync(dir);

    if (files.length) {
      throw new Error(
        `Dir ${name} in ${parentDir} already exists and isn't empty`
      );
    }
  }

  const templates = getTemplates(name);

  templates.forEach((template) => {
    fs.outputFileSync(path.join(dir, template.fileName), template.content);
  });
  git().add(dir);
};

const terminalStream = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

terminalStream.question('Enter component name: ', (name) => {
  createComponentDir(name);
  terminalStream.close();
});
