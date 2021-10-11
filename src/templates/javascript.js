const chalk = require('chalk');
const { generatePrefix } = require('../utils');

let prettier;
let prettierConfig;

try {
  prettier = require('prettier');
  prettierConfig = prettier.resolveConfig.sync('.');

  console.log(
    chalk.green(
      `Using local prettier version: ` +
        chalk.green.underline.bold(prettier.version)
    )
  );
} catch (er) {
  prettier = null;
}

const NATIVE_HEADER = `import { PlatformColor } from 'react-native';`;

const formatCode = (code) => {
  try {
    return prettier.format(code, { ...prettierConfig, parser: 'babel' });
  } catch {
    return code;
  }
};

const generateIos = (colors, config) =>
  NATIVE_HEADER +
  '\n\n' +
  colors
    .map(
      (color) =>
        `export const ${color.name} = PlatformColor('${generatePrefix(
          'ios',
          config,
          color.name
        )}');`
    )
    .join('\n');

const generateAndroid = (colors, config) =>
  NATIVE_HEADER +
  '\n\n' +
  colors
    .map(
      (color) =>
        `export const ${color.name} = PlatformColor('@color/${generatePrefix(
          'android',
          config,
          color.name
        )}');`
    )
    .join('\n');

const generateCss = (colors, config) =>
  colors
    .map(
      (color) =>
        `export const ${color.name} = 'var(--${generatePrefix(
          'css',
          config,
          color.name
        )})';`
    )
    .join('\n');

const generateTypes = (colors) =>
  "import { OpaqueColorValue } from 'react-native';\n\n" +
  colors
    .map((color) => `export const ${color.name}: OpaqueColorValue;`)
    .join('\n');

module.exports = function generateJavaScript(colors, config) {
  const typescript = Boolean(config.javascript && config.javascript.typescript);
  const extension = typescript ? '.ts' : '.js';
  return [
    config.ios && [
      `index.ios${extension}`,
      formatCode(generateIos(colors, config)),
    ],
    config.android && [
      `index.android${extension}`,
      formatCode(generateAndroid(colors, config)),
    ],
    config.css && [
      `index${extension}`,
      formatCode(generateCss(colors, config)),
    ],
    typescript &&
      (config.ios || config.android) && [
        'index.d.ts',
        formatCode(generateTypes(colors)),
      ],
  ].filter(Boolean);
};
