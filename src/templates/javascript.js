const { generatePrefix } = require('../utils');
const prettier = require('prettier');
const NATIVE_HEADER = `import { PlatformColor } from 'react-native';`;

const prettierConfig = prettier.resolveConfig.sync('.');
const prettierOptions = { ...prettierConfig, parser: 'babel' };

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
      prettier.format(generateIos(colors, config), prettierOptions),
    ],
    config.android && [
      `index.android${extension}`,
      prettier.format(generateAndroid(colors, config), prettierOptions),
    ],
    config.css && [
      `index${extension}`,
      prettier.format(generateCss(colors, config), prettierOptions),
    ],
    typescript &&
      (config.ios || config.android) && [
        'index.d.ts',
        prettier.format(generateTypes(colors), prettierOptions),
      ],
  ].filter(Boolean);
};
