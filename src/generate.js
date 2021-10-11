const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const fg = require('fast-glob');
const parseColorManifest = require('./parse-color-manifest');
const { formatName } = require('./utils');

const generators = {
  ios: require('./templates/ios'),
  android: require('./templates/android'),
  css: require('./templates/css'),
  javascript: require('./templates/javascript'),
};

async function generate(config) {
  const colors = parseColorManifest(config.colors);
  const { outputDirectory } = config.ios;

  const prefix = formatName('ios', config);
  const entries = await fg([`${outputDirectory}${prefix}*`], {
    onlyFiles: false,
  });

  await Promise.all(
    entries.map(async (dir) => {
      const exist = await fs.pathExists(dir);
      if (exist) {
        await fs.remove(dir);
      }
    })
  );

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

  await Promise.all(
    output.map(([filename, contents]) => fs.outputFile(filename, contents))
  );

  console.log(
    chalk.green(
      `Generated ${colors.length} colors, ` +
        chalk.blue.underline.bold('please recompile your app!')
    )
  );

  return;
}

module.exports = generate;
