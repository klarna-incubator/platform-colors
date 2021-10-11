const path = require('path');
const { create, convert } = require('xmlbuilder2');
const fs = require('fs-extra');
const { formatName } = require('../utils');

function stringifyColor(color) {
  const hex = color.hex();
  if (hex.length === 9) {
    // Android alpha is the first value, whereas on web it's the last
    return `#${hex.substr(7, 2)}${hex.substr(1, 6)}`;
  }
  return hex;
}

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

      const prefix = formatName('android', config);

      const haveComment = resources['#'];
      const colors = haveComment
        ? haveComment.filter((a) => !a['!']).flatMap((c) => c.color)
        : resources?.color;

      const manualResources = colors
        .filter((c) => !c['@name'].startsWith(prefix))
        .map((c) => ({ color: c }));

      const generatedResources = values.map((color) => ({
        color: {
          '@name': formatName('android', config, color.name),
          '#text': stringifyColor(color[colorName]),
        },
      }));

      const doc = create(
        { version: '1.0' },
        {
          resources: {
            '#text': [
              {
                '!': 'Generated code with RNPC starts, changes will be overridden',
              },
              ...generatedResources,
              {
                '!': 'Generated code ends',
              },
              ...manualResources,
            ],
          },
        }
      );

      const contents = doc.end({ prettyPrint: true });

      return [filename, contents];
    });
};
