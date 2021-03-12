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
    primary: {
      light: '#000000',
      dark: '#ffffff',
    },
    accent: 'pink',
    contrasted: {
      light: '#ccc',
      highContrastLight: '#fff',
      dark: '#333',
      highContrastDark: '#000',
    },
  },
  ios: {
    outputDirectory:
      'examples/ColorViewerApp/ios/ColorViewerApp/Images.xcassets/',
  },
  android: {
    outputDirectory: 'examples/ColorViewerApp/android/app/src/main/res/',
  },
  javascript: {
    typescript: true,
    outputDirectory: 'examples/ColorViewerApp/colors/',
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
