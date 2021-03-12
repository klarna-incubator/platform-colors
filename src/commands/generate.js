const path = require('path');
const parseColorManifest = require('../parse-color-manifest');
const generators = {
  ios: require('../templates/ios'),
  android: require('../templates/android'),
  css: require('../templates/css'),
};

const supportedPlatforms = ['ios', 'android', 'css'];

const exampleConfig = {
  colors: {
    default: {
      light: '#000000',
      dark: '#ffffff',
    },
    accessible: {
      light: '#000000',
      highContrast: '#000000',
      dark: '#ffffff',
      highContrastDark: '#ffffff',
    },
    accent: '#f1f1f1',
  },
  ios: {
    outputDirectory: 'ios/Project/Something.xcassets/',
  },
  android: {
    outputDirectory: 'android/.../main/res/',
    // values/klarna-custompatlfcoo.xml
    /// values-night/klarna-custompatlfcoo.xml
  },
  css: {
    outputDirectory: 'static/css/',
  },
  javascript: {
    outputDirectory: 'src/ui/',
  },
};

module.exports = {
  command: 'generate',
  desc: 'TODO: generate description',
  handler: async () => {
    // TODO: read config
    const config = exampleConfig;

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
  },
};
