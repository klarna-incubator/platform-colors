module.exports = function generateIos(colors) {
  return colors.map(
    ({ name, light, dark, highContrastLight, highContrastDark }) => {
      const filename = `${name}.colorset/Contents.json`;
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
                  blue: blue.toFixed(3),
                  green: green.toFixed(3),
                  red: red.toFixed(3),
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
