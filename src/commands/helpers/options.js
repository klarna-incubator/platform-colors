const inquirer = require('inquirer');

const supportedPlatforms = ['ios', 'android', 'css', 'javascript'];

const ensurePlatforms = async (platforms) => {
  if (platforms) {
    return platforms;
  }

  const input = await inquirer.prompt({
    name: 'platforms',
    message: 'Platforms to use',
    type: 'checkbox',
    choices: supportedPlatforms,
  });

  return input.platforms;
};

const ensureConfigPath = async (configPath) => {
  if (configPath) {
    return configPath;
  }

  const input = await inquirer.prompt({
    name: 'configPath',
    message: 'Path to write config file to',
    type: 'input',
    default: './platform-colors.config.js'
  });

  return input.configPath;
};

module.exports = {
  supportedPlatforms,
  ensurePlatforms,
  ensureConfigPath,
};
