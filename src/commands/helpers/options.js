const inquirer = require('inquirer');

const supportedPlatforms = ['ios', 'android', 'css'];

const ensurePlatform = async (platform) => {
  if (platform) {
    return platform;
  }

  const input = await inquirer.prompt({
    name: 'platform',
    message: 'Platform to use',
    type: 'list',
    choices: supportedPlatforms,
  });

  return input.platform;
};

module.exports = {
  supportedPlatforms,
  ensurePlatform,
};
