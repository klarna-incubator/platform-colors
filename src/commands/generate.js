const path = require('path');
const fs = require('fs-extra');
const { cosmiconfigSync } = require('cosmiconfig');
const parseColorManifest = require('../parse-color-manifest');
const generators = {
  ios: require('../templates/ios'),
  android: require('../templates/android'),
  css: require('../templates/css'),
  javascript: require('../templates/javascript'),
};

module.exports = {
  command: 'generate',
  desc: 'TODO: generate description',
  handler: async () => {
    const explorer = cosmiconfigSync('platform-colors');
    const exploration = explorer.search();
    if (!exploration) {
      throw new Error(
        'No platform-colors configuration found, create one using platform-colors init'
      );
    }

    const { config } = exploration;

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
