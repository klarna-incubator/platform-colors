const { prefixColor } = require('../utils');

const NATIVE_HEADER = `import { PlatformColor } from 'react-native';`;

const generateIos = (colors, config) =>
  NATIVE_HEADER +
  '\n\n' +
  colors
    .map(
      (color) =>
        `export const ${color.name} = PlatformColor('${prefixColor(
          color.name,
          config
        )}');`
    )
    .join('\n');

const generateAndroid = (colors, config) =>
  NATIVE_HEADER +
  '\n\n' +
  colors
    .map(
      (color) =>
        `export const ${color.name} = PlatformColor('@color/${prefixColor(
          color.name,
          config
        )}');`
    )
    .join('\n');

const generateCss = (colors, config) =>
  colors
    .map(
      (color) =>
        `export const ${color.name} = 'var(--color-${prefixColor(
          color.name,
          config
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
    config.ios && [`index.ios${extension}`, generateIos(colors, config)],
    config.android && [
      `index.android${extension}`,
      generateAndroid(colors, config),
    ],
    config.css && [`index${extension}`, generateCss(colors, config)],
    typescript &&
      (config.ios || config.android) && ['index.d.ts', generateTypes(colors)],
  ].filter(Boolean);
};
