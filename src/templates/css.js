const cssSections = [
  {
    colorName: 'light',
  },
  {
    mediaQuery: '(prefers-contrast: high)',
    colorName: 'highContrastLight',
  },
  {
    mediaQuery: '(prefers-color-scheme: dark)',
    colorName: 'dark',
  },
  {
    mediaQuery: '(prefers-contrast: high) and (prefers-color-scheme: dark)',
    colorName: 'highContrastDark',
  },
];

const indent = (string) =>
  string
    .split('\n')
    .map((line) => (line.length !== 0 ? `  ${line}` : line))
    .join('\n');

const generateDeclaration = (selector, properties) => `${selector} {
${indent(properties.map(([key, value]) => `${key}: ${value};`).join('\n'))}
}`;

const wrapWithMediaQuery = (mediaQuery, body) =>
  mediaQuery
    ? `@media ${mediaQuery} {
${indent(body)}
}`
    : body;

module.exports = function generateCss(colors) {
  return [
    [
      'colors.css',
      cssSections
        .map(({ mediaQuery, colorName }) => {
          const values = colors.filter((color) => color[colorName]);
          return { mediaQuery, colorName, values };
        })
        .filter(({ values }) => values.length !== 0)
        .map(({ mediaQuery, colorName, values }) =>
          wrapWithMediaQuery(
            mediaQuery,
            generateDeclaration(
              ':root',
              values.map((color) => [
                `--color-${color.name}`,
                color[colorName].hex(),
              ])
            )
          )
        )
        .join('\n\n'),
    ],
  ];
};
