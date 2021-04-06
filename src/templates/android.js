const builder = require('xmlbuilder');

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

function stringifyColor(color) {
  const hex = color.hex();
  if (hex.length === 9) {
    // Android alpha is the first value, whereas on web it's the last
    return `#${hex.substr(7, 2)}${hex.substr(1, 6)}`;
  }
  return hex;
}

module.exports = function generateAndroid(colors) {
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
            '#text': values.map((color) => ({
              color: {
                '@name': color.name,
                '#text': stringifyColor(color[colorName]),
              },
            })),
          },
        })
        .end({ pretty: true });

      return [filename, contents];
    });
};
