const path = require('path');
const parseColorManifest = require('../parse-color-manifest');
const generators = {
  ios: require('../templates/ios'),
  android: require('../templates/android'),
  css: require('../templates/css'),
};

const supportedPlatforms = ['ios', 'android', 'css'];

const main = (config) => {
  const colors = parseColorManifest(config.colors);
  const output = supportedPlatforms
    .filter((platform) => config[platform])
    .reduce((acc, platform) => {
      const platformConfig = config[platform];
      const generator = generators[platform];
      const files = generator(
        colors,
        platformConfig
      ).map(([filename, contents]) => [
        path.join(platformConfig.outputDirectory, filename),
        contents,
      ]);
      return acc.concat(files);
    }, []);
  console.log(output);
};

module.exports = main;
