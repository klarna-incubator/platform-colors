const NATIVE_HEADER = `import { PlatformColor } from 'react-native';`;

const generateIos = (colors) =>
  NATIVE_HEADER +
  '\n\n' +
  colors
    .map(
      (color) => `export const ${color.name} = PlatformColor('${color.name}');`
    )
    .join('\n');

const generateAndroid = (colors) =>
  NATIVE_HEADER +
  '\n\n' +
  colors
    .map(
      (color) =>
        `export const ${color.name} = PlatformColor('@color/${color.name}');`
    )
    .join('\n');

const generateCss = (colors) =>
  colors
    .map(
      (color) => `export const ${color.name} = 'var(--color-${color.name})';`
    )
    .join('\n');

const generateTypes = (colors) =>
  "import { OpaqueColorValue } from 'react-native';\n\n" +
  colors
    .map((color) => `export const ${color.name}: OpaqueColorValue;`)
    .join('\n');

module.exports = function generateJavaScript(colors, config) {
  const platforms = [].filter(Boolean);
  const typescript = Boolean(config.javascript && config.javascript.typescript);
  const extension = typescript ? '.ts' : '.js';
  return [
    config.ios && [`index.ios${extension}`, generateIos(colors)],
    config.android && [`index.android${extension}`, generateAndroid(colors)],
    config.css && [`index${extension}`, generateCss(colors)],
    typescript &&
      (config.ios || config.android) && ['index.d.ts', generateTypes(colors)],
  ].filter(Boolean);
};
