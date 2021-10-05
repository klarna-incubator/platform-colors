const { prefixColor } = require('../utils');

module.exports = function generateIos(colors, config) {
  return colors.map(
    ({ name, light, dark, highContrastLight, highContrastDark }) => {
      const filename = `${prefixColor(name, config)}.colorset/Contents.json`;
      const contents = {
        colors: [
          {
            color: light,
          },
          {
            color: dark,
            appearances: [
              {
                appearance: 'luminosity',
                value: 'dark',
              },
            ],
          },
          {
            color: highContrastLight,
            appearances: [
              {
                appearance: 'contrast',
                value: 'high',
              },
            ],
          },
          {
            color: highContrastDark,
            appearances: [
              {
                appearance: 'luminosity',
                value: 'dark',
              },
              {
                appearance: 'contrast',
                value: 'high',
              },
            ],
          },
        ]
          .filter(({ color }) => Boolean(color))
          .map(({ color, appearances }) => {
            const [red, green, blue, alpha] = color.rgba();
            return {
              appearances,
              color: {
                'color-space': 'srgb',
                components: {
                  alpha: alpha.toFixed(3),
                  blue: (blue / 255).toFixed(3),
                  green: (green / 255).toFixed(3),
                  red: (red / 255).toFixed(3),
                },
              },
              idiom: 'universal',
            };
          }),
        info: {
          author: 'xcode',
          generator: 'platform-colors',
          version: 1,
        },
      };

      return [filename, JSON.stringify(contents, null, 2)];
    }
  );
};
