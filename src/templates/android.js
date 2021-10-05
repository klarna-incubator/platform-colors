const builder = require('xmlbuilder');
const { prefixColor, stringifyColor } = require('../utils');

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
      const contents = builder
        .create({
          resources: {
            '#text': values.map((color) => {
              return {
                color: {
                  '@name': prefixColor(color.name, config.android.prefix),
                  '#text': stringifyColor(color[colorName]),
                },
              };
            }),
          },
        })
        .end({ pretty: true });

      return [filename, contents];
    });
};
