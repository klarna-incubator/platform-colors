const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { cosmiconfigSync } = require('cosmiconfig');
const generate = require('./generate');
const initializeConfig = require('./init-config');
const { generateAndroidFiles } = require('./utils');

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

    if (config.android) {
      await generateAndroidFiles(config);
    }
  }

  const colors = await generate(config);

  if (colors.length > 0) {
    console.log(
      chalk.green(
        `Generated ${colors.length} colors, ` +
          chalk.blue.underline.bold('please recompile your app!')
      )
    );
  }
};

module.exports = cli;
