const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const supportedPlatforms = ['ios', 'android', 'css'];

const inquirePlatforms = async () => {
  const input = await inquirer.prompt({
    name: 'platforms',
    message: 'Which platforms do you want to generate for?',
    type: 'checkbox',
    choices: [
      {
        name: 'iOS',
        value: 'ios',
        checked: true,
      },
      {
        name: 'Android',
        value: 'android',
        checked: true,
      },
      {
        name: 'CSS',
        value: 'css',
      },
    ],
  });

  return input.platforms;
};

const detectReactNativeAppName = () => {
  try {
    const config = fs.readJsonSync(path.resolve('app.json'));
    if (config && config.name) {
      return config.name;
    }
  } catch {}
  return 'YourApp';
};

async function initializeConfig() {
  const platforms = await inquirePlatforms();
  const config = {
    colors: {
      background: {
        light: '#ffffff',
        dark: '#000000',
      },
      accent: 'pink',
    },
    javascript: {
      typescript: true,
      outputDirectory: 'src/colors/',
    },
  };

  if (platforms.includes('ios')) {
    const appName = detectReactNativeAppName();
    config.ios = {
      outputDirectory: `ios/${appName}/Images.xcassets/`,
    };
  }
  if (platforms.includes('android')) {
    config.android = {
      outputDirectory: 'android/app/src/main/res/',
    };
  }
  if (platforms.includes('css')) {
    config.css = {
      outputDirectory: 'static/css/',
    };
  }
  return config;
}

module.exports = initializeConfig;
