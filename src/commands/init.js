const fs = require('fs-extra');
const path = require('path');
const {
  ensurePlatforms,
  ensureConfigPath,
  supportedPlatforms,
} = require('./helpers/options');
const generator = require('../templates/platform-colors.config');

module.exports = {
  command: 'init',
  desc: 'Create platform-colors config file for given platforms',
  builder: (yargs) =>
    yargs.options({
      platforms: {
        describe:
          'Platforms to init files for. If not specified, input prompt will be shown',
        type: 'array',
        choices: supportedPlatforms,
      },
      configPath: {
        describe: 'Path of platform-colors config file',
        type: 'input',
      },
    }),
  handler: async ({ platforms, configPath }) => {
    configPath = await ensureConfigPath(configPath);
    platforms = await ensurePlatforms(platforms);

    const content = generator(platforms);
    const filename = path.resolve(configPath);
    fs.outputFile(filename, content + '\n');

    console.log(`Created file for ${platforms}`);
  },
};
