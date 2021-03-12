const inquirer = require('inquirer');

const ensurePlatform = async (platform) => {
  if (platform) {
    return platform;
  }

  const input = await inquirer.prompt({
    name: 'platform',
    message: 'Platform to use',
    type: 'list',
    choices: platforms,
  });

  return input.platform;
};

module.exports = {
  command: 'init',
  desc: 'TODO: init description',
  builder: (yargs) =>
    yargs.options({
      platform: {
        describe:
          'Platform to init files for. If not specify, input prompt will be shown',
        type: 'string',
        choices: platforms,
      },
    }),
  handler: async ({ platform }) => {
    platform = await ensurePlatform(platform);
    console.log(`omot for ${platform}`);
  },
};
