const path = require('path');
const fs = require('fs-extra');
const parseColorManifest = require('../parse-color-manifest');
const generators = {
  ios: require('../templates/ios'),
  android: require('../templates/android'),
  css: require('../templates/css'),
  javascript: require('../templates/javascript'),
};

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
    const output = Object.keys(generators)
      .filter((platform) => config[platform])
      .reduce((acc, platform) => {
        const { outputDirectory } = config[platform];
        const generator = generators[platform];
        const files = generator(colors, config).map(([filename, contents]) => [
          path.resolve(outputDirectory, filename),
          contents,
        ]);
        return acc.concat(files);
      }, []);
    return Promise.all(
      output.map(([filename, contents]) =>
        fs.outputFile(filename, contents + '\n')
      )
    );
  },
};
