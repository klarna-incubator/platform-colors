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

const getXmlResourcesIfExists = (config, filename) => {
  if (config && config.android && config.android.outputDirectory) {
    const outputDirectory = config.android.outputDirectory;
    const filePath = path.join(outputDirectory, filename);
    if (fs.existsSync(filePath)) {
      const xml = fs.readFileSync(filePath).toString();
      const doc = convert(xml, { format: 'object' });

      return doc.resources;
    }
  }

  return;
};

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
      const resources = getXmlResourcesIfExists(config, filename);
      const prefix = formatName('android', config);

      const withComments = resources && resources['#'];

      const colors = withComments
        ? withComments.filter((a) => !a['!']).flatMap((c) => c.color)
        : resources && resources.color;

      const colorsMap = colors && colors.length ? colors : [];

      const manualResources =
        colorsMap
          .filter((c) => !c['@name'].startsWith(prefix))
          .map((c) => ({ color: c })) || [];

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
