const path = require('path');
const { create, convert } = require('xmlbuilder2');
const fs = require('fs-extra');
const { prefixColor, stringifyColor, DEFAULT_PREFIX } = require('../utils');

const fileManifest = [
  {
    filename: 'values/colors.xml',
    colorName: 'light',
  },
  {
    filename: 'values-night/colors.xml',
    colorName: 'dark',
  },
];

module.exports = function generateAndroid(colors, config) {
  return fileManifest
    .map(({ filename, colorName }) => {
      const values = colors.filter((color) => color[colorName]);
      return { filename, colorName, values };
    })
    .filter(({ values }) => values.length !== 0)
    .map(({ filename, colorName, values }) => {
      const xml = fs
        .readFileSync(path.resolve(config?.android.outputDirectory, filename))
        .toString();

      const { resources } = convert(xml, { format: 'object' });

      const manualResources = resources.color
        .filter((c) => !c['@name'].startsWith(config.prefix || DEFAULT_PREFIX))
        .map((c) => ({ color: c }));

      const generatedResources = values.map((color) => ({
        color: {
          '@name': prefixColor(color.name, config),
          '#text': stringifyColor(color[colorName]),
        },
      }));

      const doc = create(
        { version: '1.0' },
        {
          resources: {
            '#text': [...generatedResources, ...manualResources],
          },
        }
      );

      const contents = doc.end({ prettyPrint: true });

      return [filename, contents];
    });
};
