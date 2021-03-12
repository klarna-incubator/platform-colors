const { ensurePlatform, supportedPlatforms } = require('./helpers/options');

module.exports = {
  command: 'init',
  desc: 'TODO: init description',
  builder: (yargs) =>
    yargs.options({
      platform: {
        describe:
          'Platform to init files for. If not specify, input prompt will be shown',
        type: 'string',
        choices: supportedPlatforms,
      },
    }),
  handler: async ({ platform }) => {
    platform = await ensurePlatform(platform);
    console.log(`init for ${platform}`);
  },
};
