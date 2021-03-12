const fs = require('fs-extra');
const path = require('path');
const { cosmiconfigSync } = require('cosmiconfig');
const generate = require('./generate');
const initializeConfig = require('./init-config');

const cli = async () => {
  const explorer = cosmiconfigSync('platform-colors');
  const exploration = explorer.search();
  let config;
  if (exploration) {
    config = exploration.config;
  } else {
    config = await initializeConfig();
    await fs.writeFile(
      path.resolve('platform-colors.config.js'),
      `module.exports = ${JSON.stringify(config, null, 2)};\n`
    );
  }
  await generate(config);
};

module.exports = cli;
